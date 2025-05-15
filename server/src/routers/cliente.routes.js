const express = require("express");
const router = express.Router();
const clienteController = require('../controllers/cliente.controller')

router.get("/", clienteController.VisualizarClientes);
router.post("/", clienteController.CrearClientes);
router.put("/:id", clienteController.ActualizarClientes);
router.delete("/:id", clienteController.EliminarClientes);

module.exports = router