const { QueryTypes } = require("sequelize");

const { AuthorNotFoundError, BookNotFoundError } = require("../utils/error");

class BookController {
    constructor(model, db) {
        this.model = model
        this.db = db
    }

    async getList(limit, offset) {
        const result = await this.model.findAll({ limit: limit, offset: offset })
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
        const isBookExists = await this.model.findOne({
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

        await this.model.update({ name: name, authorId: authorId, price: price }, {
            where: {
                id: id
            }
        })
    }

    async deleteBook(id) {
        const isBookExists = await this.model.findOne({
            where: {
                id: id
            }
        })

        if (!isBookExists) {
            throw new BookNotFoundError()
        }

        await this.model.destroy({
            where: {
                id: id
            }
        })
    }
}

module.exports = BookController