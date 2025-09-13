const { Usuario } = require('../models')
const bcrypt = require('bcrypt');



exports.updateDataConfi = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, apellido } = req.body;

        const usuario = await Usuario.findByPk(id);
        if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });


        if (nombre === undefined && apellido === undefined) {
            return res.status(400).json({ message: 'Debes enviar al menos un campo para actualizar' });
        }

        const objectData = {}
        if (nombre !== undefined) objectData.nombre = nombre
        if (apellido !== undefined) objectData.apellido = apellido

        await Usuario.update(
            objectData,
            { where: { id } }
        );

        const updatedUser = await Usuario.findByPk(id, {
            attributes: ["nombre", "apellido"],
        });

        res.status(200).json({ message: 'Datos actualizados con éxito', updatedUser });

    } catch (err) {
        console.log('Error al actualizar los datos del usuario ❌', err);
        res.status(500).json({ message: 'Error interno en el servidor "Configuracion"' });
    }
}


exports.updatePassword = async (req, res) => {
    try {

        const { id } = req.params;
        const { current, new: newPass, confirm } = req.body;

        if (!current || !newPass || !confirm) {
            return res.status(400).json({ message: "Todos los campos son requeridos" });
        }

        if (newPass !== confirm) {
            return res.status(400).json({ message: "Las contraseñas no coinciden" });
        }

        const usuario = await Usuario.findByPk(id);
        if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });

        const comparacion = await bcrypt.compare(current, usuario.password);
        if (!comparacion) return res.status(401).json({ message: 'La contraseña \"actual\" es incorrecta. Por Favor vuelve a intentarlo' });

        const hashedPassword = await bcrypt.hash(newPass, 12);


        await Usuario.update(
            { password: hashedPassword },
            { where: { id } }
        );

        res.status(200).json({ message: 'Contraseña actualizada con éxito' });


    } catch (err) {

        console.log('Error al actualizar la password del usuario ❌', err);
        res.status(500).json({ message: 'Error interno en el servidor "Configuracion"' });
    }
}