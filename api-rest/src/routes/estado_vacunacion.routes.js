const { Router } = require("express");
const { listarVacunados, listarVacunado, crearVacunado, editarVacunado, eliminarVacunado } = require("../controllers/estado_vacunacion.controller");
const router = Router();

router.get("/estado_vacunacion", listarVacunados);

router.get("/estado_vacunacion/:id", listarVacunado);

router.post("/estado_vacunacion", crearVacunado);

router.put("/estado_vacunacion/:id", editarVacunado);

router.delete("/estado_vacunacion/:id", eliminarVacunado);

module.exports = router;
