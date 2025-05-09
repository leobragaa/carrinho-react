import React from "react";
import { Route, Routes } from "react-router";
import Login from "../../pages/login/Login"
import Cadastro from "../../pages/cadastro/cadastro";
import Index from "../../pages/produtos/Index";

function Routers() {
  return (
    <Routes>
      <Route
        path="/" element={<Login />}
      />
      <Route
        path="/login" element={<Login />}
      />
      <Route
        path="/cadastro" element={<Cadastro />}
      />
      <Route
        path = "/produtos" element={<Index/>}
      />
    </Routes>
  );
}

export default Routers;