import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

import {
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const Edit = () => {
  const [empleado, setEmpleado] = useState({
    nombres: "",
    apellidos: "",
    email: "",
    fecha_nac: "",
    direccion: "",
    celular: "",
    vacunado: "",
  });

  const navigate = useNavigate();
  const params = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:4000/empleados/" + params.id,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(empleado),
        }
      );
      navigate("/empleados/listar");
      await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) =>
    setEmpleado({ ...empleado, [e.target.name]: e.target.value });

  useEffect(() => {
    if (params.id) {
      loadEmpleado(params.id);
    }
  }, [params.id]);

  const loadEmpleado = async (id) => {
    const res = await fetch("http://localhost:4000/empleados/" + id);
    const data = await res.json();
    setEmpleado({
      nombres: data.nombres,
      apellidos: data.apellidos,
      email: data.email,
      fecha_nac: data.fecha_nac,
      direccion: data.direccion,
      celular: data.celular,
      vacunado: data.vacunado,
    });
  };
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
            Editar Empleado
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                disabled
                variant="filled"
                label="Nombres"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                name="nombres"
                onChange={handleChange}
                value={empleado.nombres}
              />

              <TextField
                disabled
                variant="filled"
                label="Apellidos"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                name="apellidos"
                onChange={handleChange}
                value={empleado.apellidos}
              />

              <TextField
                disabled
                variant="filled"
                label="Email"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                name="email"
                onChange={handleChange}
                value={empleado.email}
              />
              <TextField
                required
                id="date"
                label="Fecha de Nacimiento"
                type="date"
                value={moment(empleado.fecha_nac).format("YYYY-MM-DD")}
                name="fecha_nac"
                onChange={handleChange}
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                required
                variant="filled"
                label="Direccion"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                name="direccion"
                onChange={handleChange}
                value={empleado.direccion}
              />
              <TextField
                required
                variant="filled"
                label="Celular"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                name="celular"
                onChange={handleChange}
                value={empleado.celular}
              />

              <FormControl fullWidth>
                <InputLabel>Está Vacunado?</InputLabel>
                <Select
                  name="vacunado"
                  value={empleado.vacunado}
                  label="Está Vacunado?"
                  onChange={handleChange}
                >
                  <MenuItem value={true}>Sí</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
              <Button type="submit" variant="contained" color="primary">
                Editar
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Edit;
