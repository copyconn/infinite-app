import React, { useContext, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { columnsAuthor } from "./utils";

import { dataContext } from "../../../App";

export const Tables = () => {
    const data = useContext(dataContext)
    const [rowDataAuthor] = useState(data.authors)
    const [columnDefsAuthor] = useState(columnsAuthor)

    return (
        <div>
            <div>
                <h3>Таблица "Автор"</h3>
                <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
                    <AgGridReact rowData={rowDataAuthor} columnDefs={columnDefsAuthor}></AgGridReact>
                </div>
            </div>

            <div>
                <h3>Таблица "Автор"</h3>
                <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
                    <AgGridReact rowData={rowDataAuthor} columnDefs={columnDefsAuthor}></AgGridReact>
                </div>
            </div>
        </div>
    )
}