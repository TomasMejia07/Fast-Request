const express = require('express')
const router = express.Router();
const validarEmailController = require('../controllers/validarEmail.controller.js')

router.post('/handle-email', validarEmailController.validarEmail)
router.post('/verify-code', validarEmailController.validarCodigo);

module.exports = router;