const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const { Pedido, Salsas, Empresa } = require('./index')

const Pedidos_Salsas = sequelize.define('Pedidos_Salsas', {

    nombreSalsaPorPedido: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    EmpresaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'empresas',
            key: 'Id'
        }
    },

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


Empresa.hasMany(Pedidos_Salsas, {
    foreignKey: 'EmpresaId',
    sourceKey: 'Id'
});

Pedidos_Salsas.belongsTo(Empresa, {
    foreignKey: 'EmpresaId',
    targetKey: 'Id'
});



module.exports = Pedidos_Salsas
