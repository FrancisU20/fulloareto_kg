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
  const [vacunado, setVacunado] = useState({
    tipo_vacuna: "",
    fecha_vac: "",
    nro_dosis: "",
  });

  const navigate = useNavigate();
  const params = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:4000/estado_vacunacion/" + params.id,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(vacunado),
        }
      );
      navigate("/vacunados/listar");
      await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) =>
    setVacunado({ ...vacunado, [e.target.name]: e.target.value });

  useEffect(() => {
    if (params.id) {
      loadVacunado(params.id);
    }
  }, [params.id]);

  const loadVacunado = async (id) => {
    const res = await fetch("http://localhost:4000/estado_vacunacion/" + id);
    const data = await res.json();
    setVacunado({
      tipo_vacuna: data.tipo_vacuna,
      fecha_vac: data.fecha_vac,
      nro_dosis: data.nro_dosis,
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
            Editar Vacunado
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <FormControl fullWidth sx={{ mt: 2 }}>
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
                sx={{ width: 220, mt: 2 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <FormControl fullWidth sx={{ mt: 2 }}>
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
