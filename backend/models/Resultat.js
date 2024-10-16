// models/Resultat.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Resultat = sequelize.define('Resultat', {
  joueurName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalScore: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'Resultats' // Nom de la table dans la base de données
});

module.exports = Resultat;
