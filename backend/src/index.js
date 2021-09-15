import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

import "startbootstrap-sb-admin-2/css/sb-admin-2.css";
import "startbootstrap-sb-admin-2/vendor/fontawesome-free/css/all.min.css";
import "startbootstrap-sb-admin-2/vendor/jquery/jquery.min.js";

import "startbootstrap-sb-admin-2/vendor/bootstrap/js/bootstrap.bundle.min.js";
import "startbootstrap-sb-admin-2/vendor/jquery-easing/jquery.easing.min.js";

import "startbootstrap-sb-admin-2/vendor/datatables/jquery.dataTables.min.js";
import "startbootstrap-sb-admin-2/vendor/datatables/dataTables.bootstrap4.min.js";
import "startbootstrap-sb-admin-2/vendor/datatables/dataTables.bootstrap4.min.css";

import "startbootstrap-sb-admin-2/js/demo/datatables-demo.js";
// import "startbootstrap-sb-admin-2/js/sb-admin-2.js";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
