const {Categoria} = require('../models')

exports.VisualizarCategorias = async (req, res) => {
    try{
        const categorias = await Categoria.findAll();
        res.json(categorias)
    }
    catch(error){
        console.error('Error al obtener las Categorias :', error);
        res.status(500).json({ error: 'No se pudo traer las Categorias.' });
    }
};

exports.CrearCategoria = async (req, res) => {
    try {
        const {NombreCategoria, EstadoCategoria} = req.body
        const NuevaCategoria = await Categoria.create({NombreCategoria, EstadoCategoria})
        res.status(201).json(NuevaCategoria);
    } catch (error) {
        console.error("Error al crear categoría:", error);
        res.status(500).json({ message: "Error al crear categoría." });
    }
};

exports.ActualizarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const { NombreCategoria, EstadoCategoria } = req.body;
        const categoria = await Categoria.findByPk(id);
        if (!categoria) return res.status(404).json({ message: "Categoría no encontrada." });

        await categoria.update({ NombreCategoria, EstadoCategoria });
        res.json(categoria);
    } catch (error) {
        console.error("Error al actualizar categoría:", error);
        res.status(500).json({ message: "Error al actualizar categoría." });
    }
};

exports.EliminarCategoria = async (req, res) => {
    try {
        const {id} = req.params;
        const categoria = await Categoria.findByPk(id);
        if (!categoria) return res.status(404).json({ message: "Categoría no encontrada." });

        await categoria.destroy()
        res.json({message: "Categoria eliminada correctamente"})
    } catch (error) {
        console.error("Error al eliminar categoría:", error);
        res.status(500).json({ message: "Error al eliminar categoría." });
    }
};

