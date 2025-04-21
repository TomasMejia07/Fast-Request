const { Usuario } = require('../models');

exports.registrarUsuario = async (req, res) => {
  try {
    const { nombre, correo, contrasena } = req.body;
    
    const nuevoUsuario = await Usuario.create({
      nombre,
      apellido,
      correo,
      codigo,
      contrasena
    });

    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'No se pudo registrar el usuario.' });
  }
};
