import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from "@mantine/core";

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <App/>
        </MantineProvider>
);

reportWebVitals();
