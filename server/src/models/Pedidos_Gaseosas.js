const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const { Pedido, Gaseosas, Empresa } = require('./index') 

const Pedidos_Gaseosas = sequelize.define('Pedidos_Gaseosas', {

    nombreGaseosaPorPedido: {
        type: DataTypes.STRING(100),
        allowNull: false
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



Empresa.hasMany(Pedidos_Gaseosas, {
    foreignKey: 'EmpresaId',
    sourceKey: 'Id'
});

Pedidos_Gaseosas.belongsTo(Empresa, {
    foreignKey: 'EmpresaId',
    targetKey: 'Id'
});

