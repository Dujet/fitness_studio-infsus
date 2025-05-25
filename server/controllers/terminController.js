const Termin = require('../models/terminModel');

const getAllTermini = async (req, res) => {
  try {
    const termini = await Termin.getAllTermini();
    res.json(termini);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};

const getAllTerminiWithDetails = async (req, res) => {
  try {
    const termini = await Termin.getAllTerminiWithDetails();
    res.json(termini);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
}

const getTerminById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const termin = await Termin.getTerminById(id);
    if (!termin) {
      return res.status(404).json({ error: 'Termin not found' });
    }
    res.json(termin);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};

const createTermin = async (req, res) => {
  try {
    const { id_t, datum, vrijeme } = req.body;
    const newTermin = await Termin.createTermin(id_t, datum, vrijeme);
    res.status(201).json(newTermin);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};

const updateTermin = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { id_t, datum, vrijeme } = req.body;
    const updated = await Termin.updateTermin(id, id_t, datum, vrijeme);
    if (!updated) {
      return res.status(404).json({ error: 'Termin not found' });
    }
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};

const deleteTermin = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await Termin.deleteTermin(id);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};

module.exports = {
  getAllTermini,
  getTerminById,
  createTermin,
  updateTermin,
  deleteTermin,
  getAllTerminiWithDetails,
};
