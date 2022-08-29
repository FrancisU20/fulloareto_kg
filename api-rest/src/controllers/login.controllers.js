const pool = require("../database");
const bcrypt = require("bcryptjs");

const loginUsuario = async (req, res) => {
  try {
    const { username, pwd } = req.body;
    const usuario = await pool.query(
      "SELECT * from usuario WHERE username = $1",
      [username]
    );
    const hashpassword = bcrypt.compareSync(pwd, usuario.rows[0].password);
    if (hashpassword == true) {
      if (usuario.rows[0].is_active == true) {
        if (usuario.rows[0].roles_id == 1) {
          res.json({ mensaje: "Bienvenido Empleado" });
        } else {
          res.json({ mensaje: "Bienvenido Administrador" });
        }
      } else {
        res.json({
          mensaje:
            "Usuario inactivo por favor comuniquese con el administrador",
        });
      }
    } else {
      res.json({
        mensaje: "Datos incorrectos, intentelo de nuevo por favor",
      });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = {
  loginUsuario,
};
