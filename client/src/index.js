import React from "react";
import ReactDOM from "react-dom/client";

import "./styles/global.css";
import Routes from "./Pages/Client/Me";
import Login from "./Pages/Login";
import Me from "./Pages/Client/Me";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Login />
    </React.StrictMode>
);
