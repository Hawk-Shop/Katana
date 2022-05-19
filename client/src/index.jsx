import React from "react";
import { render } from "react-dom";
import App from "./components/App.jsx";

const root = document.createElement("div");
root.setAttribute("id", "root");
document.body.appendChild(root);

render(<App />, root)