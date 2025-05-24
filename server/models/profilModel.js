const pool = require('../config/db');

const getProfilByOib = async (oib) => {
  const result = await pool.query(
    `SELECT
      k.oib, k.ime, k.prezime, k.email,
      c.placen_iznos,
      t.id_t, t.naziv_t, t.opis_t,
      kat.id_kat, kat.cijena_kat, kat.opis_kat
    FROM korisnik k
    LEFT JOIN clan c ON c.oib = k.oib
    LEFT JOIN trenira tr ON tr.oib = k.oib
    LEFT JOIN trening t ON t.id_t = tr.id_t
    LEFT JOIN trenira_pripada tp ON tp.oib_cl = k.oib AND tp.id_t = t.id_t
    LEFT JOIN kategorija kat ON kat.id_kat = tp.id_kat
    WHERE k.oib = $1`,
    [oib]
  );
  return result.rows;
};

module.exports = { getProfilByOib };
