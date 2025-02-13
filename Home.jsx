import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';
//pocetna stranica na kojoj se nalaze 3 buttona koja vode na posebne stranice i svaka ima svoju funkcionalnost
const Home = () => {
    return (
        <div className="home-page">
            <div className="home-buttons">
                <h1>Dobrodošli</h1>

                <Link to="/troskovi">
                    <button>Trošak</button>
                </Link>
                <Link to="/korisnici">
                    <button>Korisnik</button>
                </Link>
                <Link to="/kategorija-troskova">
                    <button>Kategorija Troška</button>
                </Link>

            </div>
        </div>
    );
};

export default Home;
