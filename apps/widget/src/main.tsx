import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const ROOT_ID = "formulaic-widget";

ReactDOM.createRoot(document.getElementById(ROOT_ID)!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
