import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App.jsx";
import './assets/styles.css';


const container = document.createElement("div");
container.setAttribute("id", "root");
document.body.appendChild(container);
const root = createRoot(container);

root.render(<App />)

