import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { usePedidoCompleto } from '../../hooks/usePedidoCompleto'

const PedidoCompleto = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { dataPedido } = usePedidoCompleto(id)

    return (
        <div className="pedido-completo-container">
            {!dataPedido ? (
                <p>Cargando pedido...</p>
            ) : (
                <>
                    <div className="pedido-card">
                        <div className="pedido-card__header">
                            <h2>Detalles del Pedido</h2>
                            <span className="pedido-card__id">#{dataPedido.id}</span>
                        </div>

                        <div className="pedido-card__section">
                            <h3 className="section-title">
                                <ion-icon name="person-outline"></ion-icon>
                                Información del Cliente
                            </h3>
                            <div className="info-grid">
                                <div className="info-item">
                                    <span className="label">Nombre:</span>
                                    <span className="value">{dataPedido.cliente?.NombreCliente || 'N/A'}</span>
                                </div>
                                <div className="info-item">
                                    <span className="label">Estado:</span>
                                    <span className={`badge badge-${dataPedido.cliente?.EstadoCliente}`}>
                                        {dataPedido.cliente?.EstadoCliente || 'N/A'}
                                    </span>
                                </div>
                            </div>
                        </div>


                        <div className="pedido-card__section">
                            <h3 className="section-title">
                                <ion-icon name="fast-food-outline"></ion-icon>
                                Producto Solicitado
                            </h3>
                            <div className="producto-info">
                                <div className="info-row">
                                    <span className="label">Producto:</span>
                                    <span className="value">{dataPedido.Producto?.NombreProducto || 'N/A'}</span>
                                </div>
                                <div className="info-row">
                                    <span className="label">Precio Unitario:</span>
                                    <span className="value precio">${dataPedido.Producto?.PrecioProducto || 0}</span>
                                </div>
                                <div className="info-row">
                                    <span className="label">Cantidad:</span>
                                    <span className="value cantidad">{dataPedido.cantidadProducto}</span>
                                </div>
                                <div className="info-row total">
                                    <span className="label">Total:</span>
                                    <span className="value">${dataPedido.total}</span>
                                </div>
                            </div>
                        </div>


                        <div className="pedido-card__section">
                            <h3 className="section-title">
                                <ion-icon name="location-outline"></ion-icon>
                                Dirección de Entrega
                            </h3>
                            <div className="direccion-info">
                                <div className="info-row">
                                    <span className="label">Municipio:</span>
                                    <span className="value">{dataPedido.municipioLocalidad}</span>
                                </div>
                                <div className="info-row">
                                    <span className="label">Dirección:</span>
                                    <span className="value">{dataPedido.direccion}</span>
                                </div>
                                <div className="info-row">
                                    <span className="label">Punto de Referencia:</span>
                                    <span className="value">{dataPedido.puntoDeReferencia}</span>
                                </div>
                            </div>
                        </div>


                        <div className="pedido-card__section">
                            <h3 className="section-title">
                                <ion-icon name="restaurant-outline"></ion-icon>
                                Preferencias Adicionales
                            </h3>
                            <div className="preferencias">
                                <div className="preferencia-item">
                                    <ion-icon name="water-outline"></ion-icon>
                                    <div>
                                        <strong>Salsas:</strong>
                                        {dataPedido.deseaSalsas === 'si' ? (
                                            <span className="detalle">
                                                {Array.isArray(dataPedido.tipos_salsas)
                                                    ? dataPedido.tipos_salsas.join(', ')
                                                    : dataPedido.tipos_salsas}
                                            </span>
                                        ) : (
                                            <span className="no-desea">No desea</span>
                                        )}
                                    </div>
                                </div>
                                <div className="preferencia-item">
                                    <ion-icon name="beer-outline"></ion-icon>
                                    <div>
                                        <strong>Gaseosas:</strong>
                                        {dataPedido.deseaGaseosa === 'si' ? (
                                            <span className="detalle">{
                                                Array.isArray(dataPedido.tipos_gaseosas)
                                                    ? dataPedido.tipos_gaseosas.join(', ')
                                                    : dataPedido.tipos_gaseosas
                                            } </span>
                                        ) : (
                                            <span className="no-desea">No desea</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>


                        {dataPedido.notasAdicionales && (
                            <div className="pedido-card__section">
                                <h3 className="section-title">
                                    <ion-icon name="create-outline"></ion-icon>
                                    Notas Adicionales
                                </h3>
                                <div className="notas">
                                    <p>{dataPedido.notasAdicionales}</p>
                                </div>
                            </div>
                        )}


                        <div className="pedido-card__footer">
                            <span className="fecha">
                                <ion-icon name="calendar-outline"></ion-icon>
                                Pedido realizado: {new Date(dataPedido.createdAt).toLocaleString('es-ES')}
                            </span>
                        </div>
                    </div>


                    <button className="btn-volver" onClick={() => navigate('/dashboard/pedidos')}>
                        <ion-icon name="arrow-back-outline"></ion-icon>
                        Volver
                    </button>
                </>
            )}
        </div>
    )
}

export default PedidoCompleto
