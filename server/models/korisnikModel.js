const pool = require('../config/db');

const getAllKorisnici = async () => {
  const res = await pool.query('SELECT oib, ime, prezime, email FROM korisnik');
  return res.rows;
};

const getKorisnikByOib = async (oib) => {
  const res = await pool.query('SELECT oib, ime, prezime, email FROM korisnik WHERE oib = $1', [oib]);
  return res.rows[0];
};

const createKorisnik = async ({ oib, ime, prezime, email, lozinka }) => {
  const res = await pool.query(
    `INSERT INTO korisnik (oib, ime, prezime, email, lozinka)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING oib, ime, prezime, email`,
    [oib, ime, prezime, email, lozinka]
  );
  return res.rows[0];
};

const updateKorisnik = async (oib, { ime, prezime, email, lozinka }) => {
  const res = await pool.query(
    `UPDATE korisnik
     SET ime = $1, prezime = $2, email = $3, lozinka = $4
     WHERE oib = $5
     RETURNING oib, ime, prezime, email`,
    [ime, prezime, email, lozinka, oib]
  );
  return res.rows[0];
};

const deleteKorisnik = async (oib) => {
  await pool.query('DELETE FROM korisnik WHERE oib = $1', [oib]);
};

module.exports = {
  getAllKorisnici,
  getKorisnikByOib,
  createKorisnik,
  updateKorisnik,
  deleteKorisnik,
};
