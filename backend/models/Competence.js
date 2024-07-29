// models/Competence.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Competence = sequelize.define('Competence', {
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Competence;
