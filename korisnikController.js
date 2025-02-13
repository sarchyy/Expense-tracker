const Korisnik = require('../models/korisnik');

// GET /korisnici
exports.getAllKorisnici = async (req, res) => {
    try {
        const korisnici = await Korisnik.findAll();
        res.json(korisnici);
    } catch (err) {
        res.status(500).json({ message: 'Greška prilikom dobavljanja korisnika', error: err.message });
    }
};

// POST /korisnici
exports.addKorisnik = async (req, res) => {
    try {
        const { ime, email } = req.body;
        if (!ime || !email) {
            return res.status(400).json({ message: 'Ime i email su obavezni.' });
        }
        console.log('Podaci za kreiranje:', { ime, email });
        const korisnik = await Korisnik.create({ ime, email });
        console.log('Kreirani korisnik:', korisnik);
        res.status(201).json({ message: 'Korisnik uspešno dodat.' });
    } catch (err) {
        console.error('Greška prilikom dodavanja korisnika:', err);
        res.status(500).json({ message: 'Greška prilikom dodavanja korisnika', error: err.message });
    }
};


// PUT /korisnici/:id
exports.updateKorisnik = async (req, res) => {
    try {
        const { id } = req.params;
        const { ime, email } = req.body;

        const korisnik = await Korisnik.findByPk(id);
        if (!korisnik) {
            return res.status(404).json({ message: 'Korisnik nije pronađen.' });
        }

        korisnik.ime = ime;
        korisnik.email = email;
        await korisnik.save();

        res.json({ message: 'Korisnik uspešno ažuriran.' });
    } catch (err) {
        res.status(500).json({ message: 'Greška prilikom ažuriranja korisnika', error: err.message });
    }
};

// DELETE /korisnici/:id
exports.deleteKorisnik = async (req, res) => {
    try {
        const { id } = req.params;
        const korisnik = await Korisnik.findByPk(id);
        if (!korisnik) {
            return res.status(404).json({ message: 'Korisnik nije pronađen.' });
        }
        await korisnik.destroy();
        res.json({ message: 'Korisnik uspešno obrisan.' });
    } catch (err) {
        res.status(500).json({ message: 'Greška prilikom brisanja korisnika', error: err.message });
    }
};

// GET /korisnici/:id
exports.getKorisnikById = async (req, res) => {
    try {
        const { id } = req.params;
        const korisnik = await Korisnik.findByPk(id); // Pronalazak korisnika prema primarnom ključu
        if (!korisnik) {
            return res.status(404).json({ message: 'Korisnik nije pronađen.' });
        }
        res.json(korisnik);
    } catch (err) {
        res.status(500).json({ message: 'Greška prilikom dobavljanja korisnika', error: err.message });
    }
    // GET /korisnici/:id
    exports.getKorisnikById = async (req, res) => {
        try {
            const { id } = req.params;
            const korisnik = await Korisnik.findByPk(id); // Pronalazak korisnika prema primarnom ključu
            if (!korisnik) {
                return res.status(404).json({ message: 'Korisnik nije pronađen.' });
            }
            res.json(korisnik);
        } catch (err) {
            res.status(500).json({ message: 'Greška prilikom dobavljanja korisnika', error: err.message });
        }
    };

};
