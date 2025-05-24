const Profil = require('../models/profilModel');

const getProfil = async (req, res) => {
  try {
    const rows = await Profil.getProfilByOib(req.params.oib);
    if (rows.length === 0) return res.status(404).json({ error: 'Korisnik ne postoji' });

    const korisnik = {
      oib: rows[0].oib,
      ime: rows[0].ime,
      prezime: rows[0].prezime,
      email: rows[0].email,
      placen_iznos: rows[0].placen_iznos,
      treninzi: [],
      kategorije: []
    };

    const addedTreninzi = new Set();
    const addedKategorije = new Set();

    rows.forEach(row => {
      if (row.id_t && !addedTreninzi.has(row.id_t)) {
        korisnik.treninzi.push({
          id: row.id_t,
          naziv: row.naziv_t,
          opis: row.opis_t
        });
        addedTreninzi.add(row.id_t);
      }

      if (row.id_kat && !addedKategorije.has(row.id_kat)) {
        korisnik.kategorije.push({
          id: row.id_kat,
          cijena: row.cijena_kat,
          opis: row.opis_kat
        });
        addedKategorije.add(row.id_kat);
      }
    });

    res.json(korisnik);
  } catch (err) {
    res.status(500).json({ error: 'Greška kod dohvaćanja profila' });
  }
};

module.exports = { getProfil };
