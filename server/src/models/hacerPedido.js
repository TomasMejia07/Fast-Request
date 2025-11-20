const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Producto = require('./Producto')

const Pedido = sequelize.define('Pedido', {

    clienteId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'clientes',
            key: 'id'
        },
        allowNull: false,
    },
    productoId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'productos',
            key: 'id'
        },
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
        allowNull: true,
    },
    total: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    estadoDelPedido: {
        type: DataTypes.ENUM('En espera', 'En proceso', 'terminado'),
        allowNull: false
    }
}, {
    tableName: 'pedidos',
    timestamps: true,

    scopes: {
        enEspera: { where: { estadoDelPedido: 'En espera' } },
        enProceso: { where: { estadoDelPedido: 'En proceso' } },
        terminado: { where: { estadoDelPedido: 'terminado' } },
    }
});

Producto.hasMany(Pedido, {
    foreignKey: 'productoId',
    sourceKey: 'Id'
})

Pedido.belongsTo(Producto, {
    foreignKey: 'productoId',
    targetKey: 'Id'
})


module.exports = Pedido
