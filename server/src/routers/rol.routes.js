const express = require("express");
const router = express.Router();
const rolController = require('../controllers/rol.controller')

router.get("/", rolController.VisualizarRoles);
router.post("/", rolController.CrearRol);
router.put("/:id", rolController.ActualizarRol);
router.delete("/:id", rolController.EliminarRol);

module.exports = router;