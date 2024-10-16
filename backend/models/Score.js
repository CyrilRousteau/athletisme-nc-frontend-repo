const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Score = sequelize.define('Score', {
  joueur_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  jeu_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  valeur: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'Scores'
});

Score.associate = (models) => {
  Score.belongsTo(models.Joueur, { foreignKey: 'joueur_id' });
  Score.belongsTo(models.Jeux, { foreignKey: 'jeu_id' });
};

module.exports = Score;
