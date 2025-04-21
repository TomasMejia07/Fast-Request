const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Usuario = sequelize.define('Usuario', {
    correo: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    apellido: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    codigo: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    contrasena: {
        type: DataTypes.STRING(100),
        allowNull: false,
    }
});

module.exports = Usuario;
