'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
const modelsDirectory = path.join(__dirname, '../backend/models');

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Charger explicitement les modèles
const Joueur = require(path.join(modelsDirectory, 'joueur'))(sequelize, Sequelize.DataTypes);
const Score = require(path.join(modelsDirectory, 'score'))(sequelize, Sequelize.DataTypes);
const Jeux = require(path.join(modelsDirectory, 'jeux'))(sequelize, Sequelize.DataTypes);


// Définir explicitement les associations
Joueur.associate(db);
Score.associate(db);
Jeux.associate(db);
// Vérifie les associations
console.log('Associations pour Joueur :', db.Joueur.associations);
console.log('Associations pour Score :', db.Score.associations);


// Si vous souhaitez toujours charger dynamiquement les autres modèles (s'il y en a)
fs
  .readdirSync(modelsDirectory)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(modelsDirectory, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Synchronisation après l'application des associations
sequelize.sync({ alter: true }) // Utilise `alter: true` pour mettre à jour les tables si nécessaire
  .then(() => {
    console.log('Base de données synchronisée.');
    console.log(db.Joueur.associations);
    console.log(db.Score.associations);

  })
  .catch((error) => {
    console.error('Erreur lors de la synchronisation de la base de données :', error);
  });

db.Sequelize = Sequelize;

module.exports = db;
