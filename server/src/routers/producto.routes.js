const express = require("express");
const router = express.Router();
const productoController = require("../controllers/producto.controller");
const verificarJWT = require('../middlewares/verificarJWT');
const { soloAdmin, soloEmpresa } = require('../middlewares/verificarRoles');

router.get("/", verificarJWT,productoController.VisualizarProductos);
router.post("/", verificarJWT,productoController.CrearProducto);
router.put("/:id", verificarJWT, productoController.ActualizarProducto);
router.delete("/:id", verificarJWT, productoController.EliminarProducto);

module.exports = router