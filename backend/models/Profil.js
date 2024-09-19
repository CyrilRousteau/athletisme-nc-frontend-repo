// models/Profil.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../database');
const Joueur = require('./Joueur');

const Profil = sequelize.define('Profil', {
    joueur_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Joueur,
            key: 'id'
        }
    },
    score_endurance: DataTypes.FLOAT,
    score_force: DataTypes.FLOAT,
    score_agilite: DataTypes.FLOAT,
    score_final: DataTypes.FLOAT
});

module.exports = Profil;
