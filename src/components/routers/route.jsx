import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../../pages/login/Login"
import Cadastro from "../../pages/cadastro/cadastro";
import Index from "../../pages/produtos/Index";
import PrivateRoute from "./PrivateRouter";

export default function Routers() {
  return (
    <BrowserRouter>
      <Routes>      
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/produtos" element={<PrivateRoute> <Index /> </PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
