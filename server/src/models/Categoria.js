const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Producto = require("./Producto");
const Empresa = require('./Empresa')

const Categoria = sequelize.define('categoria',{
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    NombreCategoria: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    EstadoCategoria: {
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

}, {
    tableName: 'categoria',
    timestamps: true,

    defaultScope: {
        where: {
            EstadoCategoria: 'activo'
        }
    },

    scopes:{
        CategoriaInactiva:{
            where:{

            }
        },

        soloCategoriasInactivas: {
            where: {
                EstadoCategoria: 'inactivo'
            }
        }
    }
}
);

Categoria.hasMany(Producto,{
    foreignKey: 'IdCategoria',
    sourceKey: 'Id'
});
Producto.belongsTo(Categoria,{
    foreignKey: 'IdCategoria',
    targetKey: 'Id'
})


Empresa.hasMany(Categoria, {
    foreignKey: 'EmpresaId',
    sourceKey: 'Id'
});

Categoria.belongsTo(Empresa, {
    foreignKey: 'EmpresaId',
    targetKey: 'Id'
});

module.exports = Categoria;