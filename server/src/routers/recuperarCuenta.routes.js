const express = require('express')
const router = express.Router();
const recuperarCuenta = require('../controllers/recuperarContrasena.controller.js')

router.post('/recuperar/enviaremail', recuperarCuenta.enviarCodigoRecuperacion)
router.post('/recuperar/verificar-codigo', recuperarCuenta.validarCodigoRecuperacion);


module.exports = router;