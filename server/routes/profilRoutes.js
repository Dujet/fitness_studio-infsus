const express = require('express');
const router = express.Router();
const profilController = require('../controllers/profilController');

router.get('/:oib', profilController.getProfil);

module.exports = router;
