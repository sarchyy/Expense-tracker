const express = require('express');
const trosakController = require('../controllers/trosakController');
const router = express.Router();

router.get('/', trosakController.getAllTroskovi);
router.post('/', trosakController.addTrosak);
router.put('/:id', trosakController.updateTrosak);
router.delete('/:id', trosakController.deleteTrosak);
router.get('/test', (req, res) => {
    res.json({ message: 'Frontend and backend are connected!' });
});

module.exports = router;
