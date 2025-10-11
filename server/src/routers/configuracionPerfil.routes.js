const express = require('express')
const router = express.Router()
const uploadCloud = require('../middlewares/upload')
const configuracionPerfilController = require('../controllers/configuracionPerfil.controller');
const verificarJWT = require('../middlewares/verificarJWT');
const { soloAdmin, soloEmpresa } = require('../middlewares/verificarRoles');

router.get('/getUser/:usuarioId', verificarJWT, configuracionPerfilController.findAllUser)

router.put('/update-perfil/:usuarioId', verificarJWT, uploadCloud.single('image'), configuracionPerfilController.perfilUsuario);

module.exports = router

