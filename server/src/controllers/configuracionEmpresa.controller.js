const Empresa = require("../models/Empresa.js");

exports.obtenerConfiguracion = async (req, res) => {
  try {
    const empresaId = req.user.EmpresaId; // extraído del token JWT
    const empresa = await Empresa.findByPk(empresaId);

    if (!empresa) {
      return res.status(404).json({ message: "Empresa no encontrada" });
    }

    res.status(200).json(empresa);
  } catch (error) {
    console.error("Error al obtener configuración:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

exports.actualizarConfiguracion = async (req, res) => {
  try {
    const { NombreEmpresa } = req.body;
    const empresaId = req.user.EmpresaId; // viene del JWT
    const empresa = await Empresa.findByPk(empresaId);

    if (!empresa) {
      return res.status(404).json({ message: "Empresa no encontrada" });
    }

    if (NombreEmpresa) empresa.NombreEmpresa = NombreEmpresa;
    if (req.file) empresa.LogoEmpresa = req.file.path; // URL Cloudinary

    await empresa.save();
    res.status(200).json({
      message: "Configuración actualizada correctamente",
      empresa,
    });
  } catch (error) {
    console.error("Error al actualizar configuración:", error);
    res.status(500).json({ message: "Error al actualizar la configuración" });
  }
};
