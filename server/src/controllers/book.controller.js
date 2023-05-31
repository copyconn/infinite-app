const { QueryTypes } = require("sequelize");

const { AuthorNotFoundError, BookNotFoundError } = require("../utils/error");

class BookController {
    constructor(bookModel, authorModel, db) {
        this.bookModel = bookModel
        this.authorModel = authorModel
        this.db = db
    }

    async getList() {
        const result = await this.bookModel.findAll({
            order: [['created_at', 'DESC']],
            include: this.authorModel
        })
        return result
    }

    async createBook(name, authorId, price) {
        const authors = await this.db.query("SELECT * FROM author WHERE id = :authorId", {
            replacements: { authorId: authorId },
            type: QueryTypes.SELECT
        })

        const isAuthorExists = authors.length > 0

        if (!isAuthorExists) {
            throw new AuthorNotFoundError()
        }

        await this.db.query("INSERT INTO book (name, author_id, price) VALUES (:name, :authorId, :price)", {
            replacements: { name: name, authorId: authorId, price: price }
        })
    }

    async updateBook(id, name, authorId, price) {
        const isBookExists = await this.bookModel.findOne({
            where: {
                id: id
            }
        })

        if (!isBookExists) {
            throw new BookNotFoundError()
        }

        const authors = await this.db.query("SELECT * FROM author WHERE id = :authorId", {
            replacements: { authorId: authorId },
            type: QueryTypes.SELECT
        })

        const isAuthorExists = authors.length > 0

        if (!isAuthorExists) {
            throw new AuthorNotFoundError()
        }

        await this.bookModel.update({ name: name, authorId: authorId, price: price }, {
            where: {
                id: id
            }
        })
    }

    async deleteBook(id) {
        const isBookExists = await this.bookModel.findOne({
            where: {
                id: id
            }
        })

        if (!isBookExists) {
            throw new BookNotFoundError()
        }

        await this.bookModel.destroy({
            where: {
                id: id
            }
        })
    }
}

module.exports = BookController