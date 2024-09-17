const { DataTypes } = require('sequelize');
const sequelize = require('../../database');

const QuizzScore = sequelize.define('QuizzScore', {
    joueur_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    jeu_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'QuizzScores',
    timestamps: true 
});

// Définir les associations dans une fonction séparée
QuizzScore.associate = (models) => {
    QuizzScore.belongsTo(models.Joueur, { foreignKey: 'joueur_id' });
    QuizzScore.belongsTo(models.Jeux, { foreignKey: 'jeu_id' });
};

module.exports = QuizzScore;