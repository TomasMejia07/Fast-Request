// routes/permisos.routes.js
const express = require("express");
const router = express.Router();
const {
    InsertarPermisosIniciales, 
    ListarPermisos
} = require("../controllers/permiso.controller");

router.get("/insertar", InsertarPermisosIniciales); 
router.get("/", ListarPermisos); 

module.exports = router;
