const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Empresa = require('./Empresa')

const Salsas = sequelize.define('Salsas', {

    nombreSalsa: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    estadoSalsa:{
        type: DataTypes.ENUM('activo', 'inactivo'),
        allowNull: false,
        defaultValue: 'activo'
    },
    EmpresaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'empresas',
            key: 'Id'
        }
    },

},{
    tableName: 'salsas',
    timestamps: true,

    defaultScope:{
        where:{
            estadoSalsa: 'activo'
        }
    },

    scopes:{
        salsasInactivas:{
            where:{

            }
        },

        soloSalsasInactivas: {
            where: { 
                estadoSalsa: 'inactivo' 
            }
        }
    }
})


Empresa.hasMany(Salsas, {
    foreignKey: 'EmpresaId',
    sourceKey: 'Id'
});

Salsas.belongsTo(Empresa, {
    foreignKey: 'EmpresaId',
    targetKey: 'Id'
});



module.exports = Salsas