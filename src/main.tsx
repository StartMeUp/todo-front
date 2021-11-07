import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { Provider } from "overmind-react";
import { createOvermind } from "overmind";
import { config } from "./store";

const overmind = createOvermind(config, {
  devtools: true, // defaults to 'localhost:3031'
});

ReactDOM.render(
  <React.StrictMode>
    <Provider value={overmind}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
