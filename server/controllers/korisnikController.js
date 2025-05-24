const Korisnik = require('../models/korisnikModel');

const getAllKorisnici = async (req, res) => {
  try {
    const korisnici = await Korisnik.getAllKorisnici();
    res.json(korisnici);
  } catch (err) {
    res.status(500).json({ error: 'Greška kod dohvaćanja korisnika' });
  }
};

const getKorisnikByOib = async (req, res) => {
  try {
    const korisnik = await Korisnik.getKorisnikByOib(req.params.oib);
    if (!korisnik) return res.status(404).json({ error: 'Korisnik nije pronađen' });
    res.json(korisnik);
  } catch (err) {
    res.status(500).json({ error: 'Greška kod dohvaćanja korisnika' });
  }
};

const createKorisnik = async (req, res) => {
  try {
    const novi = await Korisnik.createKorisnik(req.body);
    res.status(201).json(novi);
  } catch (err) {
    res.status(500).json({ error: 'Greška kod stvaranja korisnika' });
  }
};

const updateKorisnik = async (req, res) => {
  try {
    const azuriran = await Korisnik.updateKorisnik(req.params.oib, req.body);
    if (!azuriran) return res.status(404).json({ error: 'Korisnik nije pronađen' });
    res.json(azuriran);
  } catch (err) {
    res.status(500).json({ error: 'Greška kod ažuriranja korisnika' });
  }
};

const deleteKorisnik = async (req, res) => {
  try {
    await Korisnik.deleteKorisnik(req.params.oib);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Greška kod brisanja korisnika' });
  }
};

module.exports = {
  getAllKorisnici,
  getKorisnikByOib,
  createKorisnik,
  updateKorisnik,
  deleteKorisnik,
};
