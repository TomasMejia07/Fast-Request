const { Op, Sequelize } = require('sequelize');
const Pedido = require('../models/hacerPedido');
const Cliente = require('../models/cliente');
const Producto = require('../models/Producto');

/*
     Función auxiliar para obtener el rango de fechas según el período */
const obtenerRangoFechas = (periodo) => {
    const fechaActual = new Date();
    let fechaInicio = new Date(fechaActual);

    switch (periodo) {
        case 'dia':
            fechaInicio.setHours(0, 0, 0, 0);
            break;
        case 'semana':
            const diaSemana = fechaActual.getDay();
            const diasHastaInicio = diaSemana === 0 ? 6 : diaSemana - 1; // Lunes como primer día
            fechaInicio.setDate(fechaActual.getDate() - diasHastaInicio);
            fechaInicio.setHours(0, 0, 0, 0);
            break;
        case 'mes':
            fechaInicio.setDate(1);
            fechaInicio.setHours(0, 0, 0, 0);
            break;
        case 'año':
            fechaInicio.setMonth(0, 1);
            fechaInicio.setHours(0, 0, 0, 0);
            break;
        default:
            return null;
    }

    return {
        fechaInicio,
        fechaFin: fechaActual
    };
};






/*
    Calcula los ingresos totales, opcionalmente filtrados por período,  
    
    explicacion de parametros importantes Sequelize.fn y Sequelize.col: 

    Sequelize.fn: Esta es una función de Sequelize que permite ejecutar funciones SQL directamente en las consultas. En este caso, se utiliza para ejecutar la función SUM.
    Sequelize.col: Esta es otra función de Sequelize que permite referenciar columnas en las consultas. En este caso, se utiliza para referenciar la columna total de la tabla Pedido.

*/
exports.ingresosTotales = async (req, res) => {
    try {

        const { periodo } = req.query;
        let whereCondition = {};

        // Si se especifica un período, filtrar por rango de fechas
        if (periodo) {
            const rangoFechas = obtenerRangoFechas(periodo);
            if (rangoFechas) {
                whereCondition.createdAt = {
                    [Op.between]: [rangoFechas.fechaInicio, rangoFechas.fechaFin]
                };
            }
        }


        const resultado = await Pedido.findOne({
            attributes: [
                [Sequelize.fn('SUM', Sequelize.col('total')), 'ingresoTotal']
            ],
            where: whereCondition
        });

        const ingresoTotal = resultado.getDataValue('ingresoTotal') || 0

        res.status(200).json({ success: true, ingresoTotal: parseFloat(ingresoTotal) })

    } catch (err) {
        console.error('Error al calcular ingresos totales:', err);
        res.status(500).json({ success: false, message: 'Error al calcular ingresos totales', error: err.message })
    }
};





/* Calcula el número total de ventas (pedidos),  opcionalmente filtrado por período*/

exports.ventasTotales = async (req, res) => {
    try {

        const { periodo } = req.query;
        let whereCondition = {};

        // Si se especifica un período, filtrar por rango de fechas
        if (periodo) {
            const rangoFechas = obtenerRangoFechas(periodo);
            if (rangoFechas) {
                whereCondition.createdAt = {
                    [Op.between]: [rangoFechas.fechaInicio, rangoFechas.fechaFin]
                };
            }
        }


        const totalVentas = await Pedido.count()

        res.status(200).json({ success: true, totalVentas })

    } catch (err) {
        console.error('Error al calcular ventas totales:', err);
        res.status(500).json({ success: false, message: 'Error al calcular ventas totales', error: err.message });
    }
};




/*
    Calcula el número de nuevos clientes, opcionalmente filtrado por período

 */
exports.nuevosClientes = async (req, res) => {
    try {

        const { periodo } = req.query;
        let whereCondition = {};

        if (periodo) {
            const rangoFechas = obtenerRangoFechas(periodo);
            if (rangoFechas) {
                whereCondition.createdAt = {
                    [Op.between]: [rangoFechas.fechaInicio, rangoFechas.fechaFin]
                };
            }
        }

        const totalNuevosClientes = await Cliente.count({
            where: whereCondition
        });

        res.status(200).json({ success: true, totalNuevosClientes })

    } catch (err) {
        console.error('Error al calcular nuevos clientes:', err);
        res.status(500).json({ success: false, message: 'Error al calcular nuevos clientes', error: err.message })
    }
};




/*
    Calcula el valor promedio de venta, opcionalmente filtrado por período
  */

exports.valorPromedioVenta = async (req, res) => {
    try {
        const { periodo } = req.query;
        let whereCondition = {};

        // Si se especifica un período, filtrar por rango de fechas
        if (periodo) {
            const rangoFechas = obtenerRangoFechas(periodo);
            if (rangoFechas) {
                whereCondition.createdAt = {
                    [Op.between]: [rangoFechas.fechaInicio, rangoFechas.fechaFin]
                };
            }
        }

        const resultado = await Pedido.findOne({
            attributes: [
                [Sequelize.fn('AVG', Sequelize.col('total')), 'promedioVenta']
            ],
            where: whereCondition
        });


        const promedioVenta = resultado.getDataValue('promedioVenta') || 0;

        res.status(200).json({ success: true, promedioVenta: parseFloat(promedioVenta) });

    } catch (err) {
        console.error('Error al calcular valor promedio de venta:', err);
        res.status(500).json({ success: false, message: 'Error al calcular valor promedio de venta', error: err.message });
    }
};





/**
 * Obtiene las ventas por un rango de fechas específico 

 */
exports.ventasPorPeriodo = async (req, res) => {
    try {

        const { periodo } = req.query;
        let whereCondition = {};

        // Si se especifica un período, filtrar por rango de fechas
        if (periodo) {
            const rangoFechas = obtenerRangoFechas(periodo);
            if (rangoFechas) {
                whereCondition.createdAt = {
                    [Op.between]: [rangoFechas.fechaInicio, rangoFechas.fechaFin]
                };
            }
        }

        const ventas = await Pedido.findAll({
            attributes: [
                [Sequelize.fn('DATE', Sequelize.col('createdAt')), 'fecha'],
                [Sequelize.fn('COUNT', Sequelize.col('id')), 'cantidad'],
                [Sequelize.fn('SUM', Sequelize.col('total')), 'totalVentas']
            ],
            where: whereCondition,
            group: [Sequelize.fn('DATE', Sequelize.col('createdAt'))],
            order: [[Sequelize.fn('DATE', Sequelize.col('createdAt')), 'ASC']]
        });

        const resultados = ventas.map(venta => ({
            fecha: venta.getDataValue('fecha'),
            cantidad: parseInt(venta.getDataValue('cantidad')),
            totalVentas: parseFloat(venta.getDataValue('totalVentas'))
        }));

        res.status(200).json({ success: true, analisisVentas: resultados });

    } catch (err) {
        console.error('Error al obtener ventas por período:', err);
        res.status(500).json({ success: false, message: 'Error al obtener ventas por período', error: err.message });
    }
}


/*
    Obtiene análisis de clientes (top 10 por frecuencia y gasto)

 */
exports.analisisClientes = async (req, res) => {
    try {
        const { periodo } = req.query;
        let whereCondition = {};

        // Si se especifica un período, filtrar por rango de fechas
        if (periodo) {
            const rangoFechas = obtenerRangoFechas(periodo);
            if (rangoFechas) {
                whereCondition.createdAt = {
                    [Op.between]: [rangoFechas.fechaInicio, rangoFechas.fechaFin]
                };
            }
        }

        const clientesTop = await Pedido.findAll({
            attributes: [
                'clienteId',
                [Sequelize.fn('COUNT', Sequelize.col('Pedido.id')), 'cantidadPedidos'],
                [Sequelize.fn('SUM', Sequelize.col('Pedido.total')), 'gastoTotal']
            ],
            where: whereCondition,
            include: [{
                model: Cliente.unscoped(),
                attributes: ['NombreCliente', 'NumeroContacto', 'CorreoElectronico']
            }],
            group: ['clienteId', 'cliente.id'],
            order: [[Sequelize.fn('COUNT', Sequelize.col('Pedido.id')), 'DESC']],
            limit: 10
        });

        // Formatear resultados
        const resultados = clientesTop.map(cliente => ({
            clienteId: cliente.clienteId,
            nombreCliente: cliente.cliente ? cliente.cliente.NombreCliente : 'Cliente no encontrado',
            numeroContacto: cliente.cliente ? cliente.cliente.NumeroContacto : 'N/A',
            correoElectronico: cliente.cliente ? cliente.cliente.CorreoElectronico : 'N/A',
            cantidadPedidos: parseInt(cliente.getDataValue('cantidadPedidos')),
            gastoTotal: parseFloat(cliente.getDataValue('gastoTotal'))
        }));

        res.status(200).json({ success: true, clientesTop: resultados });
    } catch (error) {
        console.error('Error al obtener análisis de clientes:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener análisis de clientes',
            error: error.message
        });
    }
};






/*
    Obtiene los productos más vendidos por periodo

 */
exports.productosMasVendidosPorPeriodo = async (req, res) => {
    try {
        const { periodo } = req.query;
        let whereCondition = {};

        // Si se especifica un período, filtrar por rango de fechas
        if (periodo) {
            const rangoFechas = obtenerRangoFechas(periodo);
            if (rangoFechas) {
                whereCondition.createdAt = {
                    [Op.between]: [rangoFechas.fechaInicio, rangoFechas.fechaFin]
                };
            }
        }

        const productosMasVendidos = await Pedido.findAll({
            attributes: [
                'productoId',
                [Sequelize.fn('SUM', Sequelize.col('cantidadProducto')), 'cantidadVendida'],
                [Sequelize.fn('SUM', Sequelize.col('total')), 'ventaTotal']
            ],
            where: whereCondition,
            include: [{
                model: Producto,
                attributes: ['NombreProducto', 'PrecioProducto']
            }],
            group: ['productoId', 'Producto.id'],
            order: [[Sequelize.fn('SUM', Sequelize.col('cantidadProducto')), 'DESC']],
            limit: 10
        });

        const resultados = productosMasVendidos.map(producto => ({
            productoId: producto.productoId,
            nombreProducto: producto.Producto ? producto.Producto.NombreProducto : 'Producto no encontrado',
            precioUnitario: producto.Producto ? parseFloat(producto.Producto.PrecioProducto) : 0,
            cantidadVendida: parseInt(producto.getDataValue('cantidadVendida')),
            ventaTotal: parseFloat(producto.getDataValue('ventaTotal'))
        }));

        res.status(200).json({ success: true, productosMasVendidos: resultados });

    } catch (err) {
        console.error('Error al obtener productos más vendidos por período:', err);
        res.status(500).json({ success: false, message: 'Error al obtener productos más vendidos por período', error: err.message });
    }
};







/*
    Obtiene el rendimiento por municipio/localidad
 */
exports.rendimientoPorMunicipio = async (req, res) => {
    try {
        const { periodo } = req.query;
        let whereCondition = {};

        // Si se especifica un período, filtrar por rango de fechas
        if (periodo) {
            const rangoFechas = obtenerRangoFechas(periodo);
            if (rangoFechas) {
                whereCondition.createdAt = {
                    [Op.between]: [rangoFechas.fechaInicio, rangoFechas.fechaFin]
                };
            }
        }

        const rendimientoMunicipios = await Pedido.findAll({
            attributes: [
                'municipioLocalidad',
                [Sequelize.fn('COUNT', Sequelize.col('id')), 'cantidadPedidos'],
                [Sequelize.fn('SUM', Sequelize.col('total')), 'ventaTotal']
            ],
            where: whereCondition,
            group: ['municipioLocalidad'],
            order: [[Sequelize.fn('SUM', Sequelize.col('total')), 'DESC']]
        });

        // Formatear resultados
        const resultados = rendimientoMunicipios.map(municipio => ({
            municipio: municipio.municipioLocalidad || 'No especificado',
            cantidadPedidos: parseInt(municipio.getDataValue('cantidadPedidos')),
            ventaTotal: parseFloat(municipio.getDataValue('ventaTotal'))
        }));

        res.status(200).json({ success: true, rendimientoMunicipios: resultados });

    } catch (err) {
        console.error('Error al obtener rendimiento por municipio:', err);
        res.status(500).json({ success: false, message: 'Error al obtener rendimiento por municipio', error: err.message });
    }
};
