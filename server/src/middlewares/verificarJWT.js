const jwt = require('jsonwebtoken');

async function verificarJWT(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    
    // ✅ Cargar información completa del usuario según tu estructura
    const Usuario = require("../models/Usuario");
    const Rol = require("../models/Roles");
    const Empresa = require("../models/Empresa");
    
    const usuario = await Usuario.findByPk(payload.id, {
      include: [
        { model: Rol, attributes: ['Id', 'NombreRol'] },
        { model: Empresa, attributes: ['Id', 'NombreEmpresa'] }
      ]
    });

    if (!usuario) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    req.user = {
      id: usuario.Id,
      correo: usuario.Correo,
      rol: usuario.Rol ? usuario.Rol.NombreRol : null,
      rolId: usuario.RolId,
      empresaId: usuario.EmpresaId,
      empresa: usuario.Empresa ? usuario.Empresa.NombreEmpresa : null,
      usuarioCompleto: usuario // Opcional: para acceso rápido
    };

    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expirado' });
    }
    return res.status(401).json({ error: 'Token inválido' });
  }
}

module.exports = verificarJWT;
