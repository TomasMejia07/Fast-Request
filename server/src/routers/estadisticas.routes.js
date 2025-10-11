const express = require("express");
const router = express.Router();
const estadisticasController = require('../controllers/estadisticas.controller');
const verificarJWT = require('../middlewares/verificarJWT');
const { soloAdmin, soloEmpresa } = require('../middlewares/verificarRoles');

//estadisticas modulo numero 1
router.get('/ingresos-totales', verificarJWT, estadisticasController.ingresosTotales)
router.get('/ventas-totales', verificarJWT, estadisticasController.ventasTotales)
router.get('/nuevos-clientes', verificarJWT, estadisticasController.nuevosClientes)
router.get('/promedio-venta', verificarJWT, estadisticasController.valorPromedioVenta)

//estadisticas modulo numero 2
router.get('/rendimiento-municipio', verificarJWT, estadisticasController.rendimientoPorMunicipio)
router.get('/analisis-ventas', verificarJWT, estadisticasController.ventasPorPeriodo)
router.get('/productos-mas-vendidos', verificarJWT, estadisticasController.productosMasVendidosPorPeriodo)
router.get('/top-clientes', verificarJWT, estadisticasController.analisisClientes)

module.exports = router