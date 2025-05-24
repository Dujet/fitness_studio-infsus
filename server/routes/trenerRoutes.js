const express = require('express');
const router = express.Router();
const trenerController = require('../controllers/trenerController');

router.get('/', trenerController.getAllTreneri);
router.get('/:oib', trenerController.getTrenerByOib);
router.post('/', trenerController.addTrener);
router.delete('/:oib', trenerController.deleteTrener);
router.put('/:oib/treninzi', trenerController.updateTrenerTreninzi);


module.exports = router;
