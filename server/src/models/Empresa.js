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
  Estado: {
    type: DataTypes.ENUM('Activo', 'Inactivo'),
    defaultValue: 'Activo'
  },
  LogoEmpresa: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: 'https://res.cloudinary.com/dp9jbvpwl/image/upload/v1761450639/store-4156934_640_cknbry.png'
  }
}, {
  tableName: 'empresas',
  timestamps: true
});




module.exports = Empresa;