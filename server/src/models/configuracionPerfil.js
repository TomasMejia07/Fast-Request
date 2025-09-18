const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');
const Usuario = require('./Usuario');

const Perfil = sequelize.define('Perfil', {

    usuarioId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'usuarios',
            key: 'id'
        }
    },

    telefono:{
    type: DataTypes.STRING(100),
    allowNull: true
    },

    direccion: {
    type: DataTypes.STRING(100),
    allowNull: true,
    },

    fechaNacimiento: {
        type: DataTypes.DATE,
        allowNull: true
    },

    Imagen_De_Perfil: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: 'https://res.cloudinary.com/dp9jbvpwl/image/upload/v1757260230/user_izbzpi.png'
    }


}, {

    tableName: 'perfil',
    timestamps: true,
})

// Relación 1:1

Perfil.belongsTo(Usuario, {  // Cada perfil pertenece a un usuario.
    foreignKey: 'usuarioId',
    sourceKey: 'id'
})

Usuario.hasOne(Perfil, {  // Un usuario tiene un solo perfil.
    foreignKey: 'usuarioId',
    targetKey: 'id'
})



module.exports = Perfil