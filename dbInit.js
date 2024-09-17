const sequelize = require('./database');
const Score = require('./backend/models/Score.js'); // Assurez-vous que le chemin est correct
// Importez d'autres modèles si nécessaire

const initializeDatabase = async () => {
  try {
    await sequelize.sync({ force: false }); // force: true pour recréer les tables à chaque démarrage
    console.log('Tables synchronisées');
  } catch (error) {
    console.error('Erreur lors de la synchronisation des tables:', error);
    throw error;
  }
};

module.exports = initializeDatabase;
