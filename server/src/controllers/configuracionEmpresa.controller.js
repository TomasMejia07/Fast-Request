const { Empresa } = require("../models");

exports.obtenerConfiguracion = async (req, res) => {
  try {

    const empresaId = req.user.empresaId

    if (!empresaId) {
      return res.status(400).json({ message: "EmpresaId no encontrado en el token" });
    }

    const empresa = await Empresa.findByPk(empresaId, {
      attributes: ['NombreEmpresa', 'LogoEmpresa']
    })

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
    const empresaId = req.user.empresaId
    const empresa = await Empresa.findByPk(empresaId);

    let logoEmpresa
    if (req.file) {
      logoEmpresa = req.file.path;
    }

    if (empresa) {
      await empresa.update({
        NombreEmpresa: NombreEmpresa || empresa.NombreEmpresa,
        LogoEmpresa: logoEmpresa || empresa.LogoEmpresa
      })

      return res.status(200).json({ message: "Datos de la empresa actualizados correctamente", empresa: empresa });
    } else {

      const nuevaEmpresa = await Empresa.create({
        Id: empresaId,
        NombreEmpresa: NombreEmpresa || 'por definir',
        ...(logoEmpresa && { LogoEmpresa: logoEmpresa }),
      });

      return res.status(201).json({ message: "Empresa creada correctamente", empresa: nuevaEmpresa });
    }

  } catch (error) {
    console.error("Error al actualizar configuración:", error);
    res.status(500).json({ message: "Error al actualizar la configuración" });
  }
};



