
const express = require("express");
const router = express.Router();
const categoriaController = require("../controllers/categoria.controller");

router.get("/", categoriaController.VisualizarCategorias);
router.post("/", categoriaController.CrearCategoria);
router.put("/:id", categoriaController.ActualizarCategoria);
router.delete("/:id", categoriaController.EliminarCategoria);

module.exports = router