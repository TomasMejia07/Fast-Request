const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');


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






module.exports = Salsas