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

async function connectDb() {
    const databaseUrl = process.env.POSTGRES_URL
    const sequelize = new Sequelize(databaseUrl)
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    return sequelize
}

async function main() {
    const db = await connectDb()
    const server = Fastify({ logger: true })
    await server.register(cors, {
        origin: (origin, cb) => {
            const hostname = new URL(origin).hostname
            if (hostname === "localhost") {
                cb(null, true)
                return
            }
            cb(new Error("Not allowed"), false)
        }
    })

    const Author = AuthorModel(db)
    const Book = BookModel(db)

    Author.hasMany(Book, { foreignKey: 'author_id' })
    Book.belongsTo(Author, { foreignKey: 'author_id', onDelete: 'CASCADE' })

    const authorController = new AuthorController(Author, db)
    const bookController = new BookController(Book, db)

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