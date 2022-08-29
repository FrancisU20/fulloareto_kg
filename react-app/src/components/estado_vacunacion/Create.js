import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
import moment from "moment";

const Create = () => {
  const [vacunado, setVacunado] = useState({
    empleado_id: "",
    tipo_vacuna: "",
    fecha_vac: "",
    nro_dosis: "",
  });

  const [empleados, setEmpleados] = useState([]);

  const loadEmpleados = async () => {
    const response = await fetch("http://localhost:4000/empleados");
    const data = await response.json();
    setEmpleados(data);
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/estado_vacunacion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(vacunado),
      });
      await response.json();

      navigate("/vacunados/listar");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) =>
    setVacunado({ ...vacunado, [e.target.name]: e.target.value });

  useEffect(() => {
    loadEmpleados();
  }, []);

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
            Registrar Vacuna
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <FormControl fullWidth>
                <InputLabel>Empleado</InputLabel>
                <Select
                  name="empleado_id"
                  value={vacunado.empleado_id}
                  label="Empleado"
                  onChange={handleChange}
                >
                  {empleados.map((empleado) => (
                    <MenuItem value={empleado.id}>
                      {empleado.cedula}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{mt:2}}>
                <InputLabel>Tipo de Vacuna</InputLabel>
                <Select
                  name="tipo_vacuna"
                  value={vacunado.tipo_vacuna}
                  label="Tipo de Vacuna"
                  onChange={handleChange}
                >
                  <MenuItem value={"AstraZeneca"}>Astrazeneca</MenuItem>
                  <MenuItem value={"Sputnik"}>Sputnik</MenuItem>
                  <MenuItem value={"Pfizer"}>Pfizer</MenuItem>
                  <MenuItem value={"Jhonson&Jhonson"}>Jhonson&Jhonson</MenuItem>
                </Select>
              </FormControl>

              <TextField 
                required
                id="date"
                label="Fecha de Vacunación"
                type="date"
                value={moment(vacunado.fecha_vac).format("YYYY-MM-DD")}
                name="fecha_vac"
                onChange={handleChange}
                sx={{ width: 220, mt:2 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <FormControl fullWidth sx={{mt:2}}>
                <InputLabel># de Dosis</InputLabel>
                <Select
                  name="nro_dosis"
                  value={vacunado.nro_dosis}
                  label="# de Dosis"
                  onChange={handleChange}
                >
                  <MenuItem value={1}>1era</MenuItem>
                  <MenuItem value={2}>2da</MenuItem>
                  <MenuItem value={3}>3ra</MenuItem>
                  <MenuItem value={4}>4ta</MenuItem>
                </Select>
              </FormControl>

              <Button sx={{mt:2}} type="submit" variant="contained" color="primary">
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
