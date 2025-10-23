const Empresa = require("../models/Empresa.js");

exports.obtenerConfiguracion = async (req, res) => {
  try {
    const empresaId = req.user.empresaId || req.user.EmpresaId; // compatible con minúsculas/mayúsculas
    const empresa = await Empresa.findByPk(empresaId);

    if (!empresa) {
      return res.status(404).json({ message: "Empresa no encontrada" });
    }

    // Devuelve dentro de { empresa } como espera el frontend
    res.status(200).json({ empresa });
  } catch (error) {
    console.error("Error al obtener configuración:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

exports.actualizarConfiguracion = async (req, res) => {
  try {
    const { NombreEmpresa, LogoEmpresa } = req.body;
    const empresaId = req.user.empresaId || req.user.EmpresaId;
    const empresa = await Empresa.findByPk(empresaId);

    if (!empresa) {
      return res.status(404).json({ message: "Empresa no encontrada" });
    }

    if (NombreEmpresa) empresa.NombreEmpresa = NombreEmpresa;
    if (LogoEmpresa) empresa.LogoEmpresa = LogoEmpresa;

    await empresa.save();

    res.status(200).json({
      success: true,
      message: "Configuración actualizada correctamente",
      empresa,
    });
  } catch (error) {
    console.error("Error al actualizar configuración:", error);
    res.status(500).json({ message: "Error al actualizar la configuración" });
  }
};
