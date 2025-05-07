const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Categoria = sequelize.define('categoria',{
    NombreCategoria: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    EstadoCategoria: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'categoria',
    timestamps: true,
}
);

module.exports = Categoria;