
const express = require('express');
const router = express.Router();
const pedido = require('../controllers/hacerPedido.controller');

router.post('/nuevoPedido', pedido.nuevoPedido);
router.get('/ObtenerPedidos', pedido.seleccionarPedidos);

module.exports = router