import React from "react";
import ModalDashboard from "../../components/Dashboard/ModalDashboard";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import { useHacerPedido } from "../../hooks/useHacerPedido";
import axios from "axios";
import Swal from 'sweetalert2';
import { validacionDeCampos } from '../../helpers/validacionDeCampos';
import { authHeader } from "../../helpers/authHeader";

const HacerPedidoDashboard = ({ onClose }) => {

    const initial = {
        clienteId: '',
        productoId: '',
        cantidadProducto: '',
        municipioLocalidad: '',
        direccion: '',
        puntoDeReferencia: '',
        deseaSalsas: 'no',
        tipos_salsas: [],
        deseaGaseosa: 'no',
        tipos_gaseosas: [],
        notasAdicionales: '',
        total: undefined
    }

    const { OnChangeInputs, modalVisibleSalsas, formRef, closeModalSalsas, openModalSalsas, formPedidosData, checkboxs, modalGaseosaVisible, openModalGaseosa, closeModalGaseosa, isCreatingSalsas, isCreatingGaseosas, setFormPedidosData, setErrores, errores, productos, clientes } = useHacerPedido(initial)

    const {
        clienteId,
        productoId,
        cantidadProducto,
        municipioLocalidad,
        direccion,
        puntoDeReferencia,
        deseaSalsas,
        deseaGaseosa,
        notasAdicionales,
        tipos_salsas,
        tipos_gaseosas,
    } = formPedidosData



    const handleSubmit = async (e) => {
        e.preventDefault();

        const nombreClienteError = validacionDeCampos('clienteId', clienteId)
        const tipoProductoError = validacionDeCampos('productoId', productoId)
        const cantidadProductoError = validacionDeCampos('cantidadProducto', cantidadProducto)
        const municipioLocalidadError = validacionDeCampos('municipioLocalidad', municipioLocalidad)
        const direccionError = validacionDeCampos('direccion', direccion)
        const puntoDeReferenciaError = validacionDeCampos('puntoDeReferencia', puntoDeReferencia)
        const notasAdicionalesError = validacionDeCampos('notasAdicionales', notasAdicionales)

        setErrores({
            clienteId: nombreClienteError,
            productoId: tipoProductoError,
            cantidadProducto: cantidadProductoError,
            municipioLocalidad: municipioLocalidadError,
            direccion: direccionError,
            puntoDeReferencia: puntoDeReferenciaError,
            notasAdicionales: notasAdicionalesError,
        })

        if (nombreClienteError || tipoProductoError || cantidadProductoError || municipioLocalidadError || direccionError || puntoDeReferenciaError || notasAdicionalesError) return;
    };

    const handleCrearPedido = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/pedidos/nuevoPedido', formPedidosData, {
                headers: {
                    ...authHeader(),
                    'Content-Type': 'application/json',
                },

            });
            if (response.status === 200 || response.status === 201) {
                Swal.fire({
                    title: "Pedido Agendado Correctamente",
                    text: "El pedido ha sido creado con éxito 🚀😉",
                    icon: "success",
                    draggable: true
                });
            } else {
                Swal.fire({
                    title: "Error",
                    text: "No se pudo crear el pedido",
                    icon: "error",
                });
            }
            setFormPedidosData(initial);
            console.log('Pedido creado:', response.data);
        } catch (err) {
            console.error('Error al crear el pedido:', err)
            Swal.fire({
                icon: 'error',
                title: 'Error de conexión',
                text: 'No se pudo conectar con el servidor.'
            });
            setFormPedidosData(initial);
        }
    }


    return (
        <DashboardLayout title="Hacer Pedido - Fast Request">
            <section className="agenda-pedido">
                <h2>Tomar Pedido</h2>
                <form id="form-agenda" onSubmit={handleSubmit}>
                    <label className="form-label" htmlFor="clienteId" >Nombre del cliente:</label>
                    <select
                        name="clienteId"
                        value={clienteId}
                        onChange={OnChangeInputs}   
                        required
                        className="select_foranea"
                    >
                        <option value="" hidden>Seleccione un cliente</option>
                        {clientes.map(cliente => (
                            <option key={cliente.Id} value={cliente.Id}>
                                {cliente.NombreCliente}
                            </option>
                        ))}
                    </select>

                    {errores.nombreCliente && <div style={{ color: 'red' }}>{errores.nombreCliente}</div>}
                    <label className="form-label" htmlFor="productoId">Tipo de producto:</label>
                    <select
                        name="productoId"
                        value={productoId}
                        onChange={OnChangeInputs}   
                        required
                        className="select_foranea"
                    >
                        <option value="" hidden>Seleccione un producto</option>
                        {productos.map(producto => (
                            <option key={producto.Id} value={producto.Id}>
                                {producto.NombreProducto}
                            </option>
                        ))}
                    </select>

                    {errores.productoId && <div style={{ color: 'red' }}>{errores.productoId}</div>}
                    <label className="form-label" htmlFor="cantidadProducto">Cantidad Del Producto:</label>
                    <input
                        type="text"
                        id="cantidadProducto"
                        className="form-input-pedidos"
                        name="cantidadProducto"
                        min="1"
                        required
                        value={cantidadProducto}
                        onChange={OnChangeInputs}
                        placeholder="Ej: 1,2,3.."
                    />
                    {errores.cantidadProducto && <div style={{ color: 'red' }}>{errores.cantidadProducto}</div>}
                    <label className="form-label" htmlFor="municipioLocalidad">Municipio y Localidad:</label>
                    <input
                        type="text"
                        id="municipioLocalidad"
                        className="form-input-pedidos"
                        name="municipioLocalidad"
                        value={municipioLocalidad}
                        onChange={OnChangeInputs}
                        required
                        placeholder="Ej: Medellin, Barrio Aranjuez"
                    />
                    {errores.municipioLocalidad && <div style={{ color: 'red' }}>{errores.municipioLocalidad}</div>}
                    <label className="form-label" htmlFor="direccion">Direccion Del Cliente:</label>
                    <input
                        type="text"
                        id="direccion"
                        className="form-input-pedidos"
                        name="direccion"
                        value={direccion}
                        onChange={OnChangeInputs}
                        required
                        placeholder="Ej: Calle 21..."
                    />
                    {errores.direccion && <div style={{ color: 'red' }}>{errores.direccion}</div>}
                    <label className="form-label" htmlFor="puntoDeReferencia">Punto De Referencia:</label>
                    <input
                        type="text"
                        id="puntoDeReferencia"
                        className="form-input-pedidos"
                        name="puntoDeReferencia"
                        required
                        value={puntoDeReferencia}
                        onChange={OnChangeInputs}
                        placeholder="Ej: Cancha ..."
                    />
                    {errores.puntoDeReferencia && <div style={{ color: 'red' }}>{errores.puntoDeReferencia}</div>}
                    <label className="form-label" htmlFor="salsas">¿Desea Alguna salsa?</label>
                    <div className="opcionesDeSalsas">
                        <label className="radio-label" htmlFor="deseaSalsas">Si</label>
                        <input
                            type="radio"
                            name="deseaSalsas"
                            className="form-radio-pedidos"
                            value='si'
                            checked={deseaSalsas === 'si'}
                            onChange={OnChangeInputs}
                            onClick={openModalSalsas}
                        />
                        <label className="radio-label" htmlFor="deseaSalsas">No</label>
                        <input
                            type="radio"
                            name="deseaSalsas"
                            className="form-radio-pedidos"
                            value='no'
                            checked={deseaSalsas === 'no'}
                            onChange={OnChangeInputs}
                        />
                    </div>

                    {deseaSalsas === "si" && (
                        <ModalDashboard show={modalVisibleSalsas} onClose={closeModalSalsas}>
                            <div className='selecionDeSalsas' id="seleccionSalsas" ref={formRef}>
                                <label className="form-input-checkbox" >
                                    <input
                                        type="checkbox"
                                        name="tipos_salsas"
                                        value='rosada'
                                        checked={tipos_salsas.includes('rosada')}
                                        onChange={checkboxs}
                                    />
                                    Salsa Rosada
                                </label>
                                <label className="form-input-checkbox" >
                                    <input
                                        type="checkbox"
                                        name="tipos_salsas"
                                        value='guacamole'
                                        checked={tipos_salsas.includes('guacamole')}
                                        onChange={checkboxs}
                                    />
                                    Salsa Guacamole
                                </label>
                                <label className="form-input-checkbox" >
                                    <input
                                        type="checkbox"
                                        name="tipos_salsas"
                                        value='mayonesa'
                                        checked={tipos_salsas.includes('mayonesa')}
                                        onChange={checkboxs}
                                    />
                                    Salsa De Mayonesa
                                </label>
                                <label className="form-input-checkbox" >
                                    <input
                                        type="checkbox"
                                        name="tipos_salsas"
                                        value='tomate'
                                        checked={tipos_salsas.includes('tomate')}
                                        onChange={checkboxs}
                                    />
                                    Salsa De Tomate
                                </label>
                                <label className="form-input-checkbox" >
                                    <input
                                        type="checkbox"
                                        name="tipos_salsas"
                                        value='cebolla'
                                        checked={tipos_salsas.includes('cebolla')}
                                        onChange={checkboxs}
                                    />
                                    Salsa De Cebolla
                                </label>
                                <label className="form-input-checkbox" >
                                    <input
                                        type="checkbox"
                                        name="tipos_salsas"
                                        value='showy'
                                        checked={tipos_salsas.includes('showy')}
                                        onChange={checkboxs}
                                    />
                                    Salsa Showy
                                </label>
                                <label className="form-input-checkbox" >
                                    <input
                                        type="checkbox"
                                        name="tipos_salsas"
                                        value='ajo'
                                        checked={tipos_salsas.includes('ajo')}
                                        onChange={checkboxs}
                                    />
                                    Salsa De Ajo
                                </label>
                                <label className="form-input-checkbox" >
                                    <input
                                        type="checkbox"
                                        name="tipos_salsas"
                                        value='bbq'
                                        checked={tipos_salsas.includes('bbq')}
                                        onChange={checkboxs}
                                    />
                                    Salsa BBQ
                                </label>
                                <label className="form-input-checkbox">
                                    <input
                                        type="checkbox"
                                        name="tipos_salsas"
                                        value='DeLaCasa'
                                        checked={tipos_salsas.includes('DeLaCasa')}
                                        onChange={checkboxs}
                                    />
                                    Salsa De La Casa
                                </label>
                                <div className="botones_formulario">
                                    <button className="close__modal" onClick={closeModalSalsas} disabled={isCreatingSalsas}>Cerrar</button>
                                </div>
                            </div>
                        </ModalDashboard>
                    )}

                    <label className="form-label" htmlFor="bebida">¿Desea Alguna Gaseosa?</label>
                    <div className="opcionesDeGaseosas">
                        <label className="radio-label" htmlFor="deseaGaseosa">Si</label>
                        <input
                            type="radio"
                            name="deseaGaseosa"
                            className="form-radio-pedidos"
                            value='si'
                            checked={deseaGaseosa === 'si'}
                            onChange={OnChangeInputs}
                            onClick={openModalGaseosa}
                        />
                        <label className="radio-label" htmlFor="deseaGaseosa">No</label>
                        <input
                            type="radio"
                            name="deseaGaseosa"
                            className="form-radio-pedidos"
                            value='no'
                            checked={deseaGaseosa === 'no'}
                            onChange={OnChangeInputs}
                        />
                    </div>


                    {deseaGaseosa === "si" && (
                        <ModalDashboard show={modalGaseosaVisible} onClose={closeModalGaseosa}>
                            <div className='selecionDeGaseosas' id="seleccionGaseosas" ref={formRef}>
                                <label className="form-input-checkbox" >
                                    <input
                                        type="checkbox"
                                        name="tipos_gaseosas"
                                        value='manzana'
                                        checked={tipos_gaseosas.includes('manzana')}
                                        onChange={checkboxs}
                                    />
                                    Manzana
                                </label>
                                <label className="form-input-checkbox" >
                                    <input
                                        type="checkbox"
                                        name="tipos_gaseosas"
                                        value='hit_de_mango'
                                        checked={tipos_gaseosas.includes('hit_de_mango')}
                                        onChange={checkboxs}
                                    />
                                    Hit De Mango
                                </label>
                                <label className="form-input-checkbox" >
                                    <input
                                        type="checkbox"
                                        name="tipos_gaseosas"
                                        value='pepsi'
                                        checked={tipos_gaseosas.includes('pepsi')}
                                        onChange={checkboxs}
                                    />
                                    Pepsi
                                </label>
                                <label className="form-input-checkbox" >
                                    <input
                                        type="checkbox"
                                        name="tipos_gaseosas"
                                        value='uva'
                                        checked={tipos_gaseosas.includes('uva')}
                                        onChange={checkboxs}
                                    />
                                    Uva
                                </label>
                                <label className="form-input-checkbox" >
                                    <input
                                        type="checkbox"
                                        name="tipos_gaseosas"
                                        value='premio'
                                        checked={tipos_gaseosas.includes('premio')}
                                        onChange={checkboxs}
                                    />
                                    Premio
                                </label>
                                <label className="form-input-checkbox" >
                                    <input
                                        type="checkbox"
                                        name="tipos_gaseosas"
                                        value='sprite'
                                        checked={tipos_gaseosas.includes('sprite')}
                                        onChange={checkboxs}
                                    />
                                    Sprite
                                </label>
                                <label className="form-input-checkbox" >
                                    <input
                                        type="checkbox"
                                        name="tipos_gaseosas"
                                        value='colombiana'
                                        checked={tipos_gaseosas.includes('colombiana')}
                                        onChange={checkboxs}
                                    />
                                    Colombiana
                                </label>
                                <label className="form-input-checkbox" >
                                    <input
                                        type="checkbox"
                                        name="tipos_gaseosas"
                                        value='cuatro'
                                        checked={tipos_gaseosas.includes('cuatro')}
                                        onChange={checkboxs}
                                    />
                                    Cuatro
                                </label>
                                <label className="form-input-checkbox">
                                    <input
                                        type="checkbox"
                                        name="tipos_gaseosas"
                                        value='Coca-Cola'
                                        checked={tipos_gaseosas.includes('Coca-Cola')}
                                        onChange={checkboxs}
                                    />
                                    Coca-Cola
                                </label>
                                <div className="botones_formulario">
                                    <button className="close__modal" onClick={closeModalGaseosa} disabled={isCreatingGaseosas}>Cerrar</button>

                                </div>
                            </div>
                        </ModalDashboard>
                    )}

                    <label className="form-label" htmlFor="notasAdicionales">Notas adicionales:</label>
                    <textarea
                        name="notasAdicionales"
                        className="form-input-pedidos"
                        rows="3"
                        value={notasAdicionales}
                        onChange={OnChangeInputs}
                        placeholder="Ej: Sin cebolla, sin tomate"
                        autoComplete="on"
                    >
                    </textarea>
                    {errores.notasAdicionales && <div style={{ color: 'red' }}>{errores.notasAdicionales}</div>}

                    <button className="form-btn-pedidos" type="submit" onClick={handleCrearPedido}>Tomar Pedido</button>
                </form>
            </section>
        </DashboardLayout>
    )
}

export default HacerPedidoDashboard