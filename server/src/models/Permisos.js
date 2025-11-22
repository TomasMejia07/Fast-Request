const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Empresa = require('./Empresa')

const Permiso = sequelize.define('Permiso', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    NombrePermiso: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    DescripcionPermiso: {
        type: DataTypes.STRING(155),
        allowNull: true
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
    tableName: 'permisos',
    timestamps: true
});


Empresa.hasMany(Permiso, {
    foreignKey: 'EmpresaId',
    sourceKey: 'Id'
});

Permiso.belongsTo(Empresa, {
    foreignKey: 'EmpresaId',
    targetKey: 'Id'
});

module.exports = Permiso;
