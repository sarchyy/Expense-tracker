const KategorijaTroska = require('../models/kategorijaTroska');

// GET /kategorije-troskova
exports.getAllKategorijeTroskova = async (req, res) => {
    try {
        const kategorije = await KategorijaTroska.findAll();
        res.json(kategorije);
    } catch (err) {
        res.status(500).json({ message: 'Greška prilikom dobavljanja kategorija troškova', error: err.message });
    }
};

// POST /kategorije-troskova
exports.addKategorijaTroska = async (req, res) => {
    try {
        const { naziv } = req.body;

        // Validacija: naziv ne sme biti prazan
        if (!naziv || naziv.trim().length === 0) {
            return res.status(400).json({ message: 'Naziv kategorije je obavezan.' });
        }

        await KategorijaTroska.create({ naziv });
        res.status(201).json({ message: 'Kategorija troška uspešno dodata.' });
    } catch (err) {
        res.status(500).json({ message: 'Greška prilikom dodavanja kategorije troška', error: err.message });
    }
};

// PUT /kategorije-troskova/:id
exports.updateKategorijaTroska = async (req, res) => {
    try {
        const { id } = req.params;
        const { naziv } = req.body;

        const kategorija = await KategorijaTroska.findByPk(id);
        if (!kategorija) {
            return res.status(404).json({ message: 'Kategorija troška nije pronađena.' });
        }

        kategorija.naziv = naziv;
        await kategorija.save();

        res.json({ message: 'Kategorija troška uspešno ažurirana.' });
    } catch (err) {
        res.status(500).json({ message: 'Greška prilikom ažuriranja kategorije troška', error: err.message });
    }
};

// DELETE /kategorije-troskova/:id
exports.deleteKategorijaTroska = async (req, res) => {
    try {
        const { id } = req.params;

        const kategorija = await KategorijaTroska.findByPk(id);
        if (!kategorija) {
            return res.status(404).json({ message: 'Kategorija troška nije pronađena.' });
        }

        await kategorija.destroy();
        res.json({ message: 'Kategorija troška uspešno obrisana.' });
    } catch (err) {
        res.status(500).json({ message: 'Greška prilikom brisanja kategorije troška', error: err.message });
    }
};
