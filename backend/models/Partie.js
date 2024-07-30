// models/Partie.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../database');
const Joueur = require('./Joueur');
const Jeu = require('./Jeu');

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
            model: Jeu,
            key: 'id'
        }
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

module.exports = Partie;
