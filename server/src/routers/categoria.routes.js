const express = require("express");
const router = express.Router();
const categoriaController = require("../controllers/categoria.controller");
const verificarJWT = require('../middlewares/verificarJWT');
const { soloAdmin, soloEmpresa } = require('../middlewares/verificarRoles');

router.get("/", verificarJWT, categoriaController.VisualizarCategorias);
router.post("/", verificarJWT, categoriaController.CrearCategoria);
router.put("/:id", verificarJWT, categoriaController.ActualizarCategoria);
router.delete("/:id", verificarJWT, categoriaController.EliminarCategoria);

module.exports = router