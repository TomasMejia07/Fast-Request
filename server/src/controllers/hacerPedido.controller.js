const { Pedido, Clientes } = require('../models')

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
            notasAdicionales,
        } = req.body;

        let cliente = await Clientes.findOne({ where: { NombreCliente: nombreCliente } });
        if (!cliente) return res.status(400).json({ message: 'Cliente no existe. Debes registrarlo con todos sus datos primero.' });

        const nuevoPedido = await Pedido.create(
            {
                clienteId: cliente.id,
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
                notasAdicionales,
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


exports.obtenerPedidosConClientes = async (req, res) => {
    try {
        console.log('req.params:', req.params); 
        const { clienteId } = req.params

        if (!clienteId) {
            return res.status(400).json({ error: 'clienteId no proporcionado' });
        }
        const pedidos = await Pedido.findAll({
            where: { clienteId: clienteId },
            include: [{
                model: Clientes,
                attributes: [],
                required: true
            },
        ], 
        
        });

        res.json(pedidos);
    } catch (error) {
        console.error('Error al obtener pedidos con clientes:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};