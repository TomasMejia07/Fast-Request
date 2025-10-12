import React from 'react';
import { useVisualizarClientesInactivos } from '../../hooks/useVisualizarClientesInactivos';


const VisualizarInactividadDeClientes = () => {

    const { volverAlInicio, clientes, cambioDeEstadoCliente } = useVisualizarClientesInactivos()

    return (

        <div className="tabla-contenedor" >
            <div className="tabla-header">
                <h2>🚫 Lista De Clientes Inactivos</h2>
            </div>

            {clientes.length === 0 ? (
                <p>No hay clientes inactivos por el momento.</p>
            ) : (
                <table className="tabla">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Documento</th>
                            <th>Correo Electronico</th>
                            <th>Numero De Contacto</th>
                            <th>Estado Actual</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map((cliente) => (
                            <tr key={cliente.Id}>
                                <td>{cliente.NombreCliente}</td>
                                <td>{cliente.NumeroDocumento}</td>
                                <td>{cliente.CorreoElectronico}</td>
                                <td>{cliente.NumeroContacto}</td>
                                <td>{cliente.EstadoCliente}</td>
                                <td>
                                    <button
                                        className="btn-imprimir"
                                        title="Cambio de estado"
                                        aria-label={`Cambio de estado ${cliente.id}`}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            cambioDeEstadoCliente(cliente.Id)
                                        }}
                                    >
                                        <ion-icon name="checkmark-circle-outline"></ion-icon>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
            }
            <a className="btn-volver" onClick={volverAlInicio}>
                Volver
            </a>
        </div >
    );
};

export default VisualizarInactividadDeClientes;

