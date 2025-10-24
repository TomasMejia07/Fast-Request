const express = require("express");
const router = express.Router();
const clienteController = require('../controllers/cliente.controller');
const verificarJWT = require('../middlewares/verificarJWT');
const { soloAdmin, soloEmpresa } = require('../middlewares/verificarRoles');

router.get("/", verificarJWT, clienteController.VisualizarClientes);
router.get("/inactivos", verificarJWT, clienteController.VisualizarClientesInactivos);
router.post("/", verificarJWT, clienteController.CrearClientes);
router.post('/verify-duplicate', verificarJWT,clienteController.validacionDeCampos)
//router.put("/:id", verificarJWT, clienteController.ActualizarClientes); ❌Cancelado Perra❌
router.put("/inactivo/:id", verificarJWT, clienteController.CambioEstadoInactivoClientes);
router.put("/activo/:id", verificarJWT, clienteController.CambioEstadoActivoClientes);

module.exports = router