const express = require("express");
const router = express.Router();
const productoController = require("../controllers/producto.controller");
const verificarJWT = require('../middlewares/verificarJWT');
const { soloAdmin, soloEmpresa } = require('../middlewares/verificarRoles');

// RUTAS CRUD BASE
router.get("/", verificarJWT,productoController.VisualizarProductos);
router.post("/", verificarJWT,productoController.CrearProducto);
router.put("/:id", verificarJWT, productoController.ActualizarProducto);
router.delete("/:id", verificarJWT, productoController.EliminarProducto);

// RUTAS CAMBIO DE ESTADO
router.get("/Productos-inactivos", verificarJWT, productoController.VisualizarProductosInactivos);
router.put("/CambiarInactivo/:id", verificarJWT, productoController.CambiarEstadoProductoInactivo);
router.put("/CambiarActivo/:id", verificarJWT, productoController.CambiarEstadoProductoActivo);


module.exports = router