import React, { useState, useEffect } from 'react';
import '../../assets/css/pedidosporcliente.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import { generarPDF } from '../../hooks/PedidoPdf';

const PedidosPorCliente = () => {

    const [pedidos, setPedidos] = useState([]);
    const navigate = useNavigate();
    const { clienteId } = useParams();

    const obtenerPedidos = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/pedidos/cliente-pedidos/${clienteId}`);
            setPedidos(response.data);
        } catch (err) {
            console.error('Error al obtener los pedidos de cliente', err);
        }
    };

    const volverAlInicio = (e) => {
        e.preventDefault()
        navigate('/dashboard/clientes')
    }

    useEffect(() => {
        console.log("clienteId recibido:", clienteId);
        if (clienteId) {
            obtenerPedidos();
        }
    }, [clienteId]);


    return (

        <div className="tabla-contenedor" >
            <div className="tabla-header">
                <h2>📦 Lista de Pedidos</h2>
            </div>

            {pedidos.length === 0 ? (
                <p>No hay pedidos para este cliente.</p>
            ) : (
                <table className="tabla">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Precio del Producto</th>
                            <th>Cantidad</th>
                            <th>Municipio</th>
                            <th>Dirección</th>
                            <th>Referencia</th>
                            <th>Salsas</th>
                            <th>Tipos de Salsas</th>
                            <th>Gaseosa</th>
                            <th>Tipos de Gaseosas</th>
                            <th>Notas</th>
                            <th>Fecha</th>
                            <th>Imprimir</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidos.map((pedido) => (
                            <tr key={pedido.id}>
                                <td>{pedido.Producto.NombreProducto}</td>
                                <td>{pedido.Producto.PrecioProducto}</td>
                                <td>{pedido.cantidadProducto}</td>
                                <td>{pedido.municipioLocalidad}</td>
                                <td>{pedido.direccion}</td>
                                <td>{pedido.puntoDeReferencia}</td>
                                <td>{pedido.deseaSalsas}</td>
                                <td>
                                    {Array.isArray(pedido.tipos_salsas)
                                        ? pedido.tipos_salsas.join(', ')
                                        : pedido.tipos_salsas}
                                </td>
                                <td>{pedido.deseaGaseosa}</td>
                                <td>
                                    {Array.isArray(pedido.tipos_gaseosas)
                                        ? pedido.tipos_gaseosas.join(', ')
                                        : pedido.tipos_gaseosas}
                                </td>
                                <td>{pedido.notasAdicionales}</td>
                                <td>{new Date(pedido.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <button
                                        className="btn-imprimir"
                                        title="Imprimir pedido"
                                        aria-label={`Imprimir pedido ${pedido.id}`}
                                        onClick={() => generarPDF(pedido)}
                                    >
                                        <ion-icon name="print-outline"></ion-icon>
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

export default PedidosPorCliente;

