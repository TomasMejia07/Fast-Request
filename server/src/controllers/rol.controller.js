const { Rol, Permiso } = require("../models")
const ROL_NO_EDITABLE = "Administrador";
const ROLES_NO_ELIMINABLES = ["Administrador", "Cliente", "Empleado"];

// METODO PARA TRAER TODOS LOS ROLES ACTIVOS
exports.VisualizarRoles = async (req, res) => {
    try {
        const roles = await Rol.findAll({
            where: {
                EstadoRol: 'activo'
            },
            include: [{
                model: Permiso,
                attributes: ['Id', 'NombrePermiso'],
                through: { attributes: [] }
            }]
        })
        res.json(roles)
    } catch (error) {
        console.error('Error al obtener los roles :', error);
        res.status(500).json({ error: 'No se pudo traer los roles.' });
    }
}

// METODO PARA TRAER TODOS LOS ROLES INACTIVOS 
exports.VisualizarRolesInactivos = async (req, res) => {
    try {
        const roles = await Rol.scope('soloRolesInactivos').findAll()
        res.status(200).json(roles)
        console.log('Roles obtenidos correctamente')
    } catch (error) {
        console.error('Error al traer los roles', error)
        res.status(500).json({
            error: 'Error al obtener los roles'
        })
    }
}

// CREAR ROL
exports.CrearRol = async (req, res) => {
    try {
        const {NombreRol, EstadoRol, Permisos} = req.body
        const nuevoRol = await Rol.create({
            NombreRol,
            EstadoRol
        })

        if (Permisos && Permisos.length > 0) {
            const permisosDB = await Permiso.findAll({
                where: { Id: Permisos }
            });
            await nuevoRol.setPermisos(permisosDB);
        }

        res.status(201).json(nuevoRol)
    } catch (error) {
        console.error("Error al crear rol:", error);
        res.status(500).json({ message: "Error al crear rol." });
    }
}

// ACTUALIZAR ROL
exports.ActualizarRol = async (req, res) => {
    try {
        const {id} = req.params
        const {NombreRol, EstadoRol, Permisos} = req.body
        const rol = await Rol.findByPk(id)
        if (!rol) return res.status(404).json({ message: "rol no encontrado." });

        if (rol.NombreRol === ROL_NO_EDITABLE) {
            return res.status(403).json({ message: "El rol 'Administrador' no se puede modificar." });
        }

        await rol.update({
            NombreRol,
            EstadoRol
        })
        
        if (Permisos && Array.isArray(Permisos)) {
            const permisosDB = await Permiso.findAll({
                where: { Id: Permisos }
            });
            await rol.setPermisos(permisosDB);
        }
        res.json(rol)
    } catch (error) {
        console.error("Error al actualizar rol:", error);
        res.status(500).json({ message: "Error al actualizar rol." });
    }
}

// ELIMINAR ROL 
exports.EliminarRol = async (req,res) => {
    try {
        const {id} = req.params
        const rol = await Rol.findByPk(id)
        if (!rol) return res.status(404).json({ message: "rol no encontrado"})
        
        if (ROLES_NO_ELIMINABLES.includes(rol.NombreRol)) {
            return res.status(403).json({ message: `El rol '${rol.NombreRol}' no se puede eliminar.` });
        }

        await rol.destroy()
        res.json({message: "rol eliminado correctamente"})
    } catch (error) {
        console.error("Error al eliminar rol:", error);
        res.status(500).json({ message: "Error al eliminar rol." });
    }
}

// CAMBIAR ROL A INACTIVO 
exports.CambiarEstadoRolInactivo = async (req, res) => {
    try {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                message: 'El id es obligatorio'
            })
        }

        const rol = await Rol.unscoped().findByPk(id)

        if (!rol ) return res.status(400).json({
            message: 'Rol no encontrado'
        })

        await rol.update({
            EstadoRol: 'inactivo'
        })

        console.log('Estado del rol cambiado correctamente')
        res.status(200).json({
            message: 'Estado del rol cambiado correctamente'
        })
    } catch (error) {
        console.log('Error al cambiar el estado del rol', error)
        res.status(500).json({
            message: 'Error interno del servidor', error: error
        })
    }
}

// CAMBIAR ESTADO ACTIVO 
exports.CambiarEstadoRolActivo = async (req, res) => {
    try {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                message: 'El id es obligatorio'
            })
        }

        const rol = await Rol.unscoped().findByPk(id)

        if (!rol ) return res.status(400).json({
            message: 'Rol no encontrado'
        })

        await rol.update({
            EstadoRol: 'activo'
        })

        console.log('Estado del rol cambiado correctamente')
        res.status(200).json({
            message: 'Estado del rol cambiado correctamente'
        })
    } catch (error) {
        console.log('Error al cambiar el estado del rol', error)
        res.status(500).json({
            message: 'Error interno del servidor', error: error
        })
    }
}