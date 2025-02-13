import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './prijava.css';

function Prijava({ setIsAuthenticated }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
//prijava koja korisniku omogucava koristenje aplikacije zajedno sa formom
        const response = await fetch('http://localhost:3001/prijava', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            setIsAuthenticated(true);
            navigate('/home');
        } else {
            alert('Neispravan email ili lozinka!');
        }
    };

    return (
        <div>
            <h2>Prijavite se!</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Lozinka:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="centered-button" >Prijavi se</button>
            </form>
        </div>
    );
}

export default Prijava;