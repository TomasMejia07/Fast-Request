const express = require('express');
const router = express.Router();
const pedido = require('../controllers/hacerPedido.controller');
const verificarJWT = require('../middlewares/verificarJWT');
const { soloAdmin, soloEmpresa } = require('../middlewares/verificarRoles');

router.post('/nuevoPedido', verificarJWT, pedido.nuevoPedido);
router.get('/ObtenerPedidos', verificarJWT, pedido.seleccionarPedidos);
router.get('/cliente-pedidos/:clienteId', verificarJWT, pedido.obtenerPedidosConClientes)
router.get('/productos', verificarJWT, pedido.obtenerNombresProductos)
router.get('/clientes', verificarJWT, pedido.obtenerNombresClientes)
router.get('/pedidoFull/:id', verificarJWT, pedido.ObtenerPedidoCompleto)
router.get('/salsas', verificarJWT, pedido.obtenerNombresSalsas)
router.get('/gaseosas', verificarJWT, pedido.obtenerNombresGaseosas)
router.get('/obtenerPedidosEnCocina', verificarJWT, pedido.obtenerPedidosEnCocina)
router.put('/cambiarEstadoPedido/:id', verificarJWT, pedido.cambiarEstadoPedido)



module.exports = router