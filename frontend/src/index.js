import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import PortfolioApp from "./components/app/PortfolioApp";

ReactDOM.render(
  <React.StrictMode>
    <PortfolioApp />
  </React.StrictMode>,

  document.getElementById("root")
);

serviceWorker.unregister();
