const { Clientes, Pedido } = require('../models');

exports.VisualizarClientes = async (req, res) => {
    try {
        const clientes = await Clientes.findAll()
        res.status(200).json(clientes)
        console.log('clientes obtenidos de manera correcta')

    } catch (err) {
        console.error('Error al obtener los clientes:', err);
        res.status(500).json({ error: 'Error al obtener los clientes' });
    }
}

exports.CrearClientes = async (req, res) => {
    try {
        const { NombreCliente, NumeroDocumento, CorreoElectronico, NumeroContacto, EstadoCliente } = req.body

        const nuevoCliente = await Clientes.create(
            {
                NombreCliente,
                NumeroDocumento,
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


exports.ActualizarClientes = async (req, res) => {
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


exports.EliminarClientes = async (req, res) => {
    try {
        const { id } = req.params
        const clienteForId = await Clientes.findByPk(id)
        if (!clienteForId) return res.status(404).json({ message: "Cliente no encontrada." });

        await clienteForId.destroy()

        console.log('Cliente Eliminado correctamente')
        res.status(200).json({ message: 'Cliente eliminado correctamente' })

    } catch (err) {
        console.error('Error al Eliminar el cliente:', err);
        res.status(500).json({ error: 'Error al Eliminar el cliente' });
    }
}
