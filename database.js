const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite' ,
    //logging: false // Assurez-vous que le chemin vers votre base de données est correct
});

module.exports = sequelize;
