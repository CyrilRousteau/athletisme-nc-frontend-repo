const sequelize = require('./database');
// Importez d'autres modèles si nécessaire

const initializeDatabase = async () => {
  try {
    await sequelize.sync({ force: false }); // force: true pour recréer les tables à chaque démarrage
  } catch (error) {
    throw error;
  }
};

module.exports = initializeDatabase;
