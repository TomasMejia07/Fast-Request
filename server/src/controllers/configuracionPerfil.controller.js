const { Perfil, Usuario } = require('../models');


exports.findAllUser = async (req, res) => {
    try {

        const { usuarioId } = req.params;

        const usuario = await Usuario.findOne({
            where: { id: usuarioId },
            attributes: ['id', 'nombre', 'apellido', 'correo'],
            include: [{
                model: Perfil,
                attributes: ['telefono', 'direccion', 'fechaNacimiento', 'Imagen_De_Perfil'],
                required: false
            }]
        });

        if (!usuario) {
            return res.status(404).json({ message: "Perfil no encontrado" });
        }

        res.status(200).json({
            message: "Usuario obtenido correctamente",
            usuario
        });

    } catch (err) {
        console.error("Error interno del servidor", err);
        res.status(500).json({ message: "Error interno al obtener el usuario" });
    }
}




exports.perfilUsuario = async (req, res) => {
    try {
        const { usuarioId } = req.params;
        const { telefono, direccion, fechaNacimiento } = req.body;

        const usuario = await Usuario.findByPk(usuarioId); if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" })
        }

        let Imagen_De_Perfil;
        if (req.file) {
            Imagen_De_Perfil = `http://localhost:5000/uploads/perfiles/${req.file.filename}`;
        }


        let perfil = await Perfil.findOne({ where: { usuarioId: usuario.id } });

        if (perfil) {

            await perfil.update({
                telefono: telefono || perfil.telefono,
                direccion: direccion || perfil.direccion,
                fechaNacimiento: fechaNacimiento || perfil.fechaNacimiento,
                Imagen_De_Perfil: Imagen_De_Perfil || perfil.Imagen_De_Perfil
            });
            return res.status(200).json({ message: "Perfil actualizado correctamente", perfil });
        } else {

            perfil = await Perfil.create({
                usuarioId: usuario.id,
                telefono: telefono || "Por completar",
                direccion: direccion || "Por completar",
                fechaNacimiento: fechaNacimiento || null,
                ...(Imagen_De_Perfil && { Imagen_De_Perfil })
            });

            res.status(201).json({ message: "Perfil creado correctamente", perfil, });
        }

    } catch (err) {
        console.error("Error interno del servidor", err);
        res.status(500).json({ message: "Error interno al actualizar el perfil del usuario" });
    }
};
