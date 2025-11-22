const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Empresa = require('./Empresa')

const Producto = sequelize.define('Producto', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    NombreProducto: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    IdCategoria: {
        type: DataTypes.INTEGER,
        references: {
            model: 'categoria',
            key: 'id'
        },
        allowNull: false
    },
    EmpresaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'empresas',
            key: 'Id'
        }
    },
    PrecioProducto: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    DescripcionProducto: {
        type: DataTypes.STRING(155),
        allowNull: false
    },
    EstadoProducto: {
        type: DataTypes.ENUM('activo', 'inactivo'),
        allowNull: false,
        defaultValue: 'activo'
    }
}, {
    tableName: 'productos',
    timestamps: true,

    defaultScope: {
        where: {
            EstadoProducto: 'activo'
        }
    },

    scopes: {
        ProductoInactivo: {
            where: {

            }
        },
        soloProductosInactivos: {
            where: {
                EstadoProducto: 'inactivo'
            }
        }
    }
}
);


Empresa.hasMany(Producto, {
    foreignKey: 'EmpresaId',
    sourceKey: 'Id'
});

Producto.belongsTo(Empresa, {
    foreignKey: 'EmpresaId',
    targetKey: 'Id'
});





module.exports = Producto;