const express = require('express')
const router = express.Router()
const { uploadEmpresa } = require('../middlewares/upload')
const configuracionEmpresaController = require('../controllers/configuracionEmpresa.controller');
const verificarJWT = require('../middlewares/verificarJWT');
const { soloAdmin, soloEmpresa } = require('../middlewares/verificarRoles');

router.get("/viewEmpresa", verificarJWT, configuracionEmpresaController.obtenerConfiguracion);
router.put(
  "/editData/:empresaId",
  verificarJWT,
  uploadEmpresa.single("image"),
  configuracionEmpresaController.actualizarConfiguracion
);

module.exports = router

