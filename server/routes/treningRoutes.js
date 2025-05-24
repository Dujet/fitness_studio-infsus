const express = require('express');
const router = express.Router();
const treningController = require('../controllers/treningController');

router.get('/', treningController.getAllTrening);
router.get('/:id', treningController.getTreningById);
router.post('/', treningController.createTrening);
router.put('/:id', treningController.updateTrening);
router.delete('/:id', treningController.deleteTrening);

module.exports = router;
