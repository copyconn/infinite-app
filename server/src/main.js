const { Sequelize } = require('sequelize')
const Fastify = require('fastify')
const cors = require('@fastify/cors')
require('dotenv').config()

const AuthorModel = require('./models/author.model')
const BookModel = require('./models/book.model')
const registerAuthor = require('./routes/author.route')
const registerBook = require('./routes/book.route')
const AuthorController = require('./controllers/author.controller')
const BookController = require('./controllers/book.controller')

async function initDB() {
    const databaseUrl = process.env.POSTGRES_URL
    const db = new Sequelize(databaseUrl)
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    const Author = AuthorModel(db)
    const Book = BookModel(db)

    Author.hasMany(Book, { foreignKey: 'author_id' })
    Book.belongsTo(Author, { foreignKey: 'author_id', onDelete: 'CASCADE' })

    return { db, Author, Book }
}

async function main() {
    const { db, Author, Book } = await initDB()
    const server = Fastify({ logger: true })
    await server.register(cors, {
        origin: ['http://localhost:3001']
    })

    const authorController = new AuthorController(Author, db)
    const bookController = new BookController(Book, Author, db)

    registerAuthor(server, authorController)
    registerBook(server, bookController)

    server.listen({ port: 3000 }, function (err, address) {
        if (err) {
            server.log.error(err)
            process.exit(1)
        }
    })
}

main()