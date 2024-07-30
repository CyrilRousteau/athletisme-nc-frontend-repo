// models/Score.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../database');
const Joueur = require('./Joueur');
const Jeu = require('./Jeu');

const Score = sequelize.define('Score', {
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
            model: Jeu,
            key: 'id'
        }
    },
    valeur: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

module.exports = Score;
