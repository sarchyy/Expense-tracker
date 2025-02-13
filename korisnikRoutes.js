const express = require('express');
const korisnikController = require('../controllers/korisnikController');
const router = express.Router();

router.get('/', korisnikController.getAllKorisnici);
router.post('/', korisnikController.addKorisnik);
router.put('/:id', korisnikController.updateKorisnik);
router.delete('/:id', korisnikController.deleteKorisnik);
router.get('/:id', korisnikController.getKorisnikById);

module.exports = router;
