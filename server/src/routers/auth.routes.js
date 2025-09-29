const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/registro', authController.registrarAdmin);
router.post('/login', authController.loginUsuario);

module.exports = router;
