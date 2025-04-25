const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');

router.post('/registro', usuarioController.registrarUsuario);
router.get('/registro', usuarioController.seleccionarUsuarios);
router.get('/verificarEmail', usuarioController.verificarEmail);
module.exports = router;
