import React, { useState, useEffect } from 'react';
import './troskovi.css';

function Troskovi() {

    const [troskovi, setTroskovi] = useState([]);
    const [newTrosak, setNewTrosak] = useState({ naziv: '', iznos: '', datum: '', kategorijaId: '', korisnikId: '' }); 
    const [editingTrosak, setEditingTrosak] = useState(null);

    //ucitava troskove iz baze
    useEffect(() => {
        fetchTroskovi();
    }, []);


    const fetchTroskovi = () => {
        fetch('http://localhost:3001/troskovi')
            .then(res => res.json())
            .then(data => setTroskovi(data))
            .catch(err => console.error('Error:', err));
    };

    // funkcija za dodavanje novog troska
    const addTrosak = (e) => {
        e.preventDefault();
        console.log('Dodavanje troška:', newTrosak);
        fetch('http://localhost:3001/troskovi', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTrosak),
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Neuspješan zahtjev');
                }
                return res.json();
            })
            .then(() => {
                setNewTrosak({ naziv: '', iznos: '', datum: '', kategorijaId: '', korisnikId: '' });
                fetchTroskovi();
            })
            .catch(err => console.error('Greška pri dodavanju troška:', err));
    };

    // funkcija za azuriranje postojeceg troska
    const updateTrosak = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3001/troskovi/${editingTrosak.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editingTrosak),
        })
            .then(res => res.json())
            .then(() => {
                setEditingTrosak(null);
                fetchTroskovi();
            })
            .catch(err => console.error('Error:', err));
    };

    // funkcija za brisanje troska
    const deleteTrosak = (id) => {
        fetch(`http://localhost:3001/troskovi/${id}`, { method: 'DELETE' })
            .then(() => fetchTroskovi())
            .catch(err => console.error('Error:', err));
    };

    return (
        <div className="troskovi">
            <h1>Troškovi</h1>
            {/* forma za dodavanje novog troska */}
            <form onSubmit={addTrosak}>
                <h3>Dodaj novi trošak</h3>
                <input type="text" placeholder="Naziv" value={newTrosak.naziv} onChange={(e) => setNewTrosak({ ...newTrosak, naziv: e.target.value })} required />
                <input type="number" placeholder="Iznos" value={newTrosak.iznos} onChange={(e) => setNewTrosak({ ...newTrosak, iznos: e.target.value })} required />
                <input type="date" placeholder="Datum" value={newTrosak.datum} onChange={(e) => setNewTrosak({ ...newTrosak, datum: e.target.value })} required />
                <input type="number" placeholder="Kategorija ID" value={newTrosak.kategorijaId} onChange={(e) => setNewTrosak({ ...newTrosak, kategorijaId: e.target.value })} required />
                <input type="number" placeholder="Korisnik ID" value={newTrosak.korisnikId} onChange={(e) => setNewTrosak({ ...newTrosak, korisnikId: e.target.value })} required />
                <button type="submit" className="centered-button">Dodaj</button>
            </form>

            {/* forma za azuriranje troska */}
            {editingTrosak && (
                <form onSubmit={updateTrosak}>
                    <h3>Ažuriraj trošak</h3>
                    <input type="text" placeholder="Naziv" value={editingTrosak.naziv} onChange={(e) => setEditingTrosak({ ...editingTrosak, naziv: e.target.value })} required />
                    <input type="number" placeholder="Iznos" value={editingTrosak.iznos} onChange={(e) => setEditingTrosak({ ...editingTrosak, iznos: e.target.value })} required />
                    <input type="date" placeholder="Datum" value={editingTrosak.datum} onChange={(e) => setEditingTrosak({ ...editingTrosak, datum: e.target.value })} required />
                    <button type="submit">Sačuvaj</button>
                </form>
            )}

            {/* lista troskova */}
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Naziv</th>
                    <th>Iznos</th>
                    <th>Datum</th>
                    <th>Kategorija ID</th>
                    <th>Korisnik ID</th>
                    <th>Akcije</th>
                </tr>
                </thead>
                <tbody>
                {troskovi.map((trosak) => (
                    <tr key={trosak.id}>
                        <td>{trosak.id}</td>
                        <td>{trosak.naziv}</td>
                        <td>{trosak.iznos}</td>
                        <td>{trosak.datum}</td>
                        <td>{trosak.kategorijaId}</td>
                        <td>{trosak.korisnikId}</td>
                        <td>
                            <button onClick={() => setEditingTrosak(trosak)}>Edit</button>
                            <button onClick={() => deleteTrosak(trosak.id)}>Obriši</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Troskovi;
