// models/OrientationSportive.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../database');

const OrientationSportive = sequelize.define('OrientationSportive', {
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: DataTypes.TEXT,
    competence_principale: DataTypes.STRING
});

module.exports = OrientationSportive;
