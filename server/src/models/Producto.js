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
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'productos',
    timestamps: true,
}
);




module.exports = Producto;