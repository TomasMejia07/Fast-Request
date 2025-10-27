import React, { useState } from 'react';
import { useVisualizarClientesInactivos } from '../../hooks/useVisualizarClientesInactivos';
import { useFiltroClientes } from "../../hooks/useFiltro";
import { usePaginacion } from "../../hooks/usePaginacion";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const VisualizarInactividadDeClientes = () => {

    const { volverAlInicio, clientes, cambioDeEstadoCliente } = useVisualizarClientesInactivos()

    const [busqueda, setBusqueda] = useState('')
    const [paginacionActual, setPaginacionActual] = useState(1)

    const res = useFiltroClientes(clientes, busqueda)
    const { itemsPorPagina, funtionFinally } = usePaginacion(paginacionActual, res)

    return (

        <div className="tabla-contenedor" >
            <div className="tabla_header_clientes_inactivos">
                <h2>🚫 Lista De Clientes Inactivos</h2>

                <div className="input_search_clientes_inactivos">
                    <input
                        type="search"
                        placeholder="Buscar"
                        className='input-search-bar'
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </div>
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
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {funtionFinally.map((cliente) => (
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

            {/* paginacion */}
            <Stack spacing={2}>
                <Pagination
                    className="paginacion-clientes-inactivos"
                    count={Math.ceil(res.length / itemsPorPagina)}
                    page={paginacionActual}
                    onChange={(event, value) => setPaginacionActual(value)}
                    size="large"
                    sx={{
                        '& .MuiPaginationItem-root': {
                            color: '#000000ff',
                        },
                        '& .MuiPaginationItem-root.Mui-selected': {
                            backgroundColor: '#000000ff',
                            color: '#ffffffff',
                            '&:hover': {
                                backgroundColor: '#252525ff',
                            },
                        },
                    }}
                />
            </Stack>


            <a className="btn-volver" onClick={volverAlInicio}>
                Volver
            </a>
        </div >
    );
};

export default VisualizarInactividadDeClientes;

