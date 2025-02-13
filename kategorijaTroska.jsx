import React, { useState, useEffect } from 'react';
import './troskovi.css';
function KategorijeTroskova() {
    const [kategorije, setKategorije] = useState([]);
    const [newKategorija, setNewKategorija] = useState({ naziv: '' });
    const [editingKategorija, setEditingKategorija] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchKategorije();
    }, []);
//dodavanje, brisanje i editovanje kategorije troskova, kao i forma za navedeno
    const fetchKategorije = () => {
        setLoading(true);
        fetch('http://localhost:3001/kategorije-troskova')
            .then(res => res.json())
            .then(data => {
                setKategorije(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error:', err);
                setLoading(false);
            });
    };

    const addKategorija = (e) => {
        e.preventDefault();
        setLoading(true);
        fetch('http://localhost:3001/kategorije-troskova', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newKategorija),
        })
            .then(() => {
                setNewKategorija({ naziv: '' });
                fetchKategorije();
            })
            .catch(err => console.error('Error:', err))
            .finally(() => setLoading(false));
    };

    const updateKategorija = (e) => {
        e.preventDefault();
        setLoading(true);
        fetch(`http://localhost:3001/kategorije-troskova/${editingKategorija.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editingKategorija),
        })
            .then(() => {
                setEditingKategorija(null);
                fetchKategorije();
            })
            .catch(err => console.error('Error:', err))
            .finally(() => setLoading(false));
    };

    const deleteKategorija = (id) => {
        setLoading(true);
        fetch(`http://localhost:3001/kategorije-troskova/${id}`, { method: 'DELETE' })
            .then(() => fetchKategorije())
            .catch(err => console.error('Error:', err))
            .finally(() => setLoading(false));
    };

    return (
        <div>
            <h1>Kategorije troškova</h1>
            {loading && <p>Učitavanje...</p>} {/* Dodan indikator učitavanja */}

            {/* Forma za dodavanje nove kategorije */}
            <form onSubmit={addKategorija}>
                <h3>Dodaj novu kategoriju</h3>
                <input
                    type="text"
                    placeholder="Naziv"
                    value={newKategorija.naziv}
                    onChange={(e) => setNewKategorija({...newKategorija, naziv: e.target.value})}
                    required
                />
                <button type="submit" className="centered-button" disabled={loading}>Dodaj</button>

            </form>

            {/* Forma za ažuriranje kategorije */}
            {editingKategorija && (
                <form onSubmit={updateKategorija}>
                    <h3>Ažuriraj kategoriju</h3>
                    <input
                        type="text"
                        placeholder="Naziv"
                        value={editingKategorija.naziv}
                        onChange={(e) => setEditingKategorija({ ...editingKategorija, naziv: e.target.value })}
                        required
                    />
                    <button type="submit" disabled={loading}>Sačuvaj</button>
                </form>
            )}

            {/* Lista kategorija */}
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Naziv</th>
                    <th>Akcije</th>
                </tr>
                </thead>
                <tbody>
                {kategorije.map((kategorija) => (
                    <tr key={kategorija.id}>
                        <td>{kategorija.id}</td>
                        <td>{kategorija.naziv}</td>
                        <td>
                            <button onClick={() => setEditingKategorija(kategorija)} disabled={loading}>Edit</button>
                            <button onClick={() => deleteKategorija(kategorija.id)} disabled={loading}>Obriši</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default KategorijeTroskova;
