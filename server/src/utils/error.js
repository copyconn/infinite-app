const createError = require('@fastify/error')

const AuthorNotFoundError = createError('AUTHOR_NOT_FOUND', 'Автор не найден', 404)
const BookNotFoundError = createError('BOOK_NOT_FOUND', 'Книга не найдена', 404)

module.exports = { AuthorNotFoundError, BookNotFoundError }