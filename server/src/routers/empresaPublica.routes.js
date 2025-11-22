const express = require("express");
const router = express.Router();
const empresaPublicaController = require('../controllers/empresaPublic.controller');


router.get('/empresaPublic/:slug', empresaPublicaController.ObtenerElIndentificadorDeLaEmpresa)


module.exports = router;