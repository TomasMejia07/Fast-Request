const express = require("express");
const router = express.Router();
const categoriaController = require("../controllers/categoria.controller");
const verificarJWT = require('../middlewares/verificarJWT');
const { soloAdmin, soloEmpresa } = require('../middlewares/verificarRoles');

// RUTAS DEL CAMBIO DE ESTADO 
router.get("/Categorias-inactivas", verificarJWT, categoriaController.VisualizarCategoriasInactivas);
router.put("/CambiarInactivo/:id", verificarJWT, categoriaController.CambiarEstadoCategoriaInactivo);
router.put("/CambiarActivo/:id", verificarJWT, categoriaController.CambiarEstadoCategoriaActivo);

// RUTAS DEL CRUD BASE
router.get("/", verificarJWT, categoriaController.VisualizarCategorias);
router.post("/", verificarJWT, categoriaController.CrearCategoria);
router.put("/:id", verificarJWT, categoriaController.ActualizarCategoria);
router.delete("/:id", verificarJWT, categoriaController.EliminarCategoria);

// RUTAS PUBLICAS
router.get('/categorias', categoriaController.VisualizarCategoriasPublicas)


module.exports = router
