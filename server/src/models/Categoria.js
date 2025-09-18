const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Producto = require("./Producto");
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
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'categoria',
    timestamps: true,
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

module.exports = Categoria;