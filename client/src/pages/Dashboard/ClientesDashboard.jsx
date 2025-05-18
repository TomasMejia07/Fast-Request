import React from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import ModalDashboard from "../../components/Dashboard/ModalDashboard";
import { useNavigate } from 'react-router-dom';
import { useClientes } from "../../hooks/useClientes";
import { useEffect } from "react";
import { validacionDeCampos } from '../../helpers/validacionDeCampos'

const ClientesDashboard = () => {
    const {
        onChangeInputs,
        CrearOactualizarCliente,
        eliminarCliente,
        clientes,
        obtenerClientes,
        editarCliente,
        openModal,
        isCreating,
        modalVisible,
        formRef,
        formData,
        closeModal
    } = useClientes();

    useEffect(() => {
        obtenerClientes();
    }, []);


    const navigate = useNavigate();

    return (
        <DashboardLayout title="Clientes">
            <div className="container_tablas">
                <div className="table_Header">
                    <h2>Clientes</h2>
                    <button className="boton_raro" onClick={openModal}>Crear Nuevo</button>

                    <div className="input_search">
                        <input type="search" placeholder="Buscar" />
                        <ion-icon id="search-sharp" name="search-sharp"></ion-icon>
                    </div>
                </div>

                <table className="tabladashb">
                    <thead className="tabladashb_thead">
                        <tr>
                            <th className="tabladashb_thead_th">Nombre  del Cliente<ion-icon name="chevron-expand-outline"></ion-icon></th>
                            <th className="tabladashb_thead_th">Documento<ion-icon name="chevron-expand-outline"></ion-icon></th>
                            <th className="tabladashb_thead_th">Email<ion-icon name="chevron-expand-outline"></ion-icon></th>
                            <th className="tabladashb_thead_th">Numero de contacto<ion-icon name="chevron-expand-outline"></ion-icon></th>
                            <th className="tabladashb_thead_th">Estado<ion-icon name="chevron-expand-outline"></ion-icon></th>
                            <th className="tabladashb_thead_th">Operaciones<ion-icon name="chevron-expand-outline"></ion-icon></th>
                        </tr>
                    </thead>
                    <tbody className="tabladashb_tbody">
                        {clientes.map((customer) => (
                            <tr className="tabladashb_tbody_tr" key={customer.id}>
                                <td className="tabladashb_tbody_tr_td">{customer.NombreCliente}</td>
                                <td className="tabladashb_tbody_tr_td">{customer.NumeroDocumento}</td>
                                <td className="tabladashb_tbody_tr_td">{customer.CorreoElectronico}</td>
                                <td className="tabladashb_tbody_tr_td">{customer.NumeroContacto}</td>
                                <td className="tabladashb_tbody_tr_td">{customer.EstadoCliente}</td>
                                <td className="tabladashb_tbody_tr_td">
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault(); 
                                            editarCliente(customer);
                                        }}>
                                        <ion-icon id="iconosoperacionEditar" name="pencil"></ion-icon>
                                    </a>

                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            eliminarCliente(customer.id);
                                        }}>
                                        <ion-icon id="iconosoperacionEliminar" name="trash"></ion-icon>
                                    </a>

                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            navigate(`/dashboard/pedidosPorCliente/${customer.id}`)
                                        }}>
                                        <ion-icon id="iconosoperacionVisualizar" name="folder-open-outline"></ion-icon>
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <ModalDashboard show={modalVisible} onClose={closeModal}>

                <form
                    id="miFormulario"
                    ref={formRef}
                    onSubmit={(e) => {
                        e.preventDefault();
                        CrearOactualizarCliente();
                    }}
                >
                    <h2 className="modal__title">
                        {isCreating ? "Crear Cliente" : "Editar Cliente"}
                    </h2>

                    <div className="dashinputs_formulario">
                        <label htmlFor="NombreCliente">Nombre completo del Cliente:</label>
                        <input
                            type="text"
                            name="NombreCliente"
                            id="NombreCliente"
                            className="dashinputs_formulario_Labels"
                            value={formData.NombreCliente}
                            onChange={onChangeInputs}
                            required
                        />
                        <span className="error"></span>
                    </div>


                    <div className="dashinputs_formulario">
                        <label htmlFor="NumeroDocumento">Numero de Documento:</label>
                        <input
                            type="text"
                            name="NumeroDocumento"
                            id="NumeroDocumento"
                            className="dashinputs_formulario_Labels"
                            value={formData.NumeroDocumento}
                            onChange={onChangeInputs}
                            required
                        />
                        <span className="error"></span>
                    </div>

                    <div className="dashinputs_formulario">
                        <label htmlFor="CorreoElectronico">Correo Electronico:</label>
                        <input
                            type="email"
                            name="CorreoElectronico"
                            id="CorreoElectronico"
                            className="dashinputs_formulario_Labels"
                            value={formData.CorreoElectronico}
                            onChange={onChangeInputs}
                            required
                        />
                        <span className="error"></span>
                    </div>

                    <div className="dashinputs_formulario">
                        <label htmlFor="NumeroContacto">Numero de Contacto:</label>
                        <input
                            type="text"
                            name="NumeroContacto"
                            id="NumeroContacto"
                            className="dashinputs_formulario_Labels"
                            value={formData.NumeroContacto}
                            onChange={onChangeInputs}
                            required
                        />
                        <span className="error"></span>
                    </div>


                    <div className="dashinputs_formulario">
                        <label htmlFor="EstadoCliente">Estado:</label>
                        <select
                            name="EstadoCliente"
                            id="EstadoCliente"
                            className="dashinputs_formulario_Labels"
                            value={formData.EstadoCliente}
                            onChange={onChangeInputs}
                            required
                        >
                            <option value="" hidden>Selecciona uno</option>
                            <option value="Activo">Activo</option>
                            <option value="Inactivo">Inactivo</option>
                        </select>
                        <span className="error"></span>
                    </div>

                    <div className="botones_formulario">
                        <button type="submit" className="boton_formulario">
                            {isCreating ? "Crear" : "Actualizar"}
                        </button>
                        <button type="button" className="close__modal" onClick={closeModal}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </ModalDashboard>
        </DashboardLayout>
    )
}

export default ClientesDashboard
