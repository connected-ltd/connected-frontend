import { CssBaseline } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./app/store.ts";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.Fragment>
    <Provider store={store}>
      <BrowserRouter future={{ v7_startTransition: true }}>
        <CssBaseline />
        <App />
      </BrowserRouter>
    </Provider>
  </React.Fragment>
);
