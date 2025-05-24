const express = require('express');
const router = express.Router();
const korisnikController = require('../controllers/korisnikController');

router.get('/', korisnikController.getAllKorisnici);
router.get('/:oib', korisnikController.getKorisnikByOib);
router.post('/', korisnikController.createKorisnik);
router.put('/:oib', korisnikController.updateKorisnik);
router.delete('/:oib', korisnikController.deleteKorisnik);

module.exports = router;
