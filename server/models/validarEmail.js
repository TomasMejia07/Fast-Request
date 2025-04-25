const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const ValidarEmail = sequelize.define('ValidarEmail', {
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    codigo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    expiracion: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
    tableName: 'validacion_email',
    timestamps: true,
}
);

module.exports = ValidarEmail;