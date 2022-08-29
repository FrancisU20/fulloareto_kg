const pool = require("../database");

const listarEmpleados = async (req, res) => {
  try {
    const response = await pool.query("SELECT * from empleado");
    res.json(response.rows);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const listarEmpleado = async (req, res) => {
  try {
    const { cedula } = req.params;
    const response = await pool.query(
      "SELECT * from empleado WHERE cedula = $1",
      [cedula]
    );
    if (response.rowCount === 0)
      res.status(404).json({ message: "Empleado no encontrado" });
    else {
      res.json(response.rows[0]);
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

const crearEmpleado = async (req, res) => {
  const { cedula, nombres, apellidos, email } = req.body;
  try {
    const response = await pool.query(
      "INSERT INTO empleado (cedula, nombres, apellidos, email) VALUES ($1, $2, $3, $4) RETURNING *",
      [cedula, nombres, apellidos, email]
    );
    res.json(response.rows[0]);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const editarEmpleado = async (req, res) => {
  try {
    const { cedula } = req.params;
    const {
      nombres,
      apellidos,
      email,
      fecha_nac,
      direccion,
      celular,
      vacunado,
    } = req.body;
    const response = await pool.query(
      "UPDATE empleado SET nombres=$1, apellidos=$2, email= $3, fecha_nac=$4, direccion=$5, celular=$6, vacunado=$7 WHERE cedula=$8",
      [
        nombres,
        apellidos,
        email,
        fecha_nac,
        direccion,
        celular,
        vacunado,
        cedula,
      ]
    );
    if (response.rowCount === 0)
      res.status(404).json({ message: "Empleado no encontrado" });
    else {
      return res.json(result.rows[0]);
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

const eliminarEmpleado = async (req, res) => {
  try {
    const { cedula } = req.params;
    const response = await pool.query(
      "DELETE from empleado WHERE cedula = $1",
      [cedula]
    );
    if (response.rowCount === 0)
      res.status(404).json({ message: "Empleado no encontrado" });
    else {
      res.sendStatus(204);
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = {
  listarEmpleados,
  listarEmpleado,
  crearEmpleado,
  editarEmpleado,
  eliminarEmpleado,
};
