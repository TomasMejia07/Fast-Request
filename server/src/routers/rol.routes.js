const express = require("express");
const router = express.Router();
const rolController = require('../controllers/rol.controller');
const verificarJWT = require('../middlewares/verificarJWT');
const { soloAdmin, soloEmpresa } = require('../middlewares/verificarRoles');

// RUTAS CRUD BASE
router.get("/", verificarJWT, rolController.VisualizarRoles);
router.post("/", verificarJWT, rolController.CrearRol);
router.put("/:id", verificarJWT, rolController.ActualizarRol);
router.delete("/:id", verificarJWT, rolController.EliminarRol);

// RUTAS CAMBIO DE ESTADO
router.get("/Roles-inactivos", verificarJWT, rolController.VisualizarRolesInactivos);
router.put("/CambiarInactivo/:id", verificarJWT, rolController.CambiarEstadoRolInactivo)
router.put("/CambiarActivo/:id", verificarJWT, rolController.CambiarEstadoRolActivo)


module.exports = router;