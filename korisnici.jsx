import React, { useState, useEffect } from 'react';
import './troskovi.css';
function Korisnici() {
    const [korisnici, setKorisnici] = useState([]);
    const [newKorisnik, setNewKorisnik] = useState({ ime: '', email: '' });
    const [editingKorisnik, setEditingKorisnik] = useState(null);

    useEffect(() => {
        fetchKorisnici();
    }, []);
//dodavanje, brisanje i editovanje korisnika, kao i forma za navedeno
    const fetchKorisnici = () => {
        fetch('http://localhost:3001/korisnici')
            .then(res => res.json())
            .then(data => setKorisnici(data))
            .catch(err => console.error('Error:', err));
    };

    const addKorisnik = (e) => {
        e.preventDefault();
        fetch('http://localhost:3001/korisnici', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newKorisnik),
        })
            .then(() => {
                setNewKorisnik({ ime: '', email: '' });
                fetchKorisnici();
            })
            .catch(err => console.error('Error:', err));
    };

    const updateKorisnik = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3001/korisnici/${editingKorisnik.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editingKorisnik),
        })
            .then(() => {
                setEditingKorisnik(null);
                fetchKorisnici();
            })
            .catch(err => console.error('Error:', err));
    };

    const deleteKorisnik = (id) => {
        fetch(`http://localhost:3001/korisnici/${id}`, { method: 'DELETE' })
            .then(() => fetchKorisnici())
            .catch(err => console.error('Error:', err));
    };

    return (
        <div>
            <h1>Korisnici</h1>
            {/* Forma za dodavanje novog korisnika */}
            <form onSubmit={addKorisnik}>
                <h3>Dodaj novog korisnika</h3>
                <input
                    type="text"
                    placeholder="Ime"
                    value={newKorisnik.ime}
                    onChange={(e) => setNewKorisnik({ ...newKorisnik, ime: e.target.value })}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={newKorisnik.email}
                    onChange={(e) => setNewKorisnik({ ...newKorisnik, email: e.target.value })}
                    required
                />
                <button type="submit" className="centered-button">Dodaj</button>
            </form>

            {/* Forma za ažuriranje korisnika */}
            {editingKorisnik && (
                <form onSubmit={updateKorisnik}>
                    <h3>Ažuriraj korisnika</h3>
                    <input
                        type="text"
                        placeholder="Ime"
                        value={editingKorisnik.ime}
                        onChange={(e) => setEditingKorisnik({ ...editingKorisnik, ime: e.target.value })}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={editingKorisnik.email}
                        onChange={(e) => setEditingKorisnik({ ...editingKorisnik, email: e.target.value })}
                        required
                    />
                    <button type="submit">Sačuvaj</button>
                </form>
            )}

            {/* Lista korisnika */}
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Ime</th>
                    <th>Email</th>
                    <th>Akcije</th>
                </tr>
                </thead>
                <tbody>
                {korisnici.map((korisnik) => (
                    <tr key={korisnik.id}>
                        <td>{korisnik.id}</td>
                        <td>{korisnik.ime}</td>
                        <td>{korisnik.email}</td>
                        <td>
                            <button onClick={() => setEditingKorisnik(korisnik)}>Edit</button>
                            <button onClick={() => deleteKorisnik(korisnik.id)}>Obriši</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Korisnici;
