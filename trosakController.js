const Trosak = require('../models/trosak');

// GET /troskovi
exports.getAllTroskovi = async (req, res) => {
    try {
        const troskovi = await Trosak.findAll();
        res.json(troskovi);
    } catch (err) {
        res.status(500).json({ message: 'Greška prilikom dobavljanja troškova', error: err.message });
    }
};

// POST /troskovi
exports.addTrosak = async (req, res) => {
    try {
        const { naziv, iznos, datum, kategorijaId, korisnikId } = req.body;
        const createdTrosak = await Trosak.create({ naziv, iznos, datum, kategorijaId, korisnikId });
        console.log("Created Trosak:", createdTrosak);
        res.status(201).json({ message: 'Trošak uspešno dodat.', data: createdTrosak });
    } catch (err) {
        console.error("Error adding Trosak:", err);
        res.status(500).json({ message: 'Greška prilikom dodavanja troška', error: err.message });
    }
};

// PUT /troskovi/:id
exports.updateTrosak = async (req, res) => {
    try {
        const { id } = req.params;
        const { naziv, iznos, datum, kategorijaId, korisnikId } = req.body;

        const trosak = await Trosak.findByPk(id);
        if (!trosak) {
            return res.status(404).json({ message: 'Trošak nije pronađen.' });
        }

        trosak.naziv = naziv;
        trosak.iznos = iznos;
        trosak.datum = datum;
        trosak.kategorijaId = kategorijaId;
        trosak.korisnikId = korisnikId;
        await trosak.save();

        res.json({ message: 'Trošak uspešno ažuriran.' });
    } catch (err) {
        res.status(500).json({ message: 'Greška prilikom ažuriranja troška', error: err.message });
    }
};

// DELETE /troskovi/:id
exports.deleteTrosak = async (req, res) => {
    try {
        const { id } = req.params;
        const trosak = await Trosak.findByPk(id);
        if (!trosak) {
            return res.status(404).json({ message: 'Trošak nije pronađen.' });
        }
        await trosak.destroy();
        res.json({ message: 'Trošak uspešno obrisan.' });
    } catch (err) {
        res.status(500).json({ message: 'Greška prilikom brisanja troška', error: err.message });
    }
};
