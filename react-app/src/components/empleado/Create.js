import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

const Create = () => {
  const [empleado, setEmpleado] = useState({
    cedula: "",
    nombres: "",
    apellidos: "",
    email: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/empleados", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(empleado),
      });
      await response.json();

      const crearusuario = await fetch("http://localhost:4000/usuarios/" + empleado.cedula, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      await crearusuario.json();

      navigate("/empleados/listar");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) =>
    setEmpleado({ ...empleado, [e.target.name]: e.target.value });

  return (
    <Grid
      container
      alignItems="center"
      direction="column"
      justifyContent="center"
    >
      <Grid item xs={3}>
        <Card
          sx={{ mt: 5 }}
          style={{
            padding: "1rem",
          }}
        >
          <Typography variant="h5" textAlign="center">
            Registrar Empleado
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                required
                variant="filled"
                label="Cedula"
                type="number"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                name="cedula"
                onChange={handleChange}
                value={empleado.cedula}
              />
              <TextField
                required
                variant="filled"
                label="Nombres"
                type="text"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                name="nombres"
                onChange={handleChange}
                value={empleado.nombres}
              />

              <TextField
                required
                variant="filled"
                label="Apellidos"
                type="text"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                name="apellidos"
                onChange={handleChange}
                value={empleado.apellidos}
              />

              <TextField
                required
                variant="filled"
                label="Email"
                type="email"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                name="email"
                onChange={handleChange}
                value={empleado.email}
              />
              <Button type="submit" variant="contained" color="primary">
                Registrar
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Create;
