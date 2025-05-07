const { Sequelize } = require('sequelize');
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();
// Configuración de la conexión a la base de datos
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT
  }
);

module.exports = { Sequelize, sequelize };
