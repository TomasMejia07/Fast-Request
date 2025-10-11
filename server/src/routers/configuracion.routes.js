const express = require('express')
const router = express.Router()
const configuracionController = require('../controllers/configuracion.controller');
const verificarJWT = require('../middlewares/verificarJWT');
const { soloAdmin, soloEmpresa } = require('../middlewares/verificarRoles');


router.put('/updateData/:Id', verificarJWT, configuracionController.updateDataConfi)
router.put('/updatePass/:Id', verificarJWT, configuracionController.updatePassword)

module.exports = router