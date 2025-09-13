const express = require('express')
const router = express.Router()
const configuracionController = require('../controllers/configuracion.controller')


router.put('/updateData/:id', configuracionController.updateDataConfi)

router.put('/updatePass/:id', configuracionController.updatePassword)

module.exports = router