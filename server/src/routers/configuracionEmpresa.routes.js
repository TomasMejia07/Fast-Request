const express = require('express')
const router = express.Router()
const uploadCloud = require('../middlewares/upload')
const configuracionEmpresa = require('../controllers/configuracionEmpresa.controller');
const verificarJWT = require('../middlewares/verificarJWT');
const { soloAdmin, soloEmpresa } = require('../middlewares/verificarRoles');

router.get('/getUser/:usuarioId', verificarJWT,)

router.put('/update-perfil/:usuarioId', verificarJWT, uploadCloud.single('image'), configuracionPerfilController.perfilUsuario);

module.exports = router

