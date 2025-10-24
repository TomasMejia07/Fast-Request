import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import ModalDashboard from "../../components/Dashboard/ModalDashboard";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import { useClientes } from "../../hooks/useClientes";
import { validacionDeCampos } from '../../helpers/validacionDeCampos'
import { useFiltroClientes } from "../../hooks/useFiltro";
import { usePaginacion } from "../../hooks/usePaginacion";


const ClientesDashboard = () => {
    const {
        onChangeInputs,
        CrearCliente,
        cambiarEstadoCliente,
        clientes,
        obtenerClientes,
        openModal,
        isCreating,
        modalVisible,
        formRef,
        formData,
        closeModal,
        errores,
        setErrores,
        validacionDeClientes
    } = useClientes();


    useEffect(() => {
        obtenerClientes();
    }, []);

    const [busqueda, setBusqueda] = useState('')
    const [paginacionActual, setPaginacionActual] = useState(1)
    const res = useFiltroClientes(clientes, busqueda)
    const { itemsPorPagina, funtionFinally } = usePaginacion(paginacionActual, res)

    const validaciones = async () => {

        const nombreClienteError = validacionDeCampos('NombreCliente', formData.NombreCliente)
        const NumeroDocumentoError = validacionDeCampos('NumeroDocumento', formData.NumeroDocumento)
        const CorreoElectronicoError = validacionDeCampos('CorreoElectronico', formData.CorreoElectronico)
        const NumeroContactoError = validacionDeCampos('NumeroContacto', formData.NumeroContacto)

        let erroresTemp = {
            NombreCliente: nombreClienteError,
            NumeroDocumento: NumeroDocumentoError,
            CorreoElectronico: CorreoElectronicoError,
            NumeroContacto: NumeroContactoError
        }

        if (!NumeroDocumentoError || !CorreoElectronicoError || !NumeroContactoError) {
            const backendErrores = await validacionDeClientes()
            erroresTemp = {
                ...erroresTemp,
                NumeroDocumento: backendErrores?.NumeroDocumento || erroresTemp.NumeroDocumento,
                CorreoElectronico: backendErrores?.CorreoElectronico || erroresTemp.CorreoElectronico,
                NumeroContacto: backendErrores?.NumeroContacto || erroresTemp.NumeroContacto
            }
            setErrores(erroresTemp)
        }

        return Object.values(erroresTemp).some(err => err)

    }


    const navigate = useNavigate();

    return (
        <DashboardLayout title="Clientes - Fast Request">
            <div className="container_tablas">
                <div className="table_Header">
                    <h2>Clientes</h2>
                    <button className="boton_raro" onClick={openModal}>Crear Cliente</button>

                    <div className="input_search">
                        <input
                            type="search"
                            placeholder="Buscar"
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                        <ion-icon id="search-sharp" name="search-sharp"></ion-icon>
                    </div>

                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(`/dashboard/clientesInactivos`)
                        }}>
                        <ion-icon id="iconosoperacionVisualizarEstado" name="reader-outline"></ion-icon>
                    </a>
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
                        {funtionFinally.map((customer) => (
                            <tr className="tabladashb_tbody_tr" key={customer.Id}>
                                <td className="tabladashb_tbody_tr_td">{customer.NombreCliente.toLowerCase()}</td>
                                <td className="tabladashb_tbody_tr_td">{customer.NumeroDocumento.toLowerCase()}</td>
                                <td className="tabladashb_tbody_tr_td">{customer.CorreoElectronico.toLowerCase()}</td>
                                <td className="tabladashb_tbody_tr_td">{customer.NumeroContacto}</td>
                                <td className="tabladashb_tbody_tr_td">{customer.EstadoCliente}</td>
                                <td className="tabladashb_tbody_tr_td">
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            cambiarEstadoCliente(customer.Id);
                                        }}>
                                        <ion-icon id="iconosoperacionEliminar" name="ban"></ion-icon>
                                    </a>

                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            navigate(`/dashboard/pedidosPorCliente/${customer.Id}`)
                                        }}>
                                        <ion-icon id="iconosoperacionVisualizar" name="folder-open-outline"></ion-icon>
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* paginacion */}
            <Stack spacing={2}>
                <Pagination
                    className="paginacion"
                    count={Math.ceil(res.length / itemsPorPagina)}
                    page={paginacionActual}
                    onChange={(event, value) => setPaginacionActual(value)}
                    size="large"
                    sx={{
                        '& .MuiPaginationItem-root': {
                            color: '#fff',
                        },
                        '& .MuiPaginationItem-root.Mui-selected': {
                            backgroundColor: '#1c1c1e',
                            color: '#fff',
                        },
                    }}
                />
            </Stack>

            <ModalDashboard show={modalVisible} onClose={closeModal}>

                <form
                    id="miFormulario"
                    ref={formRef}
                    onSubmit={async (e) => {
                        e.preventDefault();

                        const hayErrores = await validaciones()
                        if (hayErrores) return

                        CrearCliente();

                    }}
                >
                    <h2 className="modal__title">
                        Crear Cliente
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
                        {errores.NombreCliente && <div style={{ color: 'red' }}>{errores.NombreCliente}</div>}
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
                        {errores.NumeroDocumento && <div style={{ color: 'red' }}>{errores.NumeroDocumento}</div>}
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
                        {errores.CorreoElectronico && <div style={{ color: 'red' }}>{errores.CorreoElectronico}</div>}
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
                        {errores.NumeroContacto && <div style={{ color: 'red' }}>{errores.NumeroContacto}</div>}
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


