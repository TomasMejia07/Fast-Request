const {Producto, Categoria} = require('../models')

exports.VisualizarProductos = async (req, res) => {
    try {
        const productos = await Producto.findAll({
            include: [{
                model: Categoria,
                attributes: ['Id', 'NombreCategoria']
            }]
        });
        res.json(productos);
    } catch (error) {
        console.error('Error al obtener los productos :', error);
        res.status(500).json({ error: 'No se pudo traer los productos.' });
    }
}

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