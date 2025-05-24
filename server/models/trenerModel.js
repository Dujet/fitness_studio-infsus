const pool = require('../config/db');

const getAllTreneri = async () => {
  const res = await pool.query(`
    SELECT i.oib, k.ime, k.prezime, k.email,
           t.id_t, t.naziv_t, t.opis_t
    FROM instruktor i
    JOIN korisnik k ON i.oib = k.oib
    LEFT JOIN poducava p ON i.oib = p.oib_inst
    LEFT JOIN trening t ON p.id_t = t.id_t
  `);
  return res.rows;
};

const getTrenerByOib = async (oib) => {
  const res = await pool.query(`
    SELECT i.oib, k.ime, k.prezime, k.email,
           t.id_t, t.naziv_t, t.opis_t
    FROM instruktor i
    JOIN korisnik k ON i.oib = k.oib
    LEFT JOIN poducava p ON i.oib = p.oib_inst
    LEFT JOIN trening t ON p.id_t = t.id_t
    WHERE i.oib = $1
  `, [oib]);
  return res.rows;
};

const addTrener = async (oib) => {
    const res = await pool.query('INSERT INTO instruktor (oib) VALUES ($1) RETURNING *', [oib]);
    return res.rows[0];
  };

  const deleteTrener = async (oib) => {
    await pool.query('DELETE FROM poducava WHERE oib_inst = $1', [oib]);
    const res = await pool.query('DELETE FROM instruktor WHERE oib = $1 RETURNING *', [oib]);
    return res.rowCount;
  };

  const updateTrenerTreninzi = async (oib, treningIds) => {
    await pool.query('DELETE FROM poducava WHERE oib_inst = $1', [oib]);
    for (const id_t of treningIds) {
      await pool.query('INSERT INTO poducava (oib_inst, id_t) VALUES ($1, $2)', [oib, id_t]);
    }
  };


module.exports = {
  getAllTreneri,
  getTrenerByOib,
  addTrener,
  deleteTrener,
  updateTrenerTreninzi
};
