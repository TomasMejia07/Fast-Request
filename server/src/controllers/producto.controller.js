const {Producto, Categoria} = require('../models')

// METODO PARA TRAER TODOS LOS PRODUCTOS ACTIVOS
exports.VisualizarProductos = async (req, res) => {
    try {
        const productos = await Producto.findAll({
            where: {
                EstadoProducto: 'activo'
            },
            include: [{
                model: Categoria,
                attributes: ['id', 'NombreCategoria']
            }]
        });
        res.json(productos);
    } catch (error) {
        console.error('Error al obtener los productos :', error);
        res.status(500).json({ error: 'No se pudo traer los productos.' });
    }
}

// METODO PARA TRAER LOS PRODUCTOS INACTIVOS
exports.VisualizarProductosInactivos = async (req, res) => {
    try {
        const productos = await Producto.scope('soloProductosInactivos').findAll({
            include: [{
                model: Categoria,
                attributes: ['id', 'NombreCategoria']
            }]
        })
        res.status(200).json(productos)
        console.log('Productos obtenidos correctamente')
    } catch (error) {
        console.error('Error al obtener los productos: ', error);
        res.status(500).json({ error: 'Error al obtener los productos'})
    }
}

// CREAR PRODUCTO
exports.CrearProducto = async (req, res) => {
    try {
        const {NombreProducto, IdCategoria, PrecioProducto, DescripcionProducto, EstadoProducto} = req.body
        const NuevoProducto = await Producto.create({
            NombreProducto, 
            IdCategoria, 
            PrecioProducto,
            DescripcionProducto, 
            EstadoProducto
        })
        res.status(201).json(NuevoProducto);
    } catch (error) {
        console.error("Error al crear producto:", error);
        res.status(500).json({ message: "Error al crear producto." });
    }
}

// ACTUALIZAR PRODUCTO
exports.ActualizarProducto = async (req, res) => {
    try {
        const {id} = req.params
        const {NombreProducto, IdCategoria, PrecioProducto, DescripcionProducto, EstadoProducto} = req.body
        const producto = await Producto.findByPk(id)
        if (!producto) return res.status(404).json({ message: "Producto no encontrado." });

        await producto.update({
            NombreProducto, 
            IdCategoria, 
            PrecioProducto,
            DescripcionProducto, 
            EstadoProducto
        })
        res.json(producto)
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        res.status(500).json({ message: "Error al actualizar producto." });
    }
}

// ELIMINACION DEL PRODUCTO
exports.EliminarProducto = async (req, res) => {
    try{
    const {id} = req.params
    const producto = await Producto.findByPk(id)
    if (!producto) return res.status(404).json({ message: "Producto no encontrado." });

    await producto.destroy()
    res.json({message: "Producto eliminado correctamente"})
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        res.status(500).json({ message: "Error al eliminar producto." });
    }
}

// CAMBIAR ESTADO A INACTIVO
exports.CambiarEstadoProductoInactivo = async (req,res) => {
    try {
        const { id } = req.params
        if (!id ){
            return res.status(400).json({
                message: 'El id es obligatorio'
            })
        }

        const producto = await Producto.unscoped().findByPk(id)

        if (!producto) return res.status(400).json({
            message: 'Producto no encontrado'
        })

        await producto.update({
            EstadoProducto: 'inactivo'
        })

        console.log('Cambio de estado en el producto aplicado correctamente')
        res.status(200).json({
            message: 'Cambio de estado en el producto aplicado correctamente'
        })
    } catch (error) {
        console.log('Error al cambiar el estado del producto', error)
        res.status(500).json({
            message: 'Error interno del servidor', error: error
        })
    }
}

// CAMBIAR ESTADO DE PRODUCTO ACTIVO
exports.CambiarEstadoProductoActivo = async (req, res) => {
    try {
        const { id } = req.params
        if (!id ){
            return res.status(400).json({
                message: 'El id es obligatorio'
            })
        }

        const producto = await Producto.unscoped().findByPk(id)

        if (!producto) return res.status(400).json({
            message: 'Producto no encontrado'
        })

        await producto.update({
            EstadoProducto: 'activo'
        })

        console.log('Cambio de estado en el producto aplicado correctamente')
        res.status(200).json({
            message: 'Cambio de estado en el producto aplicado correctamente'
        })
    } catch (error) {
        console.log('Error al cambiar el estado del producto', error)
        res.status(500).json({
            message: 'Error interno del servidor', error: error
        })
    }
}