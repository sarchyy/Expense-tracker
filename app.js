const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Uvoz našeg sequelize objekta
const sequelize = require('./Database/database');

// Uvoz modela
const Troskovi = require('./Models/trosak');
const KategorijaTroska = require('./Models/kategorijaTroska');

// Uvoz ruta
const troskoviRoutes = require('./Routes/trosakRoutes');
const kategorijaTroskovaRoutes = require('./Routes/kategorijaTroskaRoutes');
const korisnikRoutes = require('./Routes/korisnikRoutes');
const prijavaRoutes = require('./Routes/prijavaRoutes'); // Dodato za prijavu

// Inicijalizacija aplikacije
const app = express();

// Omogućavanje CORS-a
app.use(cors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());

// Definisanje ruta
app.use('/troskovi', troskoviRoutes);
app.use('/kategorije-troskova', kategorijaTroskovaRoutes);
app.use('/korisnici', korisnikRoutes);
app.use('/prijava', prijavaRoutes);
// Sinhronizacija modela sa bazom
sequelize.sync({ force: false })
    .then(() => {
        console.log('Modeli sinhronizirani sa bazom podataka.');
        const PORT = 3000;
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Greška pri sinhronizaciji modela:', err);
    });
