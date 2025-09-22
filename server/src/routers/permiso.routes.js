// routes/permisos.routes.js
const express = require("express");
const router = express.Router();
const {ListarPermisos} = require("../controllers/permiso.controller");

router.get("/", ListarPermisos); 

module.exports = router;
