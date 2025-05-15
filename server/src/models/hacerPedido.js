const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Pedido = sequelize.define('Pedido', {

    nombreCliente: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    tipoProducto: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    cantidadProducto: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    municipioLocalidad: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    direccion: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    puntoDeReferencia: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    deseaSalsas: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    tipos_salsas: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    deseaGaseosa: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    tipos_gaseosas: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    notasAdicionales: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },

}, {
    tableName: 'pedidos',
    timestamps: true,
});

module.exports = Pedido
