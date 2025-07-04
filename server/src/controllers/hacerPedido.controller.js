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

        const cliente = await Clientes.findOne({ where: { id: clienteId } });
        if (!cliente) return res.status(400).json({ message: 'Cliente no existe. Debes registrarlo con todos sus datos primero.' });


        const producto = await Producto.findOne({ where: { Id: productoId } });
        if (!producto) return res.status(400).json({ message: 'Producto no existe. Debes registrarlo con todos sus datos primero.' });


        const total = parseFloat(producto.PrecioProducto) * parseInt(cantidadProducto);


        const nuevoPedido = await Pedido.create({
            clienteId: cliente.id,
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
        const pedidos = await Pedido.findAll({include: [{
                model: Producto,
                attributes: ['NombreProducto'], 
                required: true
            }]});

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
        const clientes = await Clientes.findAll();
        res.status(200).json(clientes);

        console.log('nombres del cliente obtenidos exitosamente')

    } catch (err) {
        res.status(500).json({ err: 'Error al obtener los cleintes' });
    }
}



