const { Router } = require("express");
const { listarEmpleados, listarEmpleado, crearEmpleado, editarEmpleado, eliminarEmpleado } = require("../controllers/empleado.controller");
const router = Router();

router.get("/empleados", listarEmpleados);

router.get("/empleados/:cedula", listarEmpleado);

router.post("/empleados", crearEmpleado);

router.put("/empleados/:cedula", editarEmpleado);

router.delete("/empleados/:cedula", eliminarEmpleado);

module.exports = router;
