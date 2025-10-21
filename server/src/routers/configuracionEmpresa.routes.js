const express = require('express')
const router = express.Router()
const uploadCloud = require('../middlewares/upload')
const configuracionEmpresaController = require('../controllers/configuracionEmpresa.controller');
const verificarJWT = require('../middlewares/verificarJWT');
const { soloAdmin, soloEmpresa } = require('../middlewares/verificarRoles');

router.get("/", verificarJWT, configuracionEmpresaController.obtenerConfiguracion);
router.put(
  "/:id",
  verificarJWT,
  uploadCloud.single("LogoEmpresa"),
  configuracionEmpresaController.actualizarConfiguracion
);

module.exports = router

