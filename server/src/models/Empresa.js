const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Empresa = sequelize.define('Empresa', {
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  NombreEmpresa: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  slug: {  
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  Estado: {
    type: DataTypes.ENUM('Activo', 'Inactivo'),
    defaultValue: 'Activo'
  },
  LogoEmpresa: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  tableName: 'empresas',
  timestamps: true
});

module.exports = Empresa;