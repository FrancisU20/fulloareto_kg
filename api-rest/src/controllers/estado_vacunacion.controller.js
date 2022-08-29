const pool = require("../database");

const listarVacunados = async (req, res) => {
  try {
    const response = await pool.query("SELECT * from estado_vacunacion");
    res.json(response.rows);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const listarVacunado = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query(
      "SELECT * from estado_vacunacion WHERE id = $1",
      [id]
    );
    if (response.rowCount === 0)
      res
        .status(404)
        .json({ message: "Empleado no existe o no se encuentra vacunado." });
    else {
      res.json(response.rows[0]);
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

const crearVacunado = async (req, res) => {
  const { empleado_id, tipo_vacuna, fecha_vac, nro_dosis } = req.body;
  try {
    const response = await pool.query(
      "INSERT INTO estado_vacunacion (empleado_id, tipo_vacuna, fecha_vac, nro_dosis) VALUES ($1, $2, $3, $4) RETURNING *",
      [empleado_id, tipo_vacuna, fecha_vac, nro_dosis]
    );
    res.json(response.rows[0]);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const editarVacunado = async (req, res) => {
  try {
    const { id } = req.params;
    const { tipo_vacuna, fecha_vac, nro_dosis } = req.body;
    const response = await pool.query(
      "UPDATE estado_vacunacion SET tipo_vacuna=$1, fecha_vac= $2, nro_dosis=$3 WHERE id=$4",
      [tipo_vacuna, fecha_vac, nro_dosis,id]
    );
    if (response.rowCount === 0)
      res.status(404).json({ message: "Empleado no existe o no se encuentra vacunado." });
    else {
      return res.json(result.rows[0]);
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

const eliminarVacunado = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query(
      "DELETE from estado_vacunacion WHERE id = $1",
      [id]
    );
    if (response.rowCount === 0)
      res.status(404).json({ message: "Empleado no existe o no se encuentra vacunado." });
    else {
      res.sendStatus(204);
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = {
  listarVacunados,
  listarVacunado,
  crearVacunado,
  editarVacunado,
  eliminarVacunado,
};
