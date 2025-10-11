const express = require("express");
const router = express.Router();
const rolController = require('../controllers/rol.controller');
const verificarJWT = require('../middlewares/verificarJWT');
const { soloAdmin, soloEmpresa } = require('../middlewares/verificarRoles');

router.get("/", verificarJWT, rolController.VisualizarRoles);
router.post("/", verificarJWT, rolController.CrearRol);
router.put("/:id", verificarJWT, rolController.ActualizarRol);
router.delete("/:id", verificarJWT, rolController.EliminarRol);

module.exports = router;