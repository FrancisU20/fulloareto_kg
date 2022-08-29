const pool = require("../database");
const bcrypt = require("bcryptjs");

const listarUsuarios = async (req, res) => {
  try {
    const response = await pool.query("SELECT * from usuario");
    res.json(response.rows);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const listarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query("SELECT * from usuario WHERE id = $1", [
      id,
    ]);
    if (response.rowCount === 0)
      res.status(404).json({ message: "Usuario no encontrado" });
    else {
      res.json(response.rows[0]);
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

const crearUsuario = async (req, res) => {
  try {
    const { cedula } = req.params;
    const empleado = await pool.query(
      "SELECT id, email from empleado WHERE cedula = $1",
      [cedula]
    );

    const generarContrasena = (longitud) => {
      const minus = "abcdefghijklmnñopqrstuvwxyz";
      const mayus = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
      let contrasena = "";
      for (let i = 0; i < longitud; i++) {
        let eleccion = Math.floor(Math.random() * 3 + 1);
        if (eleccion == 1) {
          let caracter1 = minus.charAt(
            Math.floor(Math.random() * minus.length)
          );
          contrasena += caracter1;
        } else if (eleccion == 2) {
          const caracter2 = mayus.charAt(
            Math.floor(Math.random() * mayus.length)
          );
          contrasena += caracter2;
        } else {
          let num = Math.floor(Math.random() * 10);
          contrasena += num;
        }
      }
      return contrasena;
    };
    const pwd = generarContrasena(16);
    const password = bcrypt.hashSync(pwd, 8);
    const is_active = true;
    const roles_id = 1;
    const response = await pool.query(
      "INSERT INTO usuario (username, pwd, password, is_active, roles_id, empleado_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        empleado.rows[0].email,
        pwd,
        password,
        is_active,
        roles_id,
        empleado.rows[0].id,
      ]
    );
    res.json(response.rows[0]);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const editarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { pwd, is_active, roles_id } = req.body;
    const password = bcrypt.hashSync(pwd, 8);
    const response = await pool.query(
      "UPDATE usuario SET  pwd=$1, password=$2, is_active= $3, roles_id=$4 WHERE id=$5",
      [pwd, password, is_active, roles_id, id]
    );
    if (response.rowCount === 0)
      res.status(404).json({ message: "Usuario no encontrado" });
    else {
      return res.json(result.rows[0]);
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query(
      "UPDATE usuario SET is_active=false WHERE id = $1",
      [id]
    );
    if (response.rowCount === 0)
      res.status(404).json({ message: "Usuario no encontrado" });
    else {
      res.sendStatus(204);
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = {
  listarUsuarios,
  listarUsuario,
  crearUsuario,
  editarUsuario,
  eliminarUsuario,
};
