const { DataTypes } = require('sequelize');
const sequelize = require('../../database');
const Competence = require('./Competence');

const Jeux = sequelize.define('Jeux', {
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
}, {
  tableName: 'Jeux'
});

Jeux.associate = (models) => {
  Jeux.hasMany(models.Score, { foreignKey: 'jeu_id' });
};

module.exports = Jeux;
