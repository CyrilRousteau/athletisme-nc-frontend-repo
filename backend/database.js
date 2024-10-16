const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite' ,
    logging: console.log, // Active les logs SQL dans la console
});

module.exports = sequelize;
