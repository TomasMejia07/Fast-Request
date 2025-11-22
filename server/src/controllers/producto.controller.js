const { Producto, Categoria, Empresa } = require('../models')

// METODO PARA TRAER TODOS LOS PRODUCTOS ACTIVOS
exports.VisualizarProductos = async (req, res) => {
    try {

        const EmpresaId = req.user.empresaId;

        if (!EmpresaId) {
            return res.status(400).json({ error: "empresaId es requerido" });
        }

        const productos = await Producto.findAll({
            where: {
                EstadoProducto: 'activo',
                EmpresaId: EmpresaId
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

// METODO PARA TRAER TODOS LOS PRODUCTOS ACTIVOS PERO SOLO DATOS PUBLICOS
exports.VisualizarProductosPublicos = async (req, res) => {
    try {

        const { empresaId } = req.query

        if (!empresaId) {
            return res.status(400).json({ error: "empresaId es requerido" });
        }

        const empresa = await Empresa.findByPk(empresaId);

        if (!empresa || empresa.Estado !== "Activo") {
            return res.status(404).json({ error: "Empresa no encontrada o inactiva" });
        }

        const productos = await Producto.findAll({
            where: {
                EstadoProducto: 'activo',
                EmpresaId: empresaId
            },
            attributes: ['id', 'NombreProducto', 'PrecioProducto', 'DescripcionProducto', 'IdCategoria'],
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
        const EmpresaId = req.user.empresaId;

        if (!EmpresaId) {
            return res.status(400).json({ error: "empresaId es requerido" });
        }

        const productos = await Producto.scope('soloProductosInactivos').findAll({
            where: { EmpresaId: EmpresaId },
            include: [{
                model: Categoria,
                attributes: ['id', 'NombreCategoria']
            }]
        })
        res.status(200).json(productos)
        console.log('Productos obtenidos correctamente')
    } catch (error) {
        console.error('Error al obtener los productos: ', error);
        res.status(500).json({ error: 'Error al obtener los productos' })
    }
}

// CREAR PRODUCTO
exports.CrearProducto = async (req, res) => {
    try {
        const EmpresaId = req.user.empresaId;
        if (!EmpresaId) {
            return res.status(400).json({ error: "empresaId es requerido" });
        }

        const { NombreProducto, IdCategoria, PrecioProducto, DescripcionProducto, EstadoProducto } = req.body
        const NuevoProducto = await Producto.create({
            NombreProducto,
            IdCategoria,
            PrecioProducto,
            DescripcionProducto,
            EstadoProducto,
            EmpresaId
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
        const EmpresaId = req.user.empresaId;
        if (!EmpresaId) {
            return res.status(400).json({ error: "empresaId es requerido" });
        }

        const { id } = req.params
        const { NombreProducto, IdCategoria, PrecioProducto, DescripcionProducto, EstadoProducto } = req.body
        const producto = await Producto.findByPk(id)
        if (!producto) return res.status(404).json({ message: "Producto no encontrado." });

        if (producto.EmpresaId !== EmpresaId) {
            return res.status(403).json({ message: "No autorizado" });
        }

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
    try {
        const EmpresaId = req.user.empresaId;
        if (!EmpresaId) {
            return res.status(400).json({ error: "empresaId es requerido" });
        }

        const { id } = req.params
        const producto = await Producto.findByPk(id)
        if (!producto) return res.status(404).json({ message: "Producto no encontrado." });

        if (producto.EmpresaId !== EmpresaId) {
            return res.status(403).json({ message: "No autorizado" });
        }

        await producto.destroy()
        res.json({ message: "Producto eliminado correctamente" })
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        res.status(500).json({ message: "Error al eliminar producto." });
    }
}

// CAMBIAR ESTADO A INACTIVO
exports.CambiarEstadoProductoInactivo = async (req, res) => {
    try {
        const EmpresaId = req.user.empresaId;
        if (!EmpresaId) {
            return res.status(400).json({ error: "empresaId es requerido" });
        }

        const { id } = req.params
        if (!id) {
            return res.status(400).json({
                message: 'El id es obligatorio'
            })
        }

        const producto = await Producto.unscoped().findByPk(id)

        if (!producto) return res.status(400).json({
            message: 'Producto no encontrado'
        })

        if (producto.EmpresaId !== EmpresaId) {
            return res.status(403).json({ message: "No autorizado" });
        }

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
        const EmpresaId = req.user.empresaId;
        if (!EmpresaId) {
            return res.status(400).json({ error: "empresaId es requerido" });
        }

        const { id } = req.params
        if (!id) {
            return res.status(400).json({
                message: 'El id es obligatorio'
            })
        }

        const producto = await Producto.unscoped().findByPk(id)

        if (!producto) return res.status(400).json({
            message: 'Producto no encontrado'
        })

        if (producto.EmpresaId !== EmpresaId) {
            return res.status(403).json({ message: "No autorizado" });
        }

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