import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";

/**
 *
 * Render the react application in #root html element
 *
 */
ReactDOM.createRoot(document.querySelector("#root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);