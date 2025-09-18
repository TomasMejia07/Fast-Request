const express = require('express')
const router = express.Router()
const uploadCloud = require('../middlewares/upload')
const configuracionPerfilController = require('../controllers/configuracionPerfil.controller')


router.get('/getUser/:usuarioId', configuracionPerfilController.findAllUser)

router.put(
    '/update-perfil/:usuarioId',
    uploadCloud.single('image'),
    configuracionPerfilController.perfilUsuario
);

module.exports = router

