import React from "react";
import ReactDOM from "react-dom";
import "./style/index.css";
import App from "./app/App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Router } from "react-router-dom";
import ScrollToTop from "./app/layout/ScrollToTop";
import { createBrowserHistory } from "history";
export const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <ScrollToTop>
      <App />
    </ScrollToTop>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
