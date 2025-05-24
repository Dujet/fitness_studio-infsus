const Trener = require('../models/trenerModel');

const getAllTreneri = async (req, res) => {
  try {
    const rows = await Trener.getAllTreneri();

    const treneri = {};

    rows.forEach(row => {
      if (!treneri[row.oib]) {
        treneri[row.oib] = {
          oib: row.oib,
          ime: row.ime,
          prezime: row.prezime,
          email: row.email,
          treninzi: [],
        };
      }
      if (row.id_t) {
        treneri[row.oib].treninzi.push({
          id: row.id_t,
          naziv: row.naziv_t,
          opis: row.opis_t
        });
      }
    });

    res.json(Object.values(treneri));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Greška kod dohvaćanja trenera' });
  }
};

const getTrenerByOib = async (req, res) => {
  const { oib } = req.params;
  try {
    const rows = await Trener.getTrenerByOib(oib);
    if (rows.length === 0) return res.status(404).json({ error: 'Trener nije pronađen' });

    const trener = {
      oib: rows[0].oib,
      ime: rows[0].ime,
      prezime: rows[0].prezime,
      email: rows[0].email,
      treninzi: [],
    };

    rows.forEach(row => {
      if (row.id_t) {
        trener.treninzi.push({
          id: row.id_t,
          naziv: row.naziv_t,
          opis: row.opis_t
        });
      }
    });

    res.json(trener);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Greška kod dohvaćanja trenera' });
  }
};
const addTrener = async (req, res) => {
    const { oib } = req.body;
    try {
      const novi = await Trener.addTrener(oib);
      res.status(201).json(novi);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: 'Greška kod dodavanja trenera. Provjeri postoji li korisnik.' });
    }
  };

  const deleteTrener = async (req, res) => {
    const { oib } = req.params;
    try {
      const count = await Trener.deleteTrener(oib);
      if (count === 0) return res.status(404).json({ error: 'Trener nije pronađen' });
      res.json({ poruka: 'Trener obrisan' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Greška kod brisanja trenera' });
    }
  };

  const updateTrenerTreninzi = async (req, res) => {
    const { oib } = req.params;
    const { treningIds } = req.body; // očekuje niz ID-eva treninga

    if (!Array.isArray(treningIds)) {
      return res.status(400).json({ error: 'treningIds mora biti niz ID-eva' });
    }

    try {
      await Trener.updateTrenerTreninzi(oib, treningIds);
      res.json({ poruka: 'Treninzi ažurirani' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Greška kod ažuriranja treninga' });
    }
  };


module.exports = {
  getAllTreneri,
  getTrenerByOib,
  addTrener,
  updateTrenerTreninzi,
  deleteTrener
};
