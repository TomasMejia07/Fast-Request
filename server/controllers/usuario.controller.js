const { Usuario } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.registrarUsuario = async (req, res) => {
  try {
    const { nombre, apellido, correo, codigo, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const nuevoUsuario = await Usuario.create({
      nombre,
      apellido,
      correo,
      codigo,
      password: hashedPassword
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
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: user.id, correo: usuario.correo }, 
      process.env.JWT_SECRET, 
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({ token, mensaje: 'Inicio de sesión exitoso' });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
};
