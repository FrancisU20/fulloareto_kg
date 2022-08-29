import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmpleadoNav from "./components/empleado/Navbar";
import EmpleadoCreate from "./components/empleado/Create";
import EmpleadoList from "./components/empleado/List";
import EmpleadoEdit from "./components/empleado/Edit";

import UsuarioList from "./components/usuario/List";
import UsuarioNav from "./components/usuario/Navbar";
import UsuarioEdit from "./components/usuario/Edit";

import VacunadoNav from "./components/estado_vacunacion/Navbar";
import VacunadoCreate from "./components/estado_vacunacion/Create";
import VacunadoList from "./components/estado_vacunacion/List";
import VacunadoEdit from "./components/estado_vacunacion/Edit";

import { Container } from "@mui/material";

export default function App() {
  return (
    <BrowserRouter>
      <Container>
        <Routes>
          <Route path="/empleados/*" element={<EmpleadoNav />}>
            <Route path="listar" element={<EmpleadoList />}></Route>
            <Route path="registrar" element={<EmpleadoCreate />}></Route>
            <Route path=":id/editar" element={<EmpleadoEdit />}></Route>
          </Route>

          <Route path="/usuarios/*" element={<UsuarioNav />}>
            <Route path="listar" element={<UsuarioList />}></Route>
            <Route path=":id/editar" element={<UsuarioEdit />}></Route>
          </Route>

          <Route path="/vacunados/*" element={<VacunadoNav />}>
            <Route path="registrar" element={<VacunadoCreate />}></Route>
            <Route path="listar" element={<VacunadoList />}></Route>
            <Route path=":id/editar" element={<VacunadoEdit />}></Route>
          </Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}
