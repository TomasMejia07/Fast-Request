const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

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

    defaultScope:{
        where: {
            EstadoProducto: 'activo'
        }
    },

    scopes: {
        ProductoInactivo:{
            where:{

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




module.exports = Producto;