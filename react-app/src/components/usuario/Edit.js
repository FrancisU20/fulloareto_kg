import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
  const [usuario, setUsuario] = useState({
    pwd: "",
    is_active: "",
    roles_id: "",
  });

  const navigate = useNavigate();
  const params = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:4000/usuarios/" + params.id,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(usuario),
        }
      );
      navigate("/usuarios/listar");
      await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) =>
    setUsuario({ ...usuario, [e.target.name]: e.target.value });

  useEffect(() => {
    if (params.id) {
      loadUsuario(params.id);
    }
  }, [params.id]);

  const loadUsuario = async (id) => {
    const res = await fetch("http://localhost:4000/usuarios/" + id);
    const data = await res.json();
    setUsuario({
      pwd: data.pwd,
      is_active: data.is_active,
      roles_id: data.roles_id,
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
            Editar Usuario
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              
              <TextField
                required
                variant="filled"
                label="Contrasena"
                type="password"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                name="pwd"
                onChange={handleChange}
                value={usuario.pwd}
              />

              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Está Activo?</InputLabel>
                <Select
                  required
                  name="is_active"
                  value={usuario.is_active}
                  label="Está Activo?"
                  onChange={handleChange}
                >
                  <MenuItem value={true}>Sí</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Rol</InputLabel>
                <Select
                  required
                  name="roles_id"
                  value={usuario.roles_id}
                  label="Rol"
                  onChange={handleChange}
                >
                  <MenuItem value={1}>Empleado</MenuItem>
                  <MenuItem value={2}>Administrador</MenuItem>
                </Select>
              </FormControl>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
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
