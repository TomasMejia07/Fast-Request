const { Salsas, Gaseosas } = require('../models')


// --------------------- Controlador para "Salsas" ---------------------

exports.findAllSalsas = async (req, res) => {
    try {

        const EmpresaId = req.user.empresaId;

        if (!EmpresaId) {
            return res.status(400).json({ error: "empresaId es requerido" });
        }

        const salsas = await Salsas.findAll({
            where: {
                estadoSalsa: 'activo',
                EmpresaId: EmpresaId
            }
        })

        res.status(200).json({ message: 'Salsas obtenidas de manera exitosa', salsas })
        console.log('Salsas obtenidos de manera correcta')

    } catch (err) {
        console.log('Error al obtener las salsas', err)
        res.status(500).json({ message: 'Error interno del servidor', err: err })
    }
}

exports.findAllSalsasPublicas = async (req, res) => {
    try {

        const EmpresaId = req.query.empresaId;

        if (!EmpresaId) {
            return res.status(400).json({ error: "empresaId es requerido" });
        }

        const salsas = await Salsas.findAll({
            where: {
                estadoSalsa: 'activo',
                EmpresaId: EmpresaId
            },
            attributes: ['id', 'nombreSalsa']
        })

        res.status(200).json({ message: 'Salsas obtenidas de manera exitosa', salsas })
        console.log('Salsas obtenidos de manera correcta')

    } catch (err) {
        console.log('Error al obtener las salsas', err)
        res.status(500).json({ message: 'Error interno del servidor', err: err })
    }
}


exports.createSalsas = async (req, res) => {
    try {
        const EmpresaId = req.user.empresaId;

        if (!EmpresaId) {
            return res.status(400).json({ error: "empresaId es requerido" });
        }

        const { nombreSalsa, estadoSalsa } = req.body

        if (!nombreSalsa || !estadoSalsa) return res.status(400).json({ message: 'Debes de proporcionar el nombre y el estado de la salsa' })

        const salsaCreada = await Salsas.create({
            nombreSalsa,
            estadoSalsa,
            EmpresaId
        })

        console.log('Salsa creada:', salsaCreada);
        res.status(201).json({ message: 'Salsa creada exitosamente', salsaCreada });

    } catch (err) {
        console.log('Error al crear la salsa', err)
        res.status(500).json({ message: 'Error interno del servidor', err: err })
    }
}


exports.updateSalsa = async (req, res) => {

    try {
        const EmpresaId = req.user.empresaId;

        if (!EmpresaId) {
            return res.status(400).json({ error: "empresaId es requerido" });
        }

        const { id } = req.params

        const salsa = await Salsas.scope().findByPk(id)

        if (!salsa) return res.status(400).json({ message: 'EL id es obligatorio' })

        const { nombreSalsa } = req.body

        if (!nombreSalsa) return res.status(400).json({ message: 'Debes de proporcionar el nombre de la salsa para actualizarla' })

        if (salsa.EmpresaId !== EmpresaId) {
            return res.status(403).json({ message: "No autorizado" });
        }

        const salsaActualizada = await salsa.update({
            nombreSalsa,
        })

        console.log('Salsa actualizada:', salsaActualizada);
        res.status(200).json({ message: 'Salsa actualizada exitosamente', salsaActualizada });

    } catch (err) {
        console.log('Error al actualizar la salsa', err)
        res.status(500).json({ message: 'Error interno del servidor', err: err })
    }
}

exports.cambiarEstadoSalsaInactivo = async (req, res) => {
    try {

        const EmpresaId = req.user.empresaId;

        if (!EmpresaId) {
            return res.status(400).json({ error: "empresaId es requerido" });
        }

        const { id } = req.params

        if (!id) {
            return res.status(400).json({ message: 'El id es obligatorio' });
        }

        const salsa = await Salsas.unscoped().findByPk(id)

        if (!salsa) return res.status(400).json({ message: 'Salsa no encontrada' })


        if (salsa.EmpresaId !== EmpresaId) {
            return res.status(403).json({ message: "No autorizado" });
        }

        await salsa.update({
            estadoSalsa: 'inactivo'
        })

        console.log('Salsa con cambio de estado "inactivo" cambiado correctamente');
        res.status(200).json({ message: 'Salsa con estado modificado correctamente', });

    } catch (err) {
        console.log('Error al cambiar el estado de la salsa', err)
        res.status(500).json({ message: 'Error interno del servidor', err: err })
    }
}

exports.visualizarSalsasInactivas = async (req, res) => {
    try {
        const EmpresaId = req.user.empresaId;

        if (!EmpresaId) {
            return res.status(400).json({ error: "empresaId es requerido" });
        }

        const salsas = await Salsas.scope('soloSalsasInactivas').findAll({
            where: {
                EmpresaId: EmpresaId
            }
        })

        res.status(200).json(salsas)
        console.log('Salsas obtenidos de manera correcta')

    } catch (err) {
        console.error('Error al obtener las salsas:', err);
        res.status(500).json({ error: 'Error al obtener las salsas' });
    }
}

exports.cambioEstadoSalsaActivo = async (req, res) => {
    try {

        const EmpresaId = req.user.empresaId;

        if (!EmpresaId) {
            return res.status(400).json({ error: "empresaId es requerido" });
        }

        const { id } = req.params

        if (!id) {
            return res.status(400).json({ message: 'El id es obligatorio' });
        }

        const salsa = await Salsas.scope('soloSalsasInactivas').findByPk(id)

        if (!salsa) return res.status(400).json({ message: 'Salsa no encontrada' })

        if (salsa.EmpresaId !== EmpresaId) {
            return res.status(403).json({ message: "No autorizado" });
        }

        await salsa.update({
            estadoSalsa: 'activo'
        })

        console.log('Salsa reactivado correctamente');
        res.status(200).json({ message: 'Salsa reactivado correctamente', });

    } catch (err) {
        console.log('Error al cambiar el estado de la salsa', err)
        res.status(500).json({ message: 'Error interno del servidor', err: err })
    }
}


exports.eliminacioDeSalsa = async (req, res) => {
    try {
        const EmpresaId = req.user.empresaId;

        if (!EmpresaId) {
            return res.status(400).json({ error: "empresaId es requerido" });
        }

        const { id } = req.params

        if (!id) {
            return res.status(400).json({ message: 'El id es obligatorio' });
        }

        const salsa = await Salsas.unscoped().findByPk(id)

        if (!salsa) return res.status(404).json({ message: 'id de la salsa no encontrado' })

        if (salsa.EmpresaId !== EmpresaId) {
            return res.status(403).json({ message: "No autorizado" });
        }

        await salsa.destroy()

        console.log('Salsa eliminada correctamente');
        res.status(200).json({ message: 'Salsa eliminada correctamente', });

    } catch (err) {
        console.log('Error al eliminar la salsa', err)
        res.status(500).json({ message: 'Error interno del servidor', err: err })
    }
}


exports.validacionDeNombreSalsa = async (req, res) => {
    try {

        const EmpresaId = req.user.empresaId;

        if (!EmpresaId) {
            return res.status(400).json({ error: "empresaId es requerido" });
        }

        const { nombreSalsa } = req.body

        if (!nombreSalsa) return res.status(400).json({ message: 'Debes de proporcionar el nombre de la salsa' })

        const validacionSalsa = await Salsas.unscoped().findOne({
            where: { nombreSalsa: nombreSalsa.trim().toLowerCase(), EmpresaId: EmpresaId }
        })

        if (validacionSalsa) {
            return res.status(200).json({ existe: true, mensaje: 'Esta salsa ya existe.' });
        } else {
            return res.status(200).json({ existe: false, mensaje: 'Este salsa está aun creada..' });
        }

    } catch (err) {
        console.log('Error al crear la salsa', err)
        res.status(500).json({ message: 'Error interno del servidor', err: err })
    }
}

// --------------------- Controlador para "Gaseosas" ---------------------


exports.findAllGaseosas = async (req, res) => {
    try {
        const EmpresaId = req.user.empresaId;

        if (!EmpresaId) {
            return res.status(400).json({ error: "empresaId es requerido" });
        }

        const gaseosas = await Gaseosas.findAll({
            where: {
                estadoGaseosa: 'activo',
                EmpresaId: EmpresaId
            }
        })

        res.status(200).json({ message: 'Gaseosas obtenidas de manera exitosa', gaseosas })
        console.log('Gaseosas obtenidos de manera correcta')

    } catch (err) {
        console.log('Error al obtener las Gaseosas', err)
        res.status(500).json({ message: 'Error interno del servidor', err: err })
    }
}


exports.findAllGaseosasPublicas = async (req, res) => {
    try {
        const EmpresaId = req.query.empresaId;

        if (!EmpresaId) {
            return res.status(400).json({ error: "empresaId es requerido" });
        }

        const gaseosas = await Gaseosas.findAll({
            where: {
                estadoGaseosa: 'activo',
                EmpresaId: EmpresaId
            },
            attributes: ['id', 'nombreGaseosa'],
        })

        res.status(200).json({ message: 'Gaseosas obtenidas de manera exitosa', gaseosas })
        console.log('Gaseosas obtenidos de manera correcta')

    } catch (err) {
        console.log('Error al obtener las Gaseosas', err)
        res.status(500).json({ message: 'Error interno del servidor', err: err })
    }
}

exports.createGaseosa = async (req, res) => {
    try {
        const EmpresaId = req.user.empresaId;

        if (!EmpresaId) {
            return res.status(400).json({ error: "empresaId es requerido" });
        }

        const { nombreGaseosa, estadoGaseosa } = req.body

        if (!nombreGaseosa || !estadoGaseosa) return res.status(400).json({ message: 'Debes de proporcionar el nombre y el estado de la gaseosa' })

        const gaseosaCreada = await Gaseosas.create({
            nombreGaseosa,
            estadoGaseosa,
            EmpresaId
        })

        console.log('Gaseosa creada:', gaseosaCreada);
        res.status(201).json({ message: 'Gaseosa creada exitosamente', gaseosaCreada });

    } catch (err) {
        console.log('Error al crear la gaseosa', err)
        res.status(500).json({ message: 'Error interno del servidor', err: err })
    }
}


exports.updateGaseosa = async (req, res) => {

    try {
        const EmpresaId = req.user.empresaId;

        if (!EmpresaId) {
            return res.status(400).json({ error: "empresaId es requerido" });
        }

        const { id } = req.params

        const gaseosa = await Gaseosas.findByPk(id)

        if (!gaseosa) return res.status(400).json({ message: 'EL id es obligatorio' })

        const { nombreGaseosa } = req.body

        if (!nombreGaseosa) return res.status(400).json({ message: 'Debes de proporcionar el nombre de la gaseosa para actualizarla' })

        if (gaseosa.EmpresaId !== EmpresaId) {
            return res.status(403).json({ message: "No autorizado" });
        }

        const gaseosaActualizada = await gaseosa.update({
            nombreGaseosa,
        })

        console.log('Gaseosa actualizada:', gaseosaActualizada);
        res.status(200).json({ message: 'Gaseosa actualizada exitosamente', gaseosaActualizada });

    } catch (err) {
        console.log('Error al actualizar la gaseosa', err)
        res.status(500).json({ message: 'Error interno del servidor', err: err })
    }
}

exports.cambiarEstadoGaseosaInactivo = async (req, res) => {
    try {
        const EmpresaId = req.user.empresaId;

        if (!EmpresaId) {
            return res.status(400).json({ error: "empresaId es requerido" });
        }

        const { id } = req.params

        if (!id) {
            return res.status(400).json({ message: 'El id es obligatorio' });
        }

        const gaseosa = await Gaseosas.scope().findByPk(id)

        if (!gaseosa) return res.status(400).json({ message: 'Salsa no encontrada' })

        if (gaseosa.EmpresaId !== EmpresaId) {
            return res.status(403).json({ message: "No autorizado" });
        }

        await gaseosa.update({
            estadoGaseosa: 'inactivo'
        })

        console.log('Gaseosa con estado actualizado exitosamente');
        res.status(200).json({ message: 'cambio de estado realizado correctamente' });

    } catch (err) {
        console.log('Error al cambiar el estado de la gaseosa', err)
        res.status(500).json({ message: 'Error interno del servidor', err: err })
    }
}


exports.visualizarGaseosasInactivas = async (req, res) => {
    try {
        const EmpresaId = req.user.empresaId;

        if (!EmpresaId) {
            return res.status(400).json({ error: "empresaId es requerido" });
        }

        const gaseosas = await Gaseosas.scope('soloGaseosasInactivas').findAll({
            where: {
                EmpresaId: EmpresaId
            }
        })
        res.status(200).json(gaseosas)
        console.log('gaseosas obtenidos de manera correcta')

    } catch (err) {
        console.error('Error al obtener las gaseosas:', err);
        res.status(500).json({ error: 'Error al obtener las gaseosas' });
    }
}


exports.cambioEstadoGaseosaActivo = async (req, res) => {
    try {
        const EmpresaId = req.user.empresaId;

        if (!EmpresaId) {
            return res.status(400).json({ error: "empresaId es requerido" });
        }

        const { id } = req.params

        if (!id) {
            return res.status(400).json({ message: 'El id es obligatorio' });
        }

        const gaseosa = await Gaseosas.scope('soloGaseosasInactivas').findByPk(id)

        if (!gaseosa) return res.status(400).json({ message: 'Gaseosa no es encontrada' })

        if (gaseosa.EmpresaId !== EmpresaId) {
            return res.status(403).json({ message: "No autorizado" });
        }

        await gaseosa.update({
            estadoGaseosa: 'activo'
        })

        console.log('Gaseosa reactivado correctamente');
        res.status(200).json({ message: 'Gaseosa reactivado correctamente', });

    } catch (err) {
        console.log('Error al cambiar el estado de la gaseosa', err)
        res.status(500).json({ message: 'Error interno del servidor', err: err })
    }
}



exports.eliminacioDeGaseosa = async (req, res) => {
    console.log('🟢 Entrando al controlador eliminacioDeSalsa con ID:', req.params.id);
    try {
        const EmpresaId = req.user.empresaId;

        if (!EmpresaId) {
            return res.status(400).json({ error: "empresaId es requerido" });
        }

        const { id } = req.params

        if (!id) {
            return res.status(400).json({ message: 'El id es obligatorio' });
        }

        const gaseosa = await Gaseosas.unscoped().findByPk(id)

        if (!gaseosa) return res.status(404).json({ message: 'id de la gaseosa no es encontrada' })

        if (gaseosa.EmpresaId !== EmpresaId) {
            return res.status(403).json({ message: "No autorizado" });
        }

        await gaseosa.destroy()

        console.log('Gaseosa eliminada correctamente');
        res.status(200).json({ message: 'Gaseosa eliminada correctamente', });

    } catch (err) {
        console.log('Error al eliminar la gaseosa', err)
        res.status(500).json({ message: 'Error interno del servidor', err: err })
    }
}


exports.validacionDeNombreGaseosa = async (req, res) => {
    try {
        const EmpresaId = req.user.empresaId;

        if (!EmpresaId) {
            return res.status(400).json({ error: "empresaId es requerido" });
        }

        const { nombreGaseosa } = req.body

        if (!nombreGaseosa) return res.status(400).json({ message: 'Debes de proporcionar el nombre de la gaseosa' })

        const validacionGaseosa = await Gaseosas.unscoped().findOne({
            where: { nombreGaseosa: nombreGaseosa.trim().toLowerCase(), EmpresaId: EmpresaId }
        })

        if (validacionGaseosa) {
            return res.status(200).json({ existe: true, mensaje: 'Esta gaseosa ya existe.' });
        } else {
            return res.status(200).json({ existe: false, mensaje: 'Este gaseosa no está aun creada.' });
        }

    } catch (err) {
        console.log('Error al crear la salsa', err)
        res.status(500).json({ message: 'Error interno del servidor', err: err })
    }
}