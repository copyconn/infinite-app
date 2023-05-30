const { QueryTypes } = require("sequelize");

const { AuthorNotFoundError } = require("../utils/error");

class AuthorController {
    constructor(model, db) {
        this.model = model
        this.db = db
    }

    async getList(limit, offset) {
        const authors = await this.db.query("SELECT * FROM author ORDER BY id DESC LIMIT :limit OFFSET :offset", {
            type: QueryTypes.SELECT,
            replacements: { limit: limit, offset: offset }
        })

        const [queryResult] = await this.db.query("SELECT COUNT(id) FROM author")
        const [count] = queryResult
        const result = { rows: authors, count: parseInt(count.count) }
        return result
    }

    async createAuthor(name, rating) {
        await this.model.create({ name: name, rating: rating })
    }

    async updateAuthor(id, name, rating) {
        const isAuthorExists = await this.model.findOne({
            where: {
                id: id
            }
        })

        if (!isAuthorExists) {
            throw  new AuthorNotFoundError()
        }

        await this.model.update({ name: name, rating: rating }, {
            where: {
                id: id
            }
        })
    }

    async deleteAuthor(id) {
        const isAuthorExists = await this.model.findOne({
            where: {
                id: id
            }
        })

        if (!isAuthorExists) {
            throw  new AuthorNotFoundError()
        }

        await this.db.query("DELETE FROM author WHERE id = :id", {
            replacements: { id: id }
        })
    }
}

module.exports = AuthorController