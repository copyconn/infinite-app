const createBookSchema = {
    schema: {
        body: {
            type: 'object',
            properties: {
                name: { type: 'string', minLength: 1, pattern: "^[а-яА-Я ]+$" },
                authorId: { type: 'integer', minimum: 1 },
                price: { type: 'number', minimum: 0 }
            },
            required: ['name', 'authorId']
        }
    }
}

const updateBookSchema = {
    schema: {
        body: {
            type: 'object',
            properties: {
                name: { type: 'string', minLength: 1, pattern: "^[а-яА-Я ]+$" },
                authorId: { type: 'integer', minimum: 1 },
                price: { type: 'number', minimum: 0 }
            },
        },
        params: {
            type: 'object',
            properties: {
                id: { type: 'integer', minimum: 1 }
            }
        }
    }
}

const deleteBookSchema = {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: { type: 'integer', minimum: 1 }
            }
        }
    }
}

function register(server, controller) {

    server.get('/api/books', async (request, reply) => {
        const result = await controller.getList()
        return result
    })

    server.post('/api/books', createBookSchema, async (request, reply) => {
        const name = request.body.name
        const authorId = request.body.authorId
        const price = request.body.price
        await controller.createBook(name, authorId, price)
    })

    server.put('/api/books/:id', updateBookSchema, async (request, reply) => {
        const bookId = request.params.id
        const name = request.body.name
        const authorId = request.body.authorId
        const price = request.body.price
        await controller.updateBook(bookId, name, authorId, price)
    })

    server.delete('/api/books/:id', deleteBookSchema, async (request, reply) => {
        const bookId = request.params.id
        await controller.deleteBook(bookId)
    })
}

module.exports = register