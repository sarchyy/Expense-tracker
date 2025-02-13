const { DataTypes } = require('sequelize');
const sequelize = require('../Database/database');

const Korisnik = sequelize.define('Korisnik', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ime: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'korisnici',
    timestamps: false
});

module.exports = Korisnik;
