import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import rootReducer from "./reducer";
import { configureStore } from "@reduxjs/toolkit";
import { Toaster } from "react-hot-toast";
import {PrimeReactProvider} from 'primereact/api'

const store = configureStore({
  reducer:rootReducer
})

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
  <Provider store={store}>
    <PrimeReactProvider>
        <BrowserRouter>
            <App />
            <Toaster/>
        </BrowserRouter>
    </PrimeReactProvider>
  </Provider>
    
  </React.StrictMode>
);