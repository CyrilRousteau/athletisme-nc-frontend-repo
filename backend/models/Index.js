const Jeux = require('./Jeux');
const Score = require('./Score');
const Joueur = require('./Joueur');

// Définir les associations
Jeux.hasMany(Score, { foreignKey: 'jeu_id' });
Score.belongsTo(Jeux, { foreignKey: 'jeu_id' });

Joueur.hasMany(Score, { foreignKey: 'joueur_id' });
Score.belongsTo(Joueur, { foreignKey: 'joueur_id' });

// Exporter les modèles pour une utilisation dans d'autres fichiers
module.exports = {
    Jeux,
    Score,
    Joueur
};
