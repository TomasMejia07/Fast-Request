const { DataTypes, where } = require('sequelize');
const { sequelize } = require('../config/db');
const Permiso = require('./Permisos');


const Rol = sequelize.define('Rol', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    NombreRol: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    EstadoRol: {
        type: DataTypes.ENUM('activo', 'inactivo'),
        defaultValue: 'activo',
        allowNull: false
    }
}, {
    tableName: 'roles',
    timestamps: true,

    defaultScope: {
        where: {
            EstadoRol: 'activo'
        }
    },

    scopes: {
        RolesInactivos:{
            where: {

            }
        },

        soloRolesInactivos: {
            where: {
                EstadoRol: 'inactivo'
            }
        }
    }
});


Rol.belongsToMany(Permiso, {
    through: 'rol_permisos',
    foreignKey: 'RolId',
    otherKey: 'PermisoId'
});

Permiso.belongsToMany(Rol, {
    through: 'rol_permisos',
    foreignKey: 'PermisoId',
    otherKey: 'RolId'
});

module.exports = Rol;
