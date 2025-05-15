const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Clientes = sequelize.define('clientes', {

    NombreCliente: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    NumeroDocumento: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    CorreoElectronico: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    NumeroContacto: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    EstadoCliente: {
        type: DataTypes.STRING,
        allowNull: false,
    },

},  {
        tableName: 'clientes',
        timestamps: true,
    }
);


module.exports = Clientes;