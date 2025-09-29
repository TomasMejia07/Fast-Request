const express = require('express')
const router = express.Router()
const configuracionController = require('../controllers/configuracion.controller')


router.put('/updateData/:Id', configuracionController.updateDataConfi)

router.put('/updatePass/:Id', configuracionController.updatePassword)

module.exports = router