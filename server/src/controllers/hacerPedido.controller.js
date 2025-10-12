const { Pedido, Clientes, Producto } = require('../models')

exports.nuevoPedido = async (req, res) => {
    try {
        const {
            clienteId,
            productoId,
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

        const cliente = await Clientes.findOne({ where: { Id: clienteId } });
        if (!cliente) return res.status(400).json({ message: 'Cliente no existe. Debes registrarlo con todos sus datos primero.' });


        if (cliente.EstadoCliente === 'inactivo') {
            return res.status(400).json({
                mensaje: 'No se pueden crear pedidos para clientes con estado \"inactivo\" '
            });
        }

        const producto = await Producto.findOne({ where: { id: productoId } });
        if (!producto) return res.status(400).json({ message: 'Producto no existe. Debes registrarlo con todos sus datos primero.' });


        const total = parseFloat(producto.PrecioProducto) * parseInt(cantidadProducto);


        const nuevoPedido = await Pedido.create({
            clienteId: cliente.Id,
            productoId: producto.Id,
            cantidadProducto,
            municipioLocalidad,
            direccion,
            puntoDeReferencia,
            deseaSalsas,
            tipos_salsas,
            deseaGaseosa,
            tipos_gaseosas,
            notasAdicionales,
            total
        });

        const pedidoConProducto = await Pedido.findOne({
            where: { id: nuevoPedido.id },
            include: {
                model: Producto,
                attributes: ['NombreProducto', 'PrecioProducto'],
            }
        });

        console.log('Pedido creado con producto:', pedidoConProducto);
        res.status(201).json(pedidoConProducto);

    } catch (err) {
        console.error('Error al crear el pedido:', err);
        res.status(500).json({ err: 'No se pudo crear el pedido.' });
    }
};

exports.seleccionarPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.findAll({
            include: [{
                model: Producto,
                attributes: ['NombreProducto'],
                required: true
            }]
        });

        res.status(201).json(pedidos);
    } catch (error) {
        console.error('Error al seleccionar pedidos:', error);
        res.status(500).json({ error: 'No se pudo traer los pedidos.' });
    }
}

// controlador para visualizar todos los predidos realizados por un cliente
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
            {
                model: Producto,
                attributes: ['NombreProducto', 'PrecioProducto'],
                required: true
            }
            ],

        });

        res.json(pedidos);
    } catch (error) {
        console.error('Error al obtener pedidos con clientes:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


exports.obtenerNombresProductos = async (req, res) => {
    try {
        const productos = await Producto.findAll();
        res.status(200).json(productos);

        console.log('nombres del producto obtenidos exitosamente')
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos' });
    }
}


exports.obtenerNombresClientes = async (req, res) => {
    try {
        const clientes = await Clientes.findAll({
            where: {
                EstadoCliente: 'activo'
            },
        });
        res.status(200).json(clientes);

        console.log('nombres del cliente obtenidos exitosamente')

    } catch (err) {
        res.status(500).json({ err: 'Error al obtener los cleintes' });
    }
}


exports.ObtenerPedidoCompleto = async (req, res) => {
    try {
        const { id } = req.params

        const pedido = await Pedido.findByPk(id, {
            include: [{
                model: Clientes.unscoped(),
                attributes: ['NombreCliente', 'EstadoCliente'],
                required: true
            },{
                model: Producto,
                attributes: ['NombreProducto', 'PrecioProducto'],
                required: true
            }],
            
        })

        if(!pedido) return res.status(404).json({ message: 'Pedido no realizado. Debes realizarlo primero.' })

        console.log('Datos del pedido obtenidos de manera correcta')
        res.status(200).json({ message: 'Datos del pedido obtenidos de manera correcta', data: pedido })

    } catch (err) {
        console.error('Error al obtener el pedido:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}



