const { DataTypes, where } = require('sequelize');
const { sequelize } = require('../config/db');
const Pedido = require('./hacerPedido')


const Clientes = sequelize.define('clientes', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    NombreCliente: {
        type: DataTypes.STRING(100),
        allowNull: false
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
    Contrasena: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    EstadoCliente: {
        type: DataTypes.ENUM('activo', 'inactivo'),
        allowNull: false,
        defaultValue: 'activo'
    },

}, {
    tableName: 'clientes',
    timestamps: true,

    // cada vez que yo pida "clientes", muéstra SOLO los que tienen el estado activo, 
    // sin que tenga que pedirlo manualmente
    defaultScope: {
        where: {
            EstadoCliente: 'activo'
        }
    },

    // cada vez que yo pida "clientes", muéstra los clientes tanto con estado
    // activo eh inactivo, sin que tenga que pedirlo manualmente
    scopes: {
        clientesInactivos: {
            where: {}
        },
        
        //cada vez que yo pida "clientes", muéstra SOLO los que tienen el estado inactivo, 
        // sin que tenga que pedirlo manualmente
        soloClientesInactivos: {
            where: { EstadoCliente: 'inactivo' }
        }
    }

}
);

Clientes.hasMany(Pedido, {
    foreignKey: 'clienteId',
    sourceKey: 'Id'
})

Pedido.belongsTo(Clientes, {
    foreignKey: 'clienteId',
    targetKey: 'Id'
})

module.exports = Clientes;