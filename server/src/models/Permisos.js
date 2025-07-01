const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

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
    }
}, {
    tableName: 'permisos',
    timestamps: true
});


module.exports = Permiso;
