
const { Pedido }= require('../models')

exports.nuevoPedido = async (req, res) => {
    try {
        const {
                nombreCliente,
                tipoProducto,
                cantidadProducto,
                municipioLocalidad,
                direccion,
                puntoDeReferencia,
                deseaSalsas,
                tipos_salsas,
                deseaGaseosa,
                tipos_gaseosas,
                notasAdicionales
            } = req.body;

        const nuevoPedido = await Pedido.create(
        {
            nombreCliente,
            tipoProducto,
            cantidadProducto,
            municipioLocalidad,
            direccion,
            puntoDeReferencia,
            deseaSalsas,
            tipos_salsas,
            deseaGaseosa,
            tipos_gaseosas,
            notasAdicionales
        });

        console.log('Pedido creado:', nuevoPedido);
        res.status(201).json(nuevoPedido);

    } catch (err) {
        console.error('Error al crear el pedido:', err);
        res.status(500).json({ err: 'No se pudo crear el pedido.' });

    }
}

exports.seleccionarPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.findAll();

        res.status(201).json(pedidos);
    } catch (error) {
        console.error('Error al seleccionar pedidos:', error);
        res.status(500).json({ error: 'No se pudo traer los pedidos.' });
    }
}