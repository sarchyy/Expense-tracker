const express = require('express');
const router = express.Router();

// Ruta za prijavu
router.post('/', (req, res) => {
    const { email, password } = req.body;


    if (email === 'user@example.com' && password === 'sara123') {
        res.json({ message: 'Prijava uspješna!' });
    } else {
        res.status(401).json({ message: 'Netačan email ili lozinka' });
    }
});

module.exports = router;
