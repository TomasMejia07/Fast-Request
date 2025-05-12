const express = require("express");
const router = express.Router();
const productoController = require("../controllers/producto.controller");

router.get("/", productoController.VisualizarProductos);
router.post("/", productoController.CrearProducto);
router.put("/:id", productoController.ActualizarProducto);
router.delete("/:id", productoController.EliminarProducto);

module.exports = router