const getAuthorsSchema = {
    schema: {
        querystring: {
            type: 'object',
            properties: {
                limit: { type: 'integer', minimum: 0 },
                offset: { type: 'integer', minimum: 0 }
            },
            required: ['limit', 'offset']
        }
    }
}

const createAuthorSchema = {
    schema: {
        body: {
            type: 'object',
            properties: {
                name: { type: 'string', minLength: 1, pattern: "^[а-яА-Я ]+$" },
                rating: { type: 'number', minimum: 0, maximum: 10 }
            },
            required: ['name']
        }
    }
}

const updateAuthorSchema = {
    schema: {
        body: {
            type: 'object',
            properties: {
                name: { type: 'string', minLength: 1, pattern: "^[а-яА-Я ]+$" },
                rating: { type: 'number', minimum: 0, maximum: 10 }
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

const deleteAuthorSchema = {
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

    server.get('/api/authors', getAuthorsSchema, async (request, reply) => {
        const limit = request.query.limit
        const offset = request.query.offset
        const result = await controller.getList(limit, offset)
        return result
    })

    server.post('/api/authors', createAuthorSchema, async (request, reply) => {
        const name = request.body.name
        const rating = request.body.rating
        await controller.createAuthor(name, rating)
    })

    server.put('/api/authors/:id', updateAuthorSchema, async (request, reply) => {
        const authorId = request.params.id
        const name = request.body.name
        const rating = request.body.rating
        await controller.updateAuthor(authorId, name, rating)
    })

    server.delete('/api/authors/:id', deleteAuthorSchema, async (request, reply) => {
        const authorId = request.params.id
        await controller.deleteAuthor(authorId)
    })
}

module.exports = register