const { Rol, Permiso } = require("../models")
const ROL_NO_EDITABLE = "Administrador";
const ROLES_NO_ELIMINABLES = ["Administrador", "Cliente", "Empleado"];

exports.VisualizarRoles = async (req, res) => {
    try {
        const rol = await Rol.findAll({
            include: [{
                model: Permiso,
                attributes: ['Id', 'NombrePermiso'],
                through: { attributes: [] }
            }]
        })
        res.json(rol)
    } catch (error) {
        console.error('Error al obtener los roles :', error);
        res.status(500).json({ error: 'No se pudo traer los roles.' });
    }
}

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