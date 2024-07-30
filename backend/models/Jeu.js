// models/Jeu.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../database');
const Competence = require('./Competence');

const Jeu = sequelize.define('Jeu', {
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type_score: {
        type: DataTypes.STRING,
        allowNull: false
    },
    competence_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Competence,
            key: 'id'
        }
    }
});

module.exports = Jeu;
