const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt'); 
const { Usuario, Empresa, Rol } = require('../models');

exports.registrarUsuario = async (req, res) => {
  try {
    const { Correo, Nombre, Apellido, Password, EmpresaId, RolId } = req.body;

    // ✅ Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ where: { Correo } });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);

    const usuario = await Usuario.create({
      Correo,
      Nombre,
      Apellido,
      Password: hashedPassword,
      EmpresaId, // ✅ 1
      RolId      // ✅ 1
    });

    // Omitir el password en la respuesta
    const usuarioRespuesta = { ...usuario.toJSON() };
    delete usuarioRespuesta.Password;

    res.status(201).json({ 
      message: 'Usuario administrador registrado con éxito', 
      usuario: usuarioRespuesta 
    });
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
