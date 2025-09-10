const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt'); 
const { Usuario, Empresa, Rol } = require('../models');

exports.registrarUsuario = async (req, res) => {
  try {
    const { nombre, apellido, correo, password, empresaId, rolId } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const usuario = await Usuario.create({
      nombre,
      apellido,
      correo,
      password: hashedPassword,
      EmpresaId: empresaId,
      RolId: rolId
    });

    res.status(201).json({ message: 'Usuario registrado con éxito', usuario });
  } catch (err) {
    console.error('Error al registrar usuario:', err);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

exports.loginUsuario = async (req, res) => {
  try {
    const { correo, password } = req.body;
    const usuario = await Usuario.findOne({ where: { correo } });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const esValido = await bcrypt.compare(password, usuario.password);
    if (!esValido) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const payload = {
      id: usuario.Id,
      correo: usuario.Correo,
      rolId: usuario.RolId,
      empresaId: usuario.EmpresaId
    };

    const token = jwt.generarToken(payload);

    res.json({ message: 'Login exitoso', token });
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ error: 'Error en login' });
  }
};
