import axios from "axios";

const URL = 'http://localhost:3000/'

const axiosInstance = axios.create({
    baseURL: URL
})

export const getAuthors = (limit, offset) =>
    axiosInstance.get(`api/authors?limit=${limit}&offset=${offset}`)

export const getBooks = (limit, offset) =>
    axiosInstance.get(`api/books?limit=${limit}&offset=${offset}`)