// Routes/kategorijaTroskovaRoutes.js
const express = require('express');
const kategorijaTroskaController = require('../Controllers/kategorijaTroskaController');
const router = express.Router();

router.get('/', kategorijaTroskaController.getAllKategorijeTroskova);
router.post('/', kategorijaTroskaController.addKategorijaTroska);
router.put('/:id', kategorijaTroskaController.updateKategorijaTroska);
router.delete('/:id', kategorijaTroskaController.deleteKategorijaTroska);

module.exports = router;
