// models/QuizzScore.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../database');
const Joueur = require('./Joueur');
const Jeu = require('./Jeu');

const QuizzScore = sequelize.define('QuizzScore', {
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
    score: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
});

module.exports = QuizzScore;
