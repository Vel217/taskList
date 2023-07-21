import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./pages/Home/index.js";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn/index.js";
import { LOGIN_PATH, HOME_PATH } from "./config.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path={HOME_PATH} element={<Home />} />
      <Route path={LOGIN_PATH} element={<SignIn />} />
    </Routes>
  </BrowserRouter>
);
