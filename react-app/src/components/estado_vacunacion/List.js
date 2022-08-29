import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useNavigate } from "react-router-dom";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const List = () => {
  const [vacunados, setVacunados] = useState([]);
  const navigate = useNavigate();

  const loadVacunados = async () => {
    const response = await fetch("http://localhost:4000/estado_vacunacion");
    const data = await response.json();
    setVacunados(data);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:4000/estado_vacunacion/${id}`, {
        method: "DELETE",
      });
      setVacunados(vacunados.filter((vacunado) => vacunado.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const [filtro, setFiltro] = useState(1);

  const handleChange = (event) => {
    setFiltro(event.target.value);
  };

  useEffect(() => {
    loadVacunados();
  }, []);
  return (
    <TableContainer component={Paper} sx={{ mt: 5 }}>
      <FormControl item xs={8} sx={{ mt: 5, ml: 1, }}>
        <InputLabel id="demo-simple-select-label">Filtrar por # de Dosis</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filtro}
          label="Filtrar por # de Dosis"
          onChange={handleChange}
        >
          <MenuItem value={1}>1era Dosis</MenuItem>
          <MenuItem value={2}>2da Dosis</MenuItem>
          <MenuItem value={3}>3ra Dosis</MenuItem>
          <MenuItem value={4}>4ta Dosis</MenuItem>
        </Select>
      </FormControl>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell align="right">id Empleado</TableCell>
            <TableCell align="right">Tipo de Vacuna</TableCell>
            <TableCell align="right">Fecha de Vacunacion</TableCell>
            <TableCell align="right"># de Dosis</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vacunados.filter((vacunado) => vacunado.nro_dosis === filtro).map((vacunado) => (
            <TableRow
              key={vacunado.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {vacunado.id}
              </TableCell>
              <TableCell align="right">{vacunado.empleado_id}</TableCell>
              <TableCell align="right">{vacunado.tipo_vacuna}</TableCell>
              <TableCell align="right">{vacunado.fecha_vac}</TableCell>
              <TableCell align="right">{vacunado.nro_dosis}</TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={() => navigate(`/vacunados/${vacunado.id}/editar`)}
                >
                  Editar
                </Button>
              </TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => handleDelete(vacunado.id)}
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
