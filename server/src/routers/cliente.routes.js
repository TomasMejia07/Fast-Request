const express = require("express");
const router = express.Router();
const clienteController = require('../controllers/cliente.controller');
const verificarJWT = require('../middlewares/verificarJWT');
const { soloAdmin, soloEmpresa } = require('../middlewares/verificarRoles');

router.get("/", verificarJWT, clienteController.VisualizarClientes);
router.post("/", verificarJWT, clienteController.CrearClientes);
router.put("/:id", verificarJWT, clienteController.ActualizarClientes);
router.delete("/:id", verificarJWT, clienteController.EliminarClientes);

module.exports = router