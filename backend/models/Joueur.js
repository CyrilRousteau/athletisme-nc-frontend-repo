// models/Joueur.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Joueur = sequelize.define('Joueur', {
    pseudo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date_naissance: {
        type: DataTypes.DATE,
        allowNull: false
    },
    date_creation: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

module.exports = Joueur;
