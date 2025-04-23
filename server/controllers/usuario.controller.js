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

exports.loginUsuario = async (req, res) => {
  const { usuario, password } = req.body;

  try {
    const user = await Usuario.findOne({ where: { correo: usuario } });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    return res.status(200).json({ message: 'Login exitoso', usuario: user });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
};
