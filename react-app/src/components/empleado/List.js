import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useNavigate } from "react-router-dom";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const List = () => {
  const [empleados, setEmpleados] = useState([]);
  const navigate = useNavigate();

  const loadEmpleados = async () => {
    const response = await fetch("http://localhost:4000/empleados");
    const data = await response.json();
    setEmpleados(data);
  };

  const handleDelete = async (cedula) => {
    try {
      await fetch(`http://localhost:4000/empleados/${cedula}`, {
        method: "DELETE",
      });
      setEmpleados(empleados.filter((empleado) => empleado.cedula !== cedula));
    } catch (error) {
      console.error(error);
    }
  };

  const [filtro, setFiltro] = useState(false);

  const handleChange = (event) => {
    setFiltro(event.target.value);
  };

  useEffect(() => {
    loadEmpleados();
  }, []);

  return (
    <TableContainer component={Paper} sx={{ mt: 5 }}>
      <FormControl sx={{ mt: 5, ml: 1 }}>
        <InputLabel id="demo-simple-select-label">Filtrar</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filtro}
          label="Filtrar"
          onChange={handleChange}
        >
          <MenuItem value={false}>Todos</MenuItem>
          <MenuItem value={true}>Vacunados</MenuItem>
        </Select>
      </FormControl>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell align="right">Cedula</TableCell>
            <TableCell align="right">Nombres</TableCell>
            <TableCell align="right">Apellidos</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Fecha de Nacimiento</TableCell>
            <TableCell align="right">Direccion</TableCell>
            <TableCell align="right">Celular</TableCell>
            <TableCell align="right">Está Vacunado?</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtro
            ? empleados
                .filter((empleado) => empleado.vacunado === true)
                .map((empleado) => (
                  <TableRow
                    key={empleado.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {empleado.id}
                    </TableCell>
                    <TableCell align="right">{empleado.cedula}</TableCell>
                    <TableCell align="right">{empleado.nombres}</TableCell>
                    <TableCell align="right">{empleado.apellidos}</TableCell>
                    <TableCell align="right">{empleado.email}</TableCell>
                    <TableCell align="right">{empleado.fecha_nac}</TableCell>
                    <TableCell align="right">{empleado.direccion}</TableCell>
                    <TableCell align="right">{empleado.celular}</TableCell>
                    <TableCell align="right">
                      {String(empleado.vacunado)}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="inherit"
                        onClick={() =>
                          navigate(`/empleados/${empleado.cedula}/editar`)
                        }
                      >
                        Editar
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={() => handleDelete(empleado.cedula)}
                        style={{ marginLeft: ".5rem" }}
                      >
                        Eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
            : empleados.map((empleado) => (
                <TableRow
                  key={empleado.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {empleado.id}
                  </TableCell>
                  <TableCell align="right">{empleado.cedula}</TableCell>
                  <TableCell align="right">{empleado.nombres}</TableCell>
                  <TableCell align="right">{empleado.apellidos}</TableCell>
                  <TableCell align="right">{empleado.email}</TableCell>
                  <TableCell align="right">{empleado.fecha_nac}</TableCell>
                  <TableCell align="right">{empleado.direccion}</TableCell>
                  <TableCell align="right">{empleado.celular}</TableCell>
                  <TableCell align="right">
                    {String(empleado.vacunado)}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="inherit"
                      onClick={() =>
                        navigate(`/empleados/${empleado.cedula}/editar`)
                      }
                    >
                      Editar
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => handleDelete(empleado.cedula)}
                      style={{ marginLeft: ".5rem" }}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
