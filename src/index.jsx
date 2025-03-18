import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';

import App from "./App.jsx";

const root = createRoot(document.getElementById('root'));
    root.render(
        <StrictMode>
        <App />
        </StrictMode>
)