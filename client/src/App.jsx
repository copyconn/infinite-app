import React, { createContext, useState } from "react";

import { Dashboard } from "./modules";

export const dataContext = createContext({})

function App() {
    const [page, setPage] = useState(true)

    const togglePage = (page) => {
        if (page === 'Tables') {
            setPage(true)
        } else {
            setPage(false)
        }
    }

    const data = { page, togglePage }

    return (
        <div className="App">
            <dataContext.Provider value={data}>
                <Dashboard/>
            </dataContext.Provider>
        </div>
    );
}

export default App;
