import React from "react";
import ReactDOM from "react-dom";
import "./assets/styles/index.css";
import App from "./App";
import "./i18n";
import store from "./redux/store";
import { Provider } from "react-redux";
import ErrorBoundary from "./components/ErrorBoundary";
import history from "./history";
import { Router } from "react-router-dom";
import "./jss";

const output = (
  <>
    <React.StrictMode>
      <ErrorBoundary>
        <Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </Provider>
      </ErrorBoundary>
    </React.StrictMode>
  </>
);

ReactDOM.render(output, document.getElementById("appMountPoint"));
