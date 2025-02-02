import React from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import App from "./App";

const app = createRoot(document.getElementById("app"));

app.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
