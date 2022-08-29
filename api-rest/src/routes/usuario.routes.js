const { Router } = require("express");
const { listarUsuarios, listarUsuario, crearUsuario, editarUsuario, eliminarUsuario, loginUsuario } = require("../controllers/usuario.controller");
const router = Router();

router.get("/usuarios", listarUsuarios);

router.get("/usuarios/:id", listarUsuario);

router.post("/usuarios/:cedula", crearUsuario);

router.put("/usuarios/:id", editarUsuario);

router.delete("/usuarios/:id", eliminarUsuario);

module.exports = router;