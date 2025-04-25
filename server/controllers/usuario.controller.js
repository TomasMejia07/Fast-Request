const { Usuario } = require('../models');

exports.registrarUsuario = async (req, res) => {
  try {
    const { nombre, apellido, correo, codigo, password } = req.body;
    const existe = await Usuario.findOne({ where: { correo } });

    if (existe) {
      return res.status(400).json({ message: 'Este correo ya está registrado.' });
    }

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


exports.verificarEmail = async (req, res) => {
  try {
    const { correo } = req.query;
    const existe = await Usuario.findOne({ where: { correo } });

    if (existe) {
      return res.status(200).json({ existe: true, mensaje: 'Este correo ya está registrado.' });
    } else {
      return res.status(200).json({ existe: false, mensaje: 'Este correo no está registrado.' });
    }
  } catch (error) {
    console.error('Error al verificar el correo:', error);
    res.status(500).json({ error: 'No se pudo verificar el correo.' });
  }
}