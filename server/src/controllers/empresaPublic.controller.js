const { Empresa } = require('../models')


exports.ObtenerElIndentificadorDeLaEmpresa = async (req, res) => {
    try {

        const { slug } = req.params;

        const empresa = await Empresa.findOne({
            where: { slug, Estado: "Activo" },
            attributes: ["Id", "NombreEmpresa"]
        });

        if (!empresa) {
            return res.status(404).json({ error: "Empresa no encontrada" });
        }

        res.json({ empresaId: empresa.Id, nombre: empresa.NombreEmpresa });

    } catch (err) {
        console.error('Error al obtener el identificador de la empresa:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}