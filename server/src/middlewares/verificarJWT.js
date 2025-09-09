const jwt = require('jsonwebtoken');

function verificarJWT(req, res, next) {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ error: 'Token mal formado' });
// 
  const token = parts[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // adjunta datos útiles al request
    req.user = { id: payload.id, role: payload.role };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
}

module.exports = verificarJWT;
