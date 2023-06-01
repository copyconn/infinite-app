import React, { useCallback, useEffect, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Button, Modal } from '@mantine/core';
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";

import { columnsAuthor, columnsBook } from "./utils";

import { Form } from "./Form";

import { createBook, deleteBook, getAuthors, getBooks, updateBook } from "../../../api";

export const Tables = () => {
    const gridRef = useRef()
    const [books, setBooks] = useState([])
    const [selected, setSelected] = useState(null)
    const [opened, { open, close }] = useDisclosure(false);

    const onGridReady = useCallback((params) => {
        const dataSource = {
            rowCount: undefined,
            getRows: (params) => {
                getAuthors(params.endRow - params.startRow, params.startRow)
                    .then(({ rows, count }) => {
                        const authors = rows.map((authorRow) => {
                            const date = new Date(authorRow.created_at).toLocaleDateString()
                            return { ...authorRow, created_at: date }
                        })
                        params.successCallback(authors, count)
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

    const onSelectionChanged = useCallback(() => {
        const selectedRows = gridRef.current.api.getSelectedRows();
        setSelected(selectedRows[0])
    }, [])

    const getRowId = useCallback(params => {
        return params.data.id
    })

    const getBooksData = async () => {
        try {
            const rows = await getBooks()
            setBooks(rows)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.response.data.message)
            } else {
                console.log('unexpected error: ', error);
            }
        }
    }

    const sendBookData = async (book) => {
        if (book.id) {
            await updateBook(book.id, book.name, book.authorId, book.price)
        } else {
            await createBook(book.name, book.authorId, book.price)
        }

        await getBooksData()

        close()
        setSelected(null)
    }

    const deleteBookData = async (id) => {
        await deleteBook(id)
        await getBooksData()
    }

    useEffect(() => {
        getBooksData()
    }, [])

    const openFormCreate = () => {
        setSelected(null)
        open()
    }

    const booksTableData = books.map((bookRow) => {
        const date = new Date(bookRow.createdAt).toLocaleDateString()
        return { ...bookRow, createdAt: date }
    })

    return (
        <div>
            <Modal opened={opened} onClose={close} centered>
                <Form book={selected} onSubmit={sendBookData}/>
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
                    <Button variant={"outline"} onClick={openFormCreate}>Добавить запись</Button>
                    <Button variant={"outline"} disabled={!selected} onClick={open}>Изменить
                        запись</Button>
                    <Button variant={"outline"} disabled={!selected} onClick={() => deleteBookData(selected?.id)}>Удалить
                        запись</Button>
                </div>

                <div className="ag-theme-alpine" style={{ height: 400, width: 800, marginTop: 10 }}>
                    <AgGridReact
                        getRowId={getRowId}
                        ref={gridRef}
                        rowData={booksTableData}
                        columnDefs={columnsBook}
                        rowSelection={'single'}
                        onSelectionChanged={onSelectionChanged}
                    ></AgGridReact>
                </div>
            </div>
        </div>
    )
}