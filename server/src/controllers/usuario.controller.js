const { Usuario } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generarToken } = require('../utils/jwt');
require('dotenv').config();

exports.seleccionarUsuarios = async (req, res) => {
  try {
    const EmpresaId = req.user.empresaId;

    if (!EmpresaId) {
      return res.status(400).json({ error: "empresaId es requerido" });
    }

    const usuarios = await Usuario.findAll({
      where: {
        EmpresaId: EmpresaId
      }
    });

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