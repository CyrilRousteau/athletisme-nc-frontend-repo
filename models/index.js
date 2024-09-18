'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const { sequelize } = require('../backend/models');

sequelize.sync({ alter: true }) // Utilise `alter: true` pour ne pas recréer les tables mais les mettre à jour si nécessaire
  .then(() => {
    console.log('Base de données synchronisée.');
  })
  .catch((error) => {
    console.error('Erreur lors de la synchronisation de la base de données :', error);
  });

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Charger tous les modèles dans ce répertoire
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Définir les associations entre les modèles
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    console.log(`Associating ${modelName}`);
    db[modelName].associate(db); // Applique les associations
  }
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
