import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { initStore } from "./store";
// import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";

const store = initStore();

// store.dispatch(action)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
