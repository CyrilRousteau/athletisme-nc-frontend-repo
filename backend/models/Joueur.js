const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Joueur = sequelize.define('Joueur', {
    pseudo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    date_creation: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'Joueurs'
});

Joueur.associate = (models) => {
    Joueur.hasMany(models.Score, { foreignKey: 'joueur_id' });
};

module.exports = Joueur;