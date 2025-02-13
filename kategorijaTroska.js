const { DataTypes } = require('sequelize');
const sequelize = require('../Database/database');

const KategorijaTroska = sequelize.define('KategorijaTroska', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    naziv: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'kategorije_troskova',
    timestamps: false
});

module.exports = KategorijaTroska;
