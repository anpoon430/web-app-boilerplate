const Sequelize = require('sequelize');
const DB_NAME = 'BOILER'

const db = new Sequelize(process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`, {
  logging: false
});

module.exports = db;
