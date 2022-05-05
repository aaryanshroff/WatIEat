import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import PrivateRoute from "./PrivateRoute";
import Login from "./routes/Login";
import Register from "./routes/Register";
import './styles/index.css'

render(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PrivateRoute><App /></PrivateRoute>} />
        <Route path='login' element={<Login />}/>
        <Route path='register' element={<Register />}/>
      </Routes>
    </BrowserRouter>,
    document.getElementById("root")
  );