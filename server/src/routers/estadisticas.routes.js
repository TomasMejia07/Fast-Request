
const express = require("express");
const router = express.Router();
const estadisticasController = require('../controllers/estadisticas.controller')

//estadisticas modulo numero 1
router.get('/ingresos-totales', estadisticasController.ingresosTotales)
router.get('/ventas-totales', estadisticasController.ventasTotales)
router.get('/nuevos-clientes', estadisticasController.nuevosClientes)
router.get('/promedio-venta', estadisticasController.valorPromedioVenta)

//estadisticas modulo numero 2
router.get('/rendimiento-municipio', estadisticasController.rendimientoPorMunicipio)
router.get('/analisis-ventas', estadisticasController.ventasPorPeriodo)
router.get('/productos-mas-vendidos', estadisticasController.productosMasVendidosPorPeriodo)


module.exports = router