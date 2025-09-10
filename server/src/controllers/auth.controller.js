const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt'); 
const { Usuario, Empresa, Rol } = require('../models');

exports.registrarUsuario = async (req, res) => {
  try {
    const { correo, nombre, apellido, password, empresaId, rolId } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const usuario = await Usuario.create({
      correo,
      nombre,
      apellido,
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
    const { usuario, password } = req.body;
    const user = await Usuario.findOne({ where: { usuario } });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const esValido = await bcrypt.compare(password, user.password);
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
