import React, { useCallback, useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Button, Modal } from '@mantine/core';
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";

import { columnsAuthor, columnsBook } from "./utils";

import { Form } from "./Form";

import { createBook, getAuthors, getBooks } from "../../../api";

export const Tables = () => {
    const [books, setBooks] = useState([])
    const [selected, setSelected] = useState(null)

    const [opened, { open, close }] = useDisclosure(false);

    const getBooksData = async () => {
        try {
            const result = await getBooks()
            setBooks(result.data)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.response.data.message)
            } else {
                console.log('unexpected error: ', error);
            }
        }
    }

    const onGridReady = useCallback((params) => {
        const dataSource = {
            rowCount: undefined,
            getRows: (params) => {
                getAuthors(params.endRow - params.startRow, params.startRow)
                    .then((result) => {
                        const authors = result.data.rows.map((authorRow) => {
                            const date = new Date(authorRow.created_at).toLocaleDateString()
                            return { ...authorRow, created_at: date }
                        })
                        params.successCallback(authors, result.data.count)
                    })
                    .catch(error => {
                        if (axios.isAxiosError(error)) {
                            console.log(error.response.data.message)
                        } else {
                            console.log('unexpected error: ', error);
                        }
                    })

            },
        };
        params.api.setDatasource(dataSource);
    }, [])

    const sendData = async (book) => {
        if (book.id) {

        } else {
            await createBook(book.name, book.authorId, book.price)
        }
        await getBooksData()
        close()
    }

    useEffect(() => {
        getBooksData()
    }, [])

    const booksTableData = books.map((bookRow) => {
        const date = new Date(bookRow.createdAt).toLocaleDateString()
        return { ...bookRow, createdAt: date }
    })

    return (
        <div>
            <Modal opened={opened} onClose={close} title="Authentication" centered>
                <Form book={selected} onSubmit={sendData}/>
            </Modal>

            <div>
                <h3>Таблица "Автор"</h3>

                <div className="ag-theme-alpine" style={{ height: 400, width: 800 }}>
                    <AgGridReact
                        columnDefs={columnsAuthor}
                        rowModelType={'infinite'}
                        onGridReady={onGridReady}
                        cacheBlockSize={10}
                    ></AgGridReact>
                </div>
            </div>

            <div>
                <h3>Таблица "Книги"</h3>

                <div style={{ display: 'flex', gap: 10 }}>
                    <Button variant={"outline"} onClick={open}>Добавить запись</Button>
                    <Button variant={"outline"}>Изменить запись</Button>
                    <Button variant={"outline"}>Удалить запись</Button>
                </div>

                <div className="ag-theme-alpine" style={{ height: 400, width: 800, marginTop: 10 }}>
                    <AgGridReact
                        rowData={booksTableData}
                        columnDefs={columnsBook}
                        rowSelection={'single'}
                    ></AgGridReact>
                </div>
            </div>
        </div>
    )
}