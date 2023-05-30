import React, { createContext, useEffect, useState } from "react";
import { Dashboard } from "./modules";
import { getAuthors, getBooks } from "./api";
import axios from "axios";

export const dataContext = createContext({})

function App() {
    const [page, setPage] = useState(true)
    const [authors, setAuthors] = useState({ rows: [], count: 0 })
    const [books, setBooks] = useState([])

    const togglePage = (page) => {
        if (page === 'Tables') {
            setPage(true)
        } else {
            setPage(false)
        }
    }

    const getAuthorsData = async () => {
        try {
            const result = await getAuthors(10, 0)
            setAuthors(result.data)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.response.data.message)
            } else {
                console.log('unexpected error: ', error);
            }
        }
    }

    const getBooksData = async () => {
        try {
            const result = await getBooks(10, 0)
            setBooks(result.data)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.response.data.message)
            } else {
                console.log('unexpected error: ', error);
            }
        }
    }

    useEffect(() => {
        getAuthorsData()
        getBooksData()
    }, [])


    const data = { page, togglePage, authors, books }

    return (
        <div className="App">
            <dataContext.Provider value={data}>
                <Dashboard/>
            </dataContext.Provider>
        </div>
    );
}

export default App;
