import React from 'react'
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import ModalDashboard from "../../components/Dashboard/ModalDashboard";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { usePaginacion } from "../../hooks/usePaginacion";
import { useFiltroGaseosas } from '../../hooks/useFiltro';
import { useFiltroSalsas } from '../../hooks/useFiltro';
import { useComplementos } from '../../hooks/useComplementos';
import { useNavigate } from 'react-router-dom'

const Complementos = () => {

    const initialSalsas = {
        nombreSalsa: "",
        estadoSalsa: "activo"
    }


    const initialGaseosas = {
        nombreGaseosa: "",
        estadoGaseosa: "activo"
    }

    const { dataSalsas, dataGaseosas, onChangeInputs, openModal, closeModal,
        modalVisible, isCreating, forComplementosData, formRef, ComplementosSalsas,
        ComplementosGaseosas, setModalTipo, modalTipo, setForComplementosData,
        editarSalsa, editarGaseosa, busquedaSalsa, setBusquedaSalsa, busquedaGaseosa,
        setBusquedaGaseosa, paginacionActualSalsas,
        setPaginacionActualSalsas, paginacionActualGaseosas, setPaginacionActualGaseosas,
        cambiarEstadoSalsa, cambiarEstadoGaseosa, validacionesDeCampos,
        errores, validacionDeComplementos, setErrores } = useComplementos(initialSalsas, initialGaseosas)

    const resSalsa = useFiltroSalsas(dataSalsas, busquedaSalsa)
    const resGaseosas = useFiltroGaseosas(dataGaseosas, busquedaGaseosa)
    const { itemsPorPagina, funtionFinally: salsasPaginadas } = usePaginacion(paginacionActualSalsas, resSalsa)
    const { funtionFinally: gaseosasPaginadas } = usePaginacion(paginacionActualGaseosas, resGaseosas)

    const {
        nombreSalsa,
        nombreGaseosa
    } = forComplementosData

    const navigate = useNavigate()


    const openModalTipo = (tipo) => {
        setModalTipo(tipo);
        if (tipo === "salsa") {
            setForComplementosData(initialSalsas);
        } else {
            setForComplementosData(initialGaseosas);
        }
        openModal();
    }


    return (
        <DashboardLayout title="Complementos - Fast Request">
            <div className="mainContainer">
                <section className="containerSalsas">
                    <div className="tituloSeccionSalsas">
                        <h2>Salsas</h2>

                        <div className="input_search_complementos">
                            <input
                                type="search"
                                placeholder="Buscar"
                                value={busquedaSalsa}
                                onChange={(e) => setBusquedaSalsa(e.target.value)}
                            />
                            <ion-icon id="search-sharp-complementos" name="search-sharp"></ion-icon>
                        </div>

                        <button className="botonAgregarSalsas" onClick={() => openModalTipo('salsa')}>
                            Agregar Salsa
                        </button>
                    </div>
                    <table className="tablaSalsas">
                        <thead>
                            <tr>
                                <th>Nombre Salsa</th>
                                <th>Estado Salsa</th>
                                <th>Acciones</th>
                                <th>
                                    <a onClick={() => navigate('/dashboard/complementos-inactivos')}>
                                        <ion-icon id="iconosoperacionVisualizarEstado" name="reader-outline"></ion-icon>
                                    </a>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {salsasPaginadas.map((salsa) => (
                                <tr className="tabladashb_tbody_tr" key={salsa.id}>
                                    <td className="tabladashb_tbody_tr_td">{salsa.nombreSalsa}</td>
                                    <td className="tabladashb_tbody_tr_td">{salsa.estadoSalsa}</td>
                                    <td className="tabladashb_tbody_tr_td" >
                                        <a
                                            onClick={(e) => {
                                                e.preventDefault();
                                                editarSalsa(salsa);
                                            }}>
                                            <ion-icon id="iconosoperacionEditar" name="pencil"></ion-icon>
                                        </a>

                                        <a
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                cambiarEstadoSalsa(salsa.id)
                                            }}>
                                            <ion-icon id="iconosoperacionEliminar" name="ban"></ion-icon>
                                        </a>
                                    </td>
                                </tr>

                            ))}
                        </tbody>
                    </table>
                    <Stack spacing={2}>
                        <Pagination
                            className="paginacion"
                            count={Math.ceil(resSalsa.length / itemsPorPagina)}
                            page={paginacionActualSalsas}
                            onChange={(event, value) => setPaginacionActualSalsas(value)}
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
                </section>

                <section className="containerGaseosas">
                    <div className="tituloSeccionGaseosas">
                        <h2>Gaseosas</h2>

                        <div className="input_search_complementos">
                            <input
                                type="search"
                                placeholder="Buscar"
                                value={busquedaGaseosa}
                                onChange={(e) => setBusquedaGaseosa(e.target.value)}
                            />
                            <ion-icon id="search-sharp-complementos" name="search-sharp"></ion-icon>
                        </div>

                        <button className="botonAgregarGaseosas" onClick={() => openModalTipo('gaseosa')}>
                            Agregar Gaseosa
                        </button>
                    </div>
                    <table className="tablaGaseosas">
                        <thead>
                            <tr>
                                <th>Nombre Gaseosa</th>
                                <th>Estado Gaseosa</th>
                                <th>Acciones</th>
                                <th>
                                    <a onClick={() => navigate('/dashboard/complementos-inactivos')}>
                                        <ion-icon id="iconosoperacionVisualizarEstado" name="reader-outline"></ion-icon>
                                    </a>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {gaseosasPaginadas.map((gaseosa) => (
                                <tr className="tabladashb_tbody_tr" key={gaseosa.id}>
                                    <td className="tabladashb_tbody_tr_td">{gaseosa.nombreGaseosa}</td>
                                    <td className="tabladashb_tbody_tr_td">{gaseosa.estadoGaseosa}</td>
                                    <td className="tabladashb_tbody_tr_td" >
                                        <a
                                            onClick={(e) => {
                                                e.preventDefault();
                                                editarGaseosa(gaseosa);
                                            }}>
                                            <ion-icon id="iconosoperacionEditar" name="pencil"></ion-icon>
                                        </a>

                                        <a
                                            onClick={(e) => {
                                                e.preventDefault();
                                                cambiarEstadoGaseosa(gaseosa.id)
                                            }}>
                                            <ion-icon id="iconosoperacionEliminar" name="ban"></ion-icon>
                                        </a>
                                    </td>
                                </tr>

                            ))}
                        </tbody>
                    </table>
                    <Stack spacing={2}>
                        <Pagination
                            className="paginacion"
                            count={Math.ceil(resGaseosas.length / itemsPorPagina)}
                            page={paginacionActualGaseosas}
                            onChange={(event, value) => setPaginacionActualGaseosas(value)}
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
                </section>
            </div>

            <ModalDashboard show={modalVisible} onClose={closeModal}>
                <form
                    id="miFormulario"
                    ref={formRef}
                    onSubmit={async (e) => {
                        e.preventDefault()

                        const tipo = modalTipo
                        const name = tipo === 'salsa' ? (nombreSalsa || '') : (nombreGaseosa || '')

                        const hayErrores = validacionesDeCampos(
                            tipo === 'salsa' ? 'nombreSalsa' : 'nombreGaseosa',
                            name
                        )
                        const mensajeError = await validacionDeComplementos(tipo, name);

                        if (mensajeError || hayErrores) {
                            setErrores((prev) => ({
                                ...prev,
                                [tipo === "salsa" ? "nombreSalsa" : "nombreGaseosa"]: mensajeError || hayErrores
                            }));
                            return
                        }
                        
                        if (hayErrores) return

                        if (modalTipo === 'salsa') {
                            await ComplementosSalsas()
                        } else {
                            await ComplementosGaseosas()
                        }

                        closeModal()
                    }}
                >
                    <h2 className="modal__title">
                        {isCreating ? (modalTipo === "salsa" ? "Crear Salsa" : "Crear Gaseosa") : (modalTipo === "salsa" ? "Editar Salsa" : "Editar Gaseosa")}
                    </h2>

                    <div className="dashinputs_formulario">
                        <label htmlFor={modalTipo === "salsa" ? "nombreSalsa" : "nombreGaseosa"}>
                            {modalTipo === "salsa" ? "Nombre de la Salsa:" : "Nombre de la Gaseosa:"}
                        </label>
                        <input
                            type="text"
                            name={modalTipo === "salsa" ? "nombreSalsa" : "nombreGaseosa"}
                            id={modalTipo === "salsa" ? "nombreSalsa" : "nombreGaseosa"}
                            className="dashinputs_formulario_Labels"
                            value={modalTipo === "salsa" ? nombreSalsa : nombreGaseosa}
                            onChange={onChangeInputs}
                        />
                        {modalTipo === 'salsa'
                            ? errores.nombreSalsa && <div style={{ color: 'red' }}>{errores.nombreSalsa}</div>
                            : errores.nombreGaseosa && <div style={{ color: 'red' }}>{errores.nombreGaseosa}</div>
                        }
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

export default Complementos
