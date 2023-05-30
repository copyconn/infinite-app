import React, { useCallback, useContext } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Button } from '@mantine/core';

import { columnsAuthor, columnsBook } from "./utils";

import { dataContext } from "../../../App";
import { getAuthors } from "../../../api";

export const Tables = () => {
    const data = useContext(dataContext)

    const books = data.books.map((bookRow) => {
        return { ...bookRow, createdAt: bookRow.createdAt.split('-').reverse().join('.') }
    })

    const onGridReady = useCallback((params) => {
        const dataSource = {
            rowCount: undefined,
            getRows: (params) => {
                getAuthors(params.endRow - params.startRow, params.startRow)
                    .then((result) => {
                        const authors = result.data.rows.map((authorRow) => {
                            return { ...authorRow, created_at: authorRow.created_at.split('-').reverse().join('.') }
                        })
                        params.successCallback(authors, result.data.count)
                    })

            },
        };
        params.api.setDatasource(dataSource);
    }, [])
    return (
        <div>
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
                    <Button variant={"outline"}>Добавить запись</Button>
                    <Button variant={"outline"}>Изменить запись</Button>
                    <Button variant={"outline"}>Удалить запись</Button>
                </div>

                <div className="ag-theme-alpine" style={{ height: 400, width: 800, marginTop: 10 }}>
                    <AgGridReact
                        rowData={books}
                        columnDefs={columnsBook}
                        rowSelection={'single'}
                    ></AgGridReact>
                </div>
            </div>
        </div>
    )
}