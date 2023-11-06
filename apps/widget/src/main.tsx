import React from "react";
import ReactDOM from "react-dom";
import App from "./App.tsx";
import "./index.css";

export const ROOT_ID = "formulaic-widget";

const rootNode = document.getElementById(ROOT_ID);
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootNode
);
