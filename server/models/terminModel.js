const pool = require('../config/db');

const getAllTermini = async () => {
  const res = await pool.query('SELECT * FROM termin ORDER BY id');
  return res.rows;
};

const getTerminById = async (id) => {
  const res = await pool.query('SELECT * FROM termin WHERE id = $1', [id]);
  return res.rows[0];
};

const createTermin = async (id_t, datum, vrijeme) => {
  const res = await pool.query(
    'INSERT INTO termin (id_t, datum, vrijeme) VALUES ($1, $2, $3) RETURNING *',
    [id_t, datum, vrijeme]
  );
  return res.rows[0];
};

const updateTermin = async (id, id_t, datum, vrijeme) => {
  const res = await pool.query(
    'UPDATE termin SET id_t = $1, datum = $2, vrijeme = $3 WHERE id = $4 RETURNING *',
    [id_t, datum, vrijeme, id]
  );
  return res.rows[0];
};

const deleteTermin = async (id) => {
  await pool.query('DELETE FROM termin WHERE id = $1', [id]);
};

module.exports = {
  getAllTermini,
  getTerminById,
  createTermin,
  updateTermin,
  deleteTermin,
};
