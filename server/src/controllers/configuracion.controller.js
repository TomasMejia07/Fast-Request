const { Usuario } = require('../models')
const bcrypt = require('bcrypt');



exports.updateDataConfi = async (req, res) => {
    try {
        const { Id } = req.params;
        const { nombre, apellido } = req.body;

        const usuario = await Usuario.findByPk(Id);
        if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });


        if (nombre === undefined && apellido === undefined) {
            return res.status(400).json({ message: 'Debes enviar al menos un campo para actualizar' });
        }

        const objectData = {}
        if (nombre !== undefined) objectData.Nombre = nombre
        if (apellido !== undefined) objectData.Apellido = apellido

        await Usuario.update(
            objectData,
            { where: { Id } }
        );

        const updatedUser = await Usuario.findByPk(Id, {
            attributes: ["Nombre", "Apellido"],
        });

        res.status(200).json({ message: 'Datos actualizados con éxito', updatedUser });

    } catch (err) {
        console.log('Error al actualizar los datos del usuario ❌', err);
        res.status(500).json({ message: 'Error interno en el servidor "Configuracion"' });
    }
}


exports.updatePassword = async (req, res) => {
    try {

        const { Id } = req.params;
        const { current, new: newPass, confirm } = req.body;

        if (!current || !newPass || !confirm) {
            return res.status(400).json({ message: "Todos los campos son requeridos" });
        }

        if (newPass !== confirm) {
            return res.status(400).json({ message: "Las contraseñas no coinciden" });
        }


        const usuario = await Usuario.findByPk(Id);
        if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });


        const mismaPass = await bcrypt.compare(newPass, usuario.Password);

        if (mismaPass) {
            return res.status(400).json({ message: "La nueva contraseña no puede ser igual a la actual" });
        }

        const comparacion = await bcrypt.compare(current, usuario.Password);
        if (!comparacion) {
            return res.status(401).json({ message: 'La contraseña \"actual\" es incorrecta.' });
        }

        const hashedPassword = await bcrypt.hash(newPass, 12);

        await Usuario.update(
            { Password: hashedPassword },
            { where: { Id } }
        );

        res.status(200).json({ message: 'Contraseña actualizada con éxito' });


    } catch (err) {

        console.log('Error al actualizar la password del usuario ❌', err);
        res.status(500).json({ message: 'Error interno en el servidor "Configuracion"' });
    }
}