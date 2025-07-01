// controllers/permisos.controller.js

const { Permiso } = require("../models");

const permisosIniciales = [
    { NombrePermiso: 'Visualizar Categorías', DescripcionPermiso: 'Permite ver las categorías' },
    { NombrePermiso: 'Crear Categorías', DescripcionPermiso: 'Permite crear nuevas categorías' },
    { NombrePermiso: 'Modificar Categorías', DescripcionPermiso: 'Permite editar categorías existentes' },
    { NombrePermiso: 'Eliminar Categorías', DescripcionPermiso: 'Permite eliminar categorías' },
    { NombrePermiso: 'Visualizar Productos', DescripcionPermiso: 'Permite ver los productos' },
    { NombrePermiso: 'Crear Productos', DescripcionPermiso: 'Permite agregar nuevos productos' },
    { NombrePermiso: 'Modificar Productos', DescripcionPermiso: 'Permite editar productos existentes' },
    { NombrePermiso: 'Eliminar Productos', DescripcionPermiso: 'Permite eliminar productos' },
    { NombrePermiso: 'Visualizar Roles', DescripcionPermiso: 'Permite ver los roles del sistema' },
    { NombrePermiso: 'Crear Roles', DescripcionPermiso: 'Permite crear nuevos roles' },
    { NombrePermiso: 'Modificar Roles', DescripcionPermiso: 'Permite editar roles' },
    { NombrePermiso: 'Eliminar Roles', DescripcionPermiso: 'Permite eliminar roles' },
    { NombrePermiso: 'Visualizar Usuarios', DescripcionPermiso: 'Permite ver la lista de usuarios' },
    { NombrePermiso: 'Crear Usuarios', DescripcionPermiso: 'Permite agregar nuevos usuarios' },
    { NombrePermiso: 'Modificar Usuarios', DescripcionPermiso: 'Permite editar usuarios' },
    { NombrePermiso: 'Eliminar Usuarios', DescripcionPermiso: 'Permite eliminar usuarios' }
];

// Función que se puede usar directamente desde app.js
async function crearPermisosIniciales() {
    try {
        for (const permiso of permisosIniciales) {
            await Permiso.findOrCreate({
                where: { NombrePermiso: permiso.NombrePermiso },
                defaults: permiso
            });
        }
        console.log("✅ Permisos creados o ya existentes");
    } catch (error) {
        console.error("❌ Error al insertar permisos:", error);
    }
}

// Endpoint opcional (por si quieres llamarlo manualmente desde el navegador o Postman)
async function InsertarPermisosIniciales(req, res) {
    try {
        await crearPermisosIniciales();
        res.status(201).json({ mensaje: 'Permisos insertados o ya existentes' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al insertar permisos' });
    }
}

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
    crearPermisosIniciales,
    InsertarPermisosIniciales,
    ListarPermisos
};
