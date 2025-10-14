const Categoria = require('./Categoria');
const Producto = require('./Producto');
const Usuario = require('./Usuario');
const Pedido = require('./hacerPedido');
const ValidarEmail = require('./validarEmail');
const Clientes = require('./cliente');
const Permiso = require('./Permisos');
const Rol = require('./Roles');
const Perfil = require('./configuracionPerfil')
const Empresa = require('./Empresa');
const Salsas = require('./Salsas')
const Gaseosas = require('./Gaseosas')


module.exports = {
  Usuario,
  Pedido,
  Categoria,
  Clientes,
  Producto,
  ValidarEmail,
  Permiso,
  Rol,
  Perfil,
  Empresa,
  Salsas,
  Gaseosas
};

