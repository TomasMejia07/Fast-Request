// controllers/permisos.controller.js

const { Permiso } = require("../models");

// Listar permisos
async function ListarPermisos(req, res) {
    try {
        const permisos = await Permiso.findAll({
            attributes: ['Id', 'NombrePermiso', 'DescripcionPermiso'],
            order: [['Id', 'ASC']]
        });
        res.status(200).json(permisos);
    } catch (error) {
        console.error('Error al listar permisos:', error);
        res.status(500).json({ mensaje: 'Error al obtener permisos' });
    }
}

module.exports = {
    ListarPermisos
};
