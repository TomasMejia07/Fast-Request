const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Gaseosas = sequelize.define('Gaseosas', {

    nombreGaseosa: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    estadoGaseosa:{
        type: DataTypes.ENUM('activo', 'inactivo'),
        allowNull: false,
        defaultValue: 'activo'
    }

},{
    tableName: 'gaseosas',
    timestamps: true,


    defaultScope:{
        where:{
            estadoGaseosa: 'activo'
        }
    },

    scopes:{
        gaseosasInactivas:{
            where:{
                
            }
        },
        soloGaseosasInactivas:{
            where:{
                estadoGaseosa: 'inactivo'
            }
        }
    }

})


module.exports = Gaseosas