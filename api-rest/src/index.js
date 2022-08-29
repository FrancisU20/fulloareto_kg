const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const empleadoRoutes = require("./routes/empleado.routes");
const vacunacionRoutes = require("./routes/estado_vacunacion.routes");
const usuarioRoutes = require("./routes/usuario.routes");
const loginRoutes = require("./routes/login.routes");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(empleadoRoutes);
app.use(vacunacionRoutes);
app.use(usuarioRoutes);
app.use(loginRoutes);

app.listen(4000);
console.log("Servidor iniciado en el puerto 4000");
