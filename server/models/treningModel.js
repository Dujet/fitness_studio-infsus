const pool = require('../config/db');

const getAllTrening = async () => {
  const res = await pool.query('SELECT * FROM trening ORDER BY id_t');
  return res.rows;
};

const getTreningById = async (id) => {
  const res = await pool.query('SELECT * FROM trening WHERE id_t = $1', [id]);
  return res.rows[0];
};

const createTrening = async (naziv_t, opis_t, kapacitet) => {
  const res = await pool.query(
    'INSERT INTO trening (naziv_t, opis_t, kapacitet) VALUES ($1, $2, $3) RETURNING *',
    [naziv_t, opis_t, kapacitet]
  );
  return res.rows[0];
};

const updateTrening = async (id, naziv_t, opis_t, kapacitet) => {
  const res = await pool.query(
    'UPDATE trening SET naziv_t = $1, opis_t = $2, kapacitet = $3 WHERE id_t = $4 RETURNING *',
    [naziv_t, opis_t, kapacitet, id]
  );
  return res.rows[0];
};

const deleteTrening = async (id) => {
  await pool.query('DELETE FROM trening WHERE id_t = $1', [id]);
};

module.exports = {
  getAllTrening,
  getTreningById,
  createTrening,
  updateTrening,
  deleteTrening,
};
