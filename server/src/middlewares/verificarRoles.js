function soloAdmin(req, res, next) {
  if (req.user.rol !== 'Administrador') {
    return res.status(403).json({ error: 'Se requiere rol de Administrador' });
  }
  next();
}

function soloEmpresa(req, res, next) {
  // Verificar que el usuario pertenezca a la empresa del recurso
  if (req.params.empresaId && req.user.empresaId !== parseInt(req.params.empresaId)) {
    return res.status(403).json({ error: 'Acceso denegado a recursos de otra empresa' });
  }
  next();
}