const { DataTypes } = require('sequelize');
const sequelize = require('../Database/database');

const Trosak = sequelize.define('Trosak', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    naziv: {
        type: DataTypes.STRING,
        allowNull: false
    },
    iznos: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    datum: {
        type: DataTypes.DATE,
        allowNull: false
    },
    kategorijaId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    korisnikId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'troskovi',
    timestamps: false
});

module.exports = Trosak;
