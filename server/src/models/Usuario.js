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
  RolId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'roles',
      key: 'Id'
    }
  },
  EmpresaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'empresas',
      key: 'Id'
    }
  }
}, {
  tableName: 'usuarios',
  timestamps: true
});

Rol.hasMany(Usuario, { 
  foreignKey: 'RolId',
  sourceKey: 'Id'
});

Usuario.belongsTo(Rol, { 
  foreignKey: 'RolId',
  targetKey: 'Id'
});

Empresa.hasMany(Usuario, { 
  foreignKey: 'EmpresaId',
  sourceKey: 'Id'
});

Usuario.belongsTo(Empresa, { 
  foreignKey: 'EmpresaId',
  targetKey: 'Id'
});

module.exports = Usuario;