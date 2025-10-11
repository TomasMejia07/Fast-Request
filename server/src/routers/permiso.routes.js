// routes/permisos.routes.js
const express = require("express");
const router = express.Router();
const {ListarPermisos} = require("../controllers/permiso.controller");
const verificarJWT = require('../middlewares/verificarJWT');
const { soloAdmin, soloEmpresa } = require('../middlewares/verificarRoles');

router.get("/", verificarJWT, ListarPermisos); 

module.exports = router;
