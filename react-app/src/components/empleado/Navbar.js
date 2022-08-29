import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Container>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              <Link
                to={"/empleados/listar"}
                style={{ textDecoration: "none", color: "white" }}
              >
                Empleados
              </Link>
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/empleados/registrar")}
            >
              Registrar Empleado
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </Box>
  );
}
