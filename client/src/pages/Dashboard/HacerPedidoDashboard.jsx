import React from "react";
import ModalDashboard from "../../components/Dashboard/ModalDashboard";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import { useHacerPedido } from "../../hooks/useHacerPedido";


const HacerPedidoDashboard = ({ onClose }) => {

    const initial = {
        nombreCliente: '',
        tipoProducto: '',
        cantidadProducto: '',
        municipioLocalidad: '',
        direccion: '',
        puntoDeReferencia: '',
        deseaSalsas: 'no',
        tipos_salsas: [],
        deseaGaseosa: 'no',
        tipos_gaseosas: [],
        notasAdicionales: ''
    }

    const { OnChangeInputs, modalVisibleSalsas, formRef, closeModalSalsas, openModalSalsas, formPedidosData, tipos_salsas, tipos_gaseosas, checkboxs, modalGaseosaVisible, openModalGaseosa, closeModalGaseosa } = useHacerPedido(initial)

    const {
        nombreCliente,
        tipoProducto,
        cantidadProducto,
        municipioLocalidad,
        direccion,
        puntoDeReferencia,
        deseaSalsas,
        deseaGaseosa,
        notasAdicionales
    } = formPedidosData;


    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleCrearSalsas = () => {
        closeModalSalsas();
    };

    const handleCrearGaseosas = () => {
        closeModalGaseosa();
    };
    

    return (
        <DashboardLayout title="Hacer Pedido">
            <section className="agenda-pedido">
                <h2>Tomar Pedido</h2>
                <form id="form-agenda" onSubmit={handleSubmit}>
                    <label className="form-label" htmlFor="nombreCliente" >Nombre del cliente:</label>
                    <input
                        type="text"
                        id="nombreCliente"
                        className="form-input-pedidos"
                        name="nombreCliente"
                        placeholder=" Carlos Arturo Medina"
                        required
                        autoComplete="off"
                        value={nombreCliente}
                        onChange={OnChangeInputs}
                    />


                    <label className="form-label" htmlFor="tipoProducto">Tipo de producto:</label>
                    <input
                        type="text"
                        id="tipoProducto"
                        className="form-input-pedidos"
                        name="tipoProducto"
                        required
                        value={tipoProducto}
                        onChange={OnChangeInputs}
                        placeholder="Ej: hamburguesa, salchipapa"
                    />

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
                        autoComplete="off"
                    />
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
                        autoComplete="off"
                    />

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
                        autoComplete="off"
                    />
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
                        autoComplete="off"
                    />

                    <label className="form-label" htmlFor="salsas">¿Desea Alguna salsa?</label>
                    <div className="opcionesDeSalsas">
                        <label className="radio-label" htmlFor="deseaSalsas">Si</label>
                        <input
                            type="radio"
                            name="deseaSalsas"
                            className="form-radio-pedidos"
                            value='si'
                            id="deseaSalsas"
                            checked={deseaSalsas === 'si'}
                            onChange={OnChangeInputs}
                            onClick={openModalSalsas}
                        />
                        <label className="radio-label" htmlFor="deseaSalsas">No</label>
                        <input
                            type="radio"
                            name="deseaSalsas"
                            className="form-radio-pedidos"
                            id="deseaSalsas"
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
                                        id="tipos_salsas"
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
                                        id="tipos_salsas"
                                        name="tipos_salsas"
                                        value='piña'
                                        checked={tipos_salsas.includes('piña')}
                                        onChange={checkboxs}
                                    />
                                    Salsa De Piña
                                </label>
                                <label className="form-input-checkbox" >
                                    <input
                                        type="checkbox"
                                        id="tipos_salsas"
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
                                        id="tipos_salsas"
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
                                        id="tipos_salsas"
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
                                        id="tipos_salsas"
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
                                        id="tipos_salsas"
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
                                        id="tipos_salsas"
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
                                        id="tipos_salsas"
                                        name="tipos_salsas"
                                        value='DeLaCasa'
                                        checked={tipos_salsas.includes('DeLaCasa')}
                                        onChange={checkboxs}
                                    />
                                    Salsa De La Casa
                                </label>
                                <div className="botones_formulario">
                                    <button className="boton_formulario" onClick={handleCrearSalsas}>Crear</button>
                                    <button className="close__modal" onClick={onClose}>Cancelar</button>
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
                            id="deseaGaseosa"
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
                            id="deseaGaseosa"
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
                                        id="tipos_gaseosas"
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
                                        id="tipos_gaseosas"
                                        name="tipos_gaseosas"
                                        value='piña'
                                        checked={tipos_gaseosas.includes('piña')}
                                        onChange={checkboxs}
                                    />
                                    Piña
                                </label>
                                <label className="form-input-checkbox" >
                                    <input
                                        type="checkbox"
                                        id="tipos_gaseosas"
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
                                        id="tipos_gaseosas"
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
                                        id="tipos_gaseosas"
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
                                        id="tipos_gaseosas"
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
                                        id="tipos_gaseosas"
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
                                        id="tipos_gaseosas"
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
                                        id="tipos_gaseosas"
                                        name="tipos_gaseosas"
                                        value='Coca-Cola'
                                        checked={tipos_gaseosas.includes('Coca-Cola')}
                                        onChange={checkboxs}
                                    />
                                    Coca-Cola
                                </label>
                                <div className="botones_formulario">
                                    <button className="boton_formulario" onClick={handleCrearGaseosas}>Crear</button>
                                    <button className="close__modal" onClick={onClose}>Cancelar</button>
                                </div>
                            </div>
                        </ModalDashboard>
                    )}

                    <label className="form-label" htmlFor="notasAdicionales">Notas adicionales:</label>
                    <textarea
                        id="notasAdicionales"
                        name="notasAdicionales"
                        className="form-input-pedidos"
                        rows="3"
                        value={notasAdicionales}
                        onChange={OnChangeInputs}
                        placeholder="Ej: Sin cebolla, sin tomate"
                    >
                    </textarea>

                    <button className="form-btn-pedidos" type="submit">Tomar Pedido</button>
                </form>
            </section>
        </DashboardLayout>
    )
}

export default HacerPedidoDashboard