import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../../pages/login/Login"
import Dashboard from "../layout/Dashboard";
import Cadastro from "../../pages/cadastro/cadastro";
import PrivateRoute from "./PrivateRouter";
import SeeProduct from "../../controller/SeeProduct";
import UpdateProduct from "../../controller/UpdateProduct";
import CreateProduct from "../../controller/CreateProduct";

export default function Routers() {
  return (
    <BrowserRouter>
      <Routes>      
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >

          <Route index element={<SeeProduct />} />
          <Route path = "see" element={<SeeProduct />} />
          <Route path = "update" element={< UpdateProduct/>} />
          <Route path = "create" element={< CreateProduct/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}