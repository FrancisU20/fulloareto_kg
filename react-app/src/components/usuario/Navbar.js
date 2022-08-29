import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, Outlet } from "react-router-dom";

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Container>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              <Link
                to={"/usuarios/listar"}
                style={{ textDecoration: "none", color: "white" }}
              >
                Usuarios
              </Link>
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </Box>
  );
}
