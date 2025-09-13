const express = require('express')
const router = express.Router()
const uploadImage = require('../middlewares/upload')
const configuracionPerfilController = require('../controllers/configuracionPerfil.controller')


router.get('/getUser/:usuarioId', configuracionPerfilController.findAllUser)

router.put(
    '/update-perfil/:usuarioId',
    (req, res, next) => {
        req.uploadFolder = "uploads/perfiles";
        next();
    },
    uploadImage.single('image'),
    configuracionPerfilController.perfilUsuario
);

module.exports = router
