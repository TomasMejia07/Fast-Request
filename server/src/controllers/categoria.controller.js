const { Categoria, Empresa } = require('../models')



// METODO PARA TRAER TODAS LAS CATEGORIAS CON ESTADO ACTIVO
exports.VisualizarCategorias = async (req, res) => {
    try {
        const EmpresaId = req.user.empresaId;

        if (!EmpresaId) {
            return res.status(400).json({ error: "empresaId es requerido" });
        }

        const categorias = await Categoria.findAll({
            where: {
                EstadoCategoria: 'activo',
                EmpresaId: EmpresaId
            }
        });
        res.json(categorias)
    }
    catch (error) {
        console.error('Error al obtener las Categorias :', error);
        res.status(500).json({ error: 'No se pudo traer las Categorias.' });
    }
};

// METODO PARA TRAER TODAS LAS CATEGORIAS CON ESTADO ACTIVO PERO SOLO DATOS PUBLICOS
exports.VisualizarCategoriasPublicas = async (req, res) => {
    try {

        const { empresaId } = req.query

        if (!empresaId) {
            return res.status(400).json({ error: "empresaId es requerido" });
        }

        const empresa = await Empresa.findByPk(empresaId);

        if (!empresa || empresa.Estado !== "Activo") {
            return res.status(404).json({ error: "Empresa no encontrada o inactiva" });
        }

        const categorias = await Categoria.findAll({
            where: { EstadoCategoria: 'activo', EmpresaId: empresaId },
            attributes: ['id', 'NombreCategoria'],
        });

        res.json(categorias);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener categorías públicas' });
    }
};


// METODO PARA TRAER LAS CATEGORIAS INACTIVAS
exports.VisualizarCategoriasInactivas = async (req, res) => {
    try {
        const EmpresaId = req.user.empresaId;

        if (!EmpresaId) {
            return res.status(400).json({ error: "empresaId es requerido" });
        }

        const categorias = await Categoria.scope('soloCategoriasInactivas').findAll({
            where: { EmpresaId: EmpresaId }
        });

        res.status(200).json(categorias)
        console.log('Categorias obtenidas correctamente')
    } catch (error) {
        console.error('Error al obtener las categorias: ', error);
        res.status(500).json({ error: 'Error al obtener las categorias' })
    }
}

// CREAR CATEGORIA 
exports.CrearCategoria = async (req, res) => {
    try {
        const EmpresaId = req.user.empresaId;
        if (!EmpresaId) {
            return res.status(400).json({ error: "empresaId es requerido" });
        }

        const { NombreCategoria, EstadoCategoria } = req.body
        const NuevaCategoria = await Categoria.create({ NombreCategoria, EstadoCategoria, EmpresaId })

        res.status(201).json(NuevaCategoria);
    } catch (error) {
        console.error("Error al crear categoría:", error);
        res.status(500).json({ message: "Error al crear categoría." });
    }
};

// ACTUALIZAR CATEGORIA
exports.ActualizarCategoria = async (req, res) => {
    try {

        const EmpresaId = req.user.empresaId;
        if (!EmpresaId) {
            return res.status(400).json({ error: "empresaId es requerido" });
        }

        const { id } = req.params;
        const { NombreCategoria, EstadoCategoria } = req.body;
        const categoria = await Categoria.findByPk(id);
        if (!categoria) return res.status(404).json({ message: "Categoría no encontrada." });

        if (categoria.EmpresaId !== EmpresaId) {
            return res.status(403).json({ message: "No autorizado" });
        }

        await categoria.update({ NombreCategoria, EstadoCategoria });

        res.json(categoria);
    } catch (error) {
        console.error("Error al actualizar categoría:", error);
        res.status(500).json({ message: "Error al actualizar categoría." });
    }
};

// ELIMINACION DE LA CATEGORIA 
exports.EliminarCategoria = async (req, res) => {
    try {

        const EmpresaId = req.user.empresaId;
        if (!EmpresaId) {
            return res.status(400).json({ error: "empresaId es requerido" });
        }

        const { id } = req.params;
        const categoria = await Categoria.findByPk(id);
        if (!categoria) return res.status(404).json({ message: "Categoría no encontrada." });

        if (categoria.EmpresaId !== EmpresaId) {
            return res.status(403).json({ message: "No autorizado" });
        }

        await categoria.destroy()

        res.json({ message: "Categoria eliminada correctamente" })
    } catch (error) {
        console.error("Error al eliminar categoría:", error);
        res.status(500).json({ message: "Error al eliminar categoría." });
    }
};

// CAMBIAR ESTADO A INACTIVO 
exports.CambiarEstadoCategoriaInactivo = async (req, res) => {
    try {

        const EmpresaId = req.user.empresaId;
        if (!EmpresaId) {
            return res.status(400).json({ error: "empresaId es requerido" });
        }

        const { id } = req.params

        if (!id) {
            return res.status(400).json({ message: 'El id es obligatorio' })
        }

        const categoria = await Categoria.unscoped().findByPk(id)

        if (!categoria) return res.status(400).json({
            message: 'Categoria no encontrada'
        })

        if (categoria.EmpresaId !== EmpresaId) {
            return res.status(403).json({ message: "No autorizado" });
        }

        await categoria.update({
            EstadoCategoria: 'inactivo'
        })

        console.log('Categoria con cambio de estado inactivo correctamente');
        res.status(200).json({
            message: 'Categoria con estado modificado correctamente'
        })
    } catch (error) {
        console.log('Error al cambiar el estado de la categoria', error)
        res.status(500).json({
            message: 'Error interno del servidor', error: error
        })
    }
}

// CAMBIAR ESTADO DE CATEGORIA A ACTIVO 
exports.CambiarEstadoCategoriaActivo = async (req, res) => {
    try {

        const EmpresaId = req.user.empresaId;
        if (!EmpresaId) {
            return res.status(400).json({ error: "empresaId es requerido" });
        }

        const { id } = req.params

        if (!id) {
            return res.status(400).json({ message: 'El id es obligatorio' })
        }

        const categoria = await Categoria.unscoped().findByPk(id)

        if (!categoria) return res.status(400).json({
            message: 'Categoria no encontrada'
        })

        if (categoria.EmpresaId !== EmpresaId) {
            return res.status(403).json({ message: "No autorizado" });
        }

        await categoria.update({
            EstadoCategoria: 'activo'
        })

        console.log('Categoria con cambio de estado inactivo correctamente');
        res.status(200).json({
            message: 'Categoria con estado modificado correctamente'
        })
    } catch (error) {
        console.log('Error al cambiar el estado de la categoria', error)
        res.status(500).json({
            message: 'Error interno del servidor', error: error
        })
    }
}