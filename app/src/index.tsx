import React from "react";
import ReactDOM from "react-dom";
import "./assets/styles/index.css";
import App from "./App";
import "./i18n";
import ErrorBoundary from "./components/ErrorBoundary";

const output = (
  <>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </>
);

ReactDOM.render(output, document.getElementById("appMountPoint"));
