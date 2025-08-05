const express = require('express')
const router = express.Router();
const recuperarCuenta = require('../controllers/recuperarContrasena.controller.js')

router.get('/recuperar/verificar-email', recuperarCuenta.verificarCorreo);
router.post('/recuperar/enviar-email', recuperarCuenta.enviarCodigoRecuperacion)
router.post('/recuperar/verificar-codigo', recuperarCuenta.validarCodigoRecuperacion);
router.put('/recuperar/cambiar-contrasena', recuperarCuenta.cambiarContrasena);

module.exports = router;