const { Op } = require('sequelize');
const { Clientes, Pedido } = require('../models');



exports.VisualizarClientes = async (req, res) => {
    try {
        const clientes = await Clientes.findAll({
            where: {
                EstadoCliente: 'activo'
            },
        })
        res.status(200).json(clientes)
        console.log('clientes obtenidos de manera correcta')

    } catch (err) {
        console.error('Error al obtener los clientes:', err);
        res.status(500).json({ error: 'Error al obtener los clientes' });
    }
}

exports.CrearClientes = async (req, res) => {
    try {
        const { NombreCliente, CorreoElectronico, NumeroContacto, EstadoCliente } = req.body

        const nuevoCliente = await Clientes.create(
            {
                NombreCliente,
                CorreoElectronico,
                NumeroContacto,
                EstadoCliente
            }
        );

        console.log('Cliente creado:', nuevoCliente);
        res.status(201).json(nuevoCliente);

    } catch (err) {
        console.error('Error al crear cliente:', err);
        res.status(500).json({ error: 'Error al crear cliente' });
    }
}

// la seccion de edicion queda eliminada debido a cambios en el proyecto, esto ya no lo manejara administracion
// si no que el mismo cliente tendra la potestad de actualizar sus campos....

/* exports.ActualizarClientes = async (req, res) => {
    try {
        const { id } = req.params
        const clienteForId = await Clientes.findByPk(id)
        if (!clienteForId) return res.status(404).json({ message: "Cliente no encontrada." });

        const { NombreCliente, NumeroDocumento, CorreoElectronico, NumeroContacto, EstadoCliente } = req.body
        await clienteForId.update({ NombreCliente, NumeroDocumento, CorreoElectronico, NumeroContacto, EstadoCliente })

        console.log('Cliente actualizado correctamente')
        res.status(200).json(clienteForId)

    } catch (err) {
        console.error('Error al Actualizar el cliente:', err);
        res.status(500).json({ error: 'Error al Actualizar el cliente' });
    }
}
 */

exports.CambioEstadoInactivoClientes = async (req, res) => {
    try {
        const { id } = req.params
        const clienteForId = await Clientes.unscoped().findByPk(id)
        if (!clienteForId) return res.status(404).json({ message: "Cliente no encontrada." });

        await clienteForId.update({ EstadoCliente: 'inactivo' })

        console.log('Cliente con cambio de estado "inactivo" cambiado correctamente')
        res.status(200).json({ message: 'Cliente con estado modificado correctamente' })

    } catch (err) {
        console.error('Error al cambiar el estado del cliente:', err);
        res.status(500).json({ error: 'Error al cambiar el estado de un cliente' });
    }
}

exports.VisualizarClientesInactivos = async (req, res) => {
    try {
        const clientes = await Clientes.scope('soloClientesInactivos').findAll()
        res.status(200).json(clientes)
        console.log('clientes obtenidos de manera correcta')

    } catch (err) {
        console.error('Error al obtener los clientes:', err);
        res.status(500).json({ error: 'Error al obtener los clientes' });
    }
}


exports.CambioEstadoActivoClientes = async (req, res) => {
    try {
        const { id } = req.params;
        const cliente = await Clientes.scope('soloClientesInactivos').findByPk(id);

        if (!cliente) {
            return res.status(404).json({ message: "Cliente inactivo no encontrado." });
        }

        await cliente.update({ EstadoCliente: 'activo' });
        res.status(200).json({ message: 'Cliente reactivado correctamente' });

    } catch (err) {
        console.error('Error al reactivar el cliente:', err);
        res.status(500).json({ error: 'Error al reactivar cliente' });
    }
}


exports.validacionDeCampos = async (req, res) => {
    try {
        const { CorreoElectronico, NumeroContacto } = req.body;

        if (!CorreoElectronico || !NumeroContacto) {
            return res.status(400).json({ message: 'Debes proporcionar todos los campos requeridos' });
        }

        const clientes = await Clientes.unscoped().findAll({
            where: {
                // [Op.or] significa: buscar coincidencias en cualquiera de los campos especificados
                // Op:  Significa operaciones lógicas en las consultas
                // or: Significa "o" lógico, es decir, al menos una de las condiciones debe cumplirse
                [Op.or]: [
                    { CorreoElectronico: CorreoElectronico.trim().toLowerCase() },
                    { NumeroContacto: NumeroContacto.trim() }
                ]
            }
        });

        const resultados = {
            CorreoElectronico: clientes.some(client => client.CorreoElectronico === CorreoElectronico.trim().toLowerCase()) ?
                { existe: true, mensaje: 'Este correo ya existe.' } : '',

            NumeroContacto: clientes.some(client => client.NumeroContacto === NumeroContacto.trim()) ?
                { existe: true, mensaje: 'Este número de contacto ya existe.' } : '',
        };

        res.status(200).json(resultados);

    } catch (err) {
        console.error('Error al validar campos', err);
        res.status(500).json({ message: 'Error interno del servidor', err });
    }
};
