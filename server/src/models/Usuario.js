const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Rol = require('./Roles');
const Empresa = require('./Empresa');

const Usuario = sequelize.define('Usuario', {
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  Apellido: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  Correo: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true
  },
  Password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  FotoPerfil: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  tableName: 'usuarios',
  timestamps: true
});


Rol.hasMany(Usuario, { foreignKey: 'RolId' });
Usuario.belongsTo(Rol, { foreignKey: 'RolId' });

Empresa.hasMany(Usuario, { foreignKey: 'EmpresaId' });
Usuario.belongsTo(Empresa, { foreignKey: 'EmpresaId' });

module.exports = Usuario;
