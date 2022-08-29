import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const List = () => {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  const loadUsuarios = async () => {
    const response = await fetch("http://localhost:4000/usuarios");
    const data = await response.json();
    setUsuarios(data);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:4000/usuarios/${id}`, {
        method: "DELETE",
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadUsuarios();
  }, []);
  return (
    <TableContainer component={Paper} sx={{ mt: 5 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell align="right">Usuario</TableCell>
            <TableCell align="right">Contrasena</TableCell>
            <TableCell align="right">Estado</TableCell>
            <TableCell align="right">Rol</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usuarios.map((usuario) => (
            <TableRow
              key={usuario.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {usuario.id}
              </TableCell>
              <TableCell align="right">{usuario.username}</TableCell>
              <TableCell align="right">{usuario.pwd}</TableCell>
              <TableCell align="right">{String(usuario.is_active)}</TableCell>
              <TableCell align="right">{usuario.roles_id}</TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={() => navigate(`/usuarios/${usuario.id}/editar`)}
                >
                  Editar
                </Button>
              </TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => handleDelete(usuario.id)}
                >
                  Desactivar
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
