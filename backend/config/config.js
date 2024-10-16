require('dotenv').config(); // Charger les variables d'environnement depuis le fichier .env

module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || null,
    database: 'database_development',
    host: '127.0.0.1',
    dialect: 'sqlite',
    storage: process.env.DB_STORAGE || './database.sqlite'
  },
  test: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'sqlite',
    storage: process.env.DB_STORAGE || './database.sqlite'
  },
  production: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'sqlite',
    storage: process.env.DB_STORAGE || './database.sqlite'
  }
};
