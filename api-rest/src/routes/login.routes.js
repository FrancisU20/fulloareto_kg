const { Router } = require("express");
const { loginUsuario } = require("../controllers/login.controllers");
const router = Router();

router.get("/login", loginUsuario)

module.exports = router;

