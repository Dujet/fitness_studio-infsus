const express = require('express');
const router = express.Router();
const terminController = require('../controllers/terminController');

router.get('/', terminController.getAllTermini);
router.get('/:id', terminController.getTerminById);
router.post('/', terminController.createTermin);
router.put('/:id', terminController.updateTermin);
router.delete('/:id', terminController.deleteTermin);

module.exports = router;
