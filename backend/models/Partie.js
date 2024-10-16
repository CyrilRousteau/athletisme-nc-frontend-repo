// models/Partie.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Joueur = require('./Joueur');
const Jeux = require('./Jeux');

const Partie = sequelize.define('Partie', {
    joueur_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Joueur,
            key: 'id'
        }
    },
    jeu_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Jeux,
            key: 'id'
        }
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

module.exports = Partie;
