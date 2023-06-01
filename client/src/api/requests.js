import axios from "axios";

const URL = 'http://localhost:3000/'

const axiosInstance = axios.create({
    baseURL: URL
})

export const getAuthors = (limit, offset) =>
    axiosInstance.get(`api/authors?limit=${limit}&offset=${offset}`).then(result => result.data)

export const getBooks = () =>
    axiosInstance.get(`api/books`).then(result => result.data)

export const createBook = (name, authorId, price) =>
    axiosInstance.post(`api/books`, { name: name, authorId: authorId, price: price })

export const updateBook = (id, name, authorId, price) =>
    axiosInstance.put(`api/books/${id}`, { name: name, authorId: authorId, price: price })

export const deleteBook = (id) =>
    axiosInstance.delete(`api/books/${id}`)