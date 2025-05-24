const Trening = require('../models/treningModel');

const getAllTrening = async (req, res) => {
  try {
    const trening = await Trening.getAllTrening();
    res.json(trening);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};

const getTreningById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const trening = await Trening.getTreningById(id);
    if (!trening) {
      return res.status(404).json({ error: 'Trening not found' });
    }
    res.json(trening);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};

const createTrening = async (req, res) => {
  try {
    const { naziv_t, opis_t, kapacitet } = req.body;
    const newTrening = await Trening.createTrening(naziv_t, opis_t, kapacitet);
    res.status(201).json(newTrening);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};

const updateTrening = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { naziv_t, opis_t, kapacitet } = req.body;
    const updated = await Trening.updateTrening(id, naziv_t, opis_t, kapacitet);
    if (!updated) {
      return res.status(404).json({ error: 'Trening not found' });
    }
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};

const deleteTrening = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await Trening.deleteTrening(id);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};

module.exports = {
  getAllTrening,
  getTreningById,
  createTrening,
  updateTrening,
  deleteTrening,
};
