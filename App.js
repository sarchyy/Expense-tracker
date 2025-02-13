import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Troskovi from './troskovi';
import KategorijaTroskova from './kategorijaTroska';
import Korisnici from './korisnici';
import Prijava from './prijava';

function App() {
    //autentifikacija
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <Router>
            <Routes>
                {/* Ruta za prijavu */}
                <Route path="/" element={<Prijava setIsAuthenticated={setIsAuthenticated} />} />

                {/* Ostale rute */}
                <Route path="/home" element={<Home />} />
                <Route path="/troskovi" element={<Troskovi />} />
                <Route path="/kategorija-troskova" element={<KategorijaTroskova />} />
                <Route path="/korisnici" element={<Korisnici />} />
            </Routes>
        </Router>
    );
}

export default App;
