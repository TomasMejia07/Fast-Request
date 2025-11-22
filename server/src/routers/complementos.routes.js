const express = require("express");
const router = express.Router();
const complementosController = require('../controllers/complementos.controller');
const verificarJWT = require('../middlewares/verificarJWT');
const { soloAdmin, soloEmpresa } = require('../middlewares/verificarRoles');


// rutas para Salsas
router.get('/obtener-salsas', verificarJWT, complementosController.findAllSalsas)
router.get('/obtener-salsas-inactivas', verificarJWT, complementosController.visualizarSalsasInactivas)
router.post('/create-salsa', verificarJWT, complementosController.createSalsas)
router.post('/verify-duplicate-salsa', verificarJWT, complementosController.validacionDeNombreSalsa)
router.put('/update-salsa/:id', verificarJWT, complementosController.updateSalsa)
router.put('/update-estado-inactivo-salsa/:id', verificarJWT, complementosController.cambiarEstadoSalsaInactivo)
router.put('/update-estado-activo-salsa/:id', verificarJWT, complementosController.cambioEstadoSalsaActivo)
router.delete('/destroy-salsa/:id', verificarJWT, complementosController.eliminacioDeSalsa)


// rutas para Gaseosas
router.get('/obtener-gaseosas', verificarJWT, complementosController.findAllGaseosas)
router.get('/obtener-gaseosas-inactivas', verificarJWT, complementosController.visualizarGaseosasInactivas)
router.post('/create-gaseosa', verificarJWT, complementosController.createGaseosa)
router.post('/verify-duplicate-gaseosa', verificarJWT, complementosController.validacionDeNombreGaseosa)
router.put('/update-gaseosa/:id', verificarJWT, complementosController.updateGaseosa)
router.put('/update-estado-inactivo-gaseosa/:id', verificarJWT, complementosController.cambiarEstadoGaseosaInactivo)
router.put('/update-estado-activo-gaseosa/:id', verificarJWT, complementosController.cambioEstadoGaseosaActivo)
router.delete('/destroy-gaseosa/:id', verificarJWT, complementosController.eliminacioDeGaseosa)


// rutas publicas
router.get('/salsas', complementosController.findAllSalsasPublicas)
router.get('/gaseosas', complementosController.findAllGaseosasPublicas)


module.exports = router