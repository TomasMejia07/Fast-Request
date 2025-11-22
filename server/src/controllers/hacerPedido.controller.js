const { Pedido, Clientes, Producto, Salsas, Gaseosas } = require('../models');

exports.nuevoPedido = async (req, res) => {
    try {
        const EmpresaId = req.user.empresaId;

        if (!EmpresaId) {
            return res.status(400).json({ error: "empresaId es requerido" });
        }

        const {
            clienteId,
            productoId,
            cantidadProducto,
            municipioLocalidad,
            direccion,
            puntoDeReferencia,
            deseaSalsas,
            tipos_salsas,   // se espera array de IDs
            deseaGaseosa,
            tipos_gaseosas,  // se espera array de IDs
            notasAdicionales,
        } = req.body;

        // Validar cliente
        const cliente = await Clientes.findOne({ where: { Id: clienteId } });
        if (!cliente)
            return res.status(400).json({ message: 'Cliente no existe. Debes registrarlo con todos sus datos primero.' });
        if (cliente.EstadoCliente === 'inactivo') {
            return res.status(400).json({ message: 'No se pueden crear pedidos para clientes inactivos.' });
        }

        // Validar producto
        const producto = await Producto.findOne({ where: { id: productoId } });
        if (!producto)
            return res.status(400).json({ message: 'Producto no existe. Debes registrarlo con todos sus datos primero.' });

        // Calcular total
        const total = parseFloat(producto.PrecioProducto) * parseInt(cantidadProducto);

        // Crear pedido
        const nuevoPedido = await Pedido.create({
            clienteId: cliente.Id,
            productoId: producto.Id,
            cantidadProducto,
            municipioLocalidad,
            direccion,
            puntoDeReferencia,
            deseaSalsas,
            tipos_salsas,   // Guardar array directamente
            deseaGaseosa,
            tipos_gaseosas,  // Guardar array directamente
            notasAdicionales,
            total,
            estadoDelPedido: 'En proceso',
            EmpresaId
        });

        // Cargar pedido creado con relaciones necesarias para frontend
        const pedidoConDetalles = await Pedido.findOne({
            where: { id: nuevoPedido.id },
            include: [
                { model: Clientes, attributes: ['NombreCliente'] },
                { model: Producto, attributes: ['NombreProducto', 'PrecioProducto'] },
            ]
        });

        console.log('Pedido creado con producto:', pedidoConDetalles);
        return res.status(201).json(pedidoConDetalles);

    } catch (err) {
        console.error('Error al crear el pedido:', err);
        return res.status(500).json({ err: 'No se pudo crear el pedido.' });
    }
};

exports.seleccionarPedidos = async (req, res) => {
    try {
        const EmpresaId = req.user.empresaId;

        if (!EmpresaId) {
            return res.status(400).json({ error: "empresaId es requerido" });
        }

        const pedidos = await Pedido.findAll({
            where: { EmpresaId: EmpresaId },
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
};

exports.obtenerPedidosConClientes = async (req, res) => {
    try {
        const EmpresaId = req.user.empresaId;

        if (!EmpresaId) {
            return res.status(400).json({ error: "empresaId es requerido" });
        }

        const { clienteId } = req.params;

        if (!clienteId) {
            return res.status(400).json({ error: 'clienteId no proporcionado' });
        }

        const pedidos = await Pedido.findAll({
            where: { clienteId, EmpresaId: EmpresaId },
            include: [
                {
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
        const EmpresaId = req.user.empresaId;

        if (!EmpresaId) {
            return res.status(400).json({ error: "empresaId es requerido" });
        }

        const productos = await Producto.findAll({
            where: { EmpresaId: EmpresaId }
        });
        res.status(200).json(productos);
        console.log('Nombres del producto obtenidos exitosamente');
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos' });
    }
};

exports.obtenerNombresClientes = async (req, res) => {
    try {
        const EmpresaId = req.user.empresaId;

        if (!EmpresaId) {
            return res.status(400).json({ error: "empresaId es requerido" });
        }

        const clientes = await Clientes.findAll({
            where: { EstadoCliente: 'activo', EmpresaId: EmpresaId },
        });
        res.status(200).json(clientes);
        console.log('Nombres del cliente obtenidos exitosamente');
    } catch (err) {
        res.status(500).json({ err: 'Error al obtener los clientes' });
    }
};

exports.ObtenerPedidoCompleto = async (req, res) => {
    try {
        const EmpresaId = req.user.empresaId;

        if (!EmpresaId) {
            return res.status(400).json({ error: "empresaId es requerido" });
        }

        const { id } = req.params;

        const pedido = await Pedido.findOne(id, {
            where: { EmpresaId: EmpresaId },
            include: [
                {
                    model: Clientes.unscoped(),
                    attributes: ['NombreCliente', 'EstadoCliente'],
                    required: true
                },
                {
                    model: Producto,
                    attributes: ['NombreProducto', 'PrecioProducto'],
                    required: true
                }
            ],
        });

        if (!pedido) return res.status(404).json({ message: 'Pedido no realizado. Debes realizarlo primero.' });

        console.log('Datos del pedido obtenidos de manera correcta');
        res.status(200).json({ message: 'Datos del pedido obtenidos de manera correcta', data: pedido });

    } catch (err) {
        console.error('Error al obtener el pedido:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

exports.obtenerNombresSalsas = async (req, res) => {
    try {
        const EmpresaId = req.user.empresaId;

        if (!EmpresaId) {
            return res.status(400).json({ error: "empresaId es requerido" });
        }

        const salsas = await Salsas.findAll({
            where: { estadoSalsa: 'activo', EmpresaId: EmpresaId },
        });
        res.status(200).json(salsas);
        console.log('Nombres de las salsas obtenidas exitosamente');
    } catch (err) {
        res.status(500).json({ err: 'Error al obtener las salsas' });
    }
};

exports.obtenerNombresGaseosas = async (req, res) => {
    try {
        const EmpresaId = req.user.empresaId;

        if (!EmpresaId) {
            return res.status(400).json({ error: "empresaId es requerido" });
        }

        const gaseosas = await Gaseosas.findAll({
            where: { estadoGaseosa: 'activo', EmpresaId: EmpresaId },
        });
        res.status(200).json(gaseosas);
        console.log('Nombres de las gaseosas obtenidas exitosamente');
    } catch (err) {
        res.status(500).json({ err: 'Error al obtener las gaseosas' });
    }
};

// Cambiar estado de un pedido
exports.cambiarEstadoPedido = async (req, res) => {
    try {
        const EmpresaId = req.user.empresaId;

        if (!EmpresaId) {
            return res.status(400).json({ error: "empresaId es requerido" });
        }

        const { id } = req.params;
        const { nuevoEstado } = req.body;

        if (!id || !nuevoEstado) {
            return res.status(400).json({ message: 'El ID y el nuevo estado son obligatorios.' });
        }

        const ESTADOS_VALIDOS = ['En espera', 'En proceso', 'terminado'];
        if (!ESTADOS_VALIDOS.includes(nuevoEstado)) {
            return res.status(400).json({
                message: `Estado inválido. Estados permitidos: ${ESTADOS_VALIDOS.join(', ')}`
            });
        }

        const pedido = await Pedido.findByPk(id);
        if (!pedido) {
            return res.status(404).json({ message: 'Pedido no encontrado.' });
        }

        if (pedido.EmpresaId !== EmpresaId) {
            return res.status(403).json({ message: "No autorizado" });
        }

        await pedido.update({ estadoDelPedido: nuevoEstado });

        console.log(`Estado del pedido ${id} actualizado a ${nuevoEstado}`);
        return res.status(200).json({
            message: 'Estado del pedido actualizado correctamente.',
            data: pedido
        });

    } catch (error) {
        console.error('Error al cambiar el estado del pedido:', error);
        res.status(500).json({ message: 'Error interno del servidor', error });
    }
};

exports.obtenerPedidosEnCocina = async (req, res) => {
    try {

        const EmpresaId = req.user.empresaId;

        if (!EmpresaId) {
            return res.status(400).json({ error: "empresaId es requerido" });
        }

        const pedidosEnCocina = await Pedido.findAll({
            where: { estadoDelPedido: 'En proceso', EmpresaId: EmpresaId },
            include: [
                {
                    model: Clientes.unscoped(),
                    attributes: ['NombreCliente', 'EstadoCliente'],
                },
                {
                    model: Producto,
                    attributes: ['NombreProducto', 'PrecioProducto'],
                },
            ],
        });

        // Procesar cada pedido para incluir nombres de salsas y gaseosas
        const pedidosConDetalles = await Promise.all(
            pedidosEnCocina.map(async (pedido) => {
                let salsas = [];
                let gaseosas = [];

                // ✅ Parsear los campos JSON (por si vienen como texto)
                const tiposSalsas = Array.isArray(pedido.tipos_salsas)
                    ? pedido.tipos_salsas
                    : JSON.parse(pedido.tipos_salsas || "[]");

                const tiposGaseosas = Array.isArray(pedido.tipos_gaseosas)
                    ? pedido.tipos_gaseosas
                    : JSON.parse(pedido.tipos_gaseosas || "[]");

                // ✅ Buscar por nombre, no por ID
                if (Array.isArray(tiposSalsas) && tiposSalsas.length > 0) {
                    salsas = await Salsas.findAll({
                        where: { nombreSalsa: tiposSalsas },
                        attributes: ['id', 'nombreSalsa'],
                    });
                }

                if (Array.isArray(tiposGaseosas) && tiposGaseosas.length > 0) {
                    gaseosas = await Gaseosas.findAll({
                        where: { nombreGaseosa: tiposGaseosas },
                        attributes: ['id', 'nombreGaseosa'],
                    });
                }

                // ✅ Devolver pedido con nombres de salsas y gaseosas incluidos
                return {
                    ...pedido.toJSON(),
                    salsas,
                    gaseosas,
                };
            })
        );

        res.status(200).json(pedidosConDetalles);
    } catch (error) {
        console.error('Error al obtener pedidos en cocina:', error);
        res.status(500).json({ error: 'Error al obtener pedidos en cocina.' });
    }

};


