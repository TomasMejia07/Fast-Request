const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const { Pedido, Salsas } = require('./index')

const Pedidos_Salsas = sequelize.define('Pedidos_Salsas', {

    nombreSalsaPorPedido: {
        type: DataTypes.STRING(100),
        allowNull: false,
    }

}, {
    tableName: 'pedidos_salsas',
    timestamps: true
})

// realcion N:M

Pedido.belongsToMany(Salsas, { 
    through: Pedidos_Salsas, 
    foreignKey: 'pedidoId' 
});

Salsas.belongsToMany(Pedido, { 
    through: Pedidos_Salsas, 
    foreignKey: 'salsaId' 
});


module.exports = Pedidos_Salsas
