const { Usuario } = require('../models');

exports.registrarUsuario = async (req, res) => {
  try {
    const { nombre, apellido, correo, codigo, password } = req.body;
    
    const nuevoUsuario = await Usuario.create({
      nombre,
      apellido,
      correo,
      codigo,
      password
    });

    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'No se pudo registrar el usuario.' });
  }
};


exports.seleccionarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();

    res.status(201).json(usuarios);
  } catch (error) {
    console.error('Error al seleccionar usuarios:', error);
    res.status(500).json({ error: 'No se pudo traer los usuarios.' });
  }
};
