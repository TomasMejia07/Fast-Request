const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const { Pedido, Gaseosas } = require('./index') 

const Pedidos_Gaseosas = sequelize.define('Pedidos_Gaseosas', {

    nombreGaseosaPorPedido: {
        type: DataTypes.STRING(100),
        allowNull: false
    }

}, {
    tableName: 'pedidos_gaseosas',
    timestamps: true
})


Pedido.belongsToMany(Gaseosas, {
    through: Pedidos_Gaseosas,
    foreignKey: 'pedidoId'
})

Gaseosas.belongsToMany(Pedido, {
    through: Pedidos_Gaseosas,
    foreignKey: 'gaseosaId'
})


