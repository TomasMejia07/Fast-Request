import React, { useState, useEffect } from 'react';
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import ModalDashboard from "../../components/Dashboard/ModalDashboard";
import PermisosDropdown from "../../components/Dashboard/PermisosDropdown";
import { useRol } from "../../hooks/useRol";
import { useFiltroRoles } from '../../hooks/useFiltro';
import { usePaginacion } from '../../hooks/usePaginacion';
import { Pagination, Stack } from '@mui/material';

const RolesDashboard = () => {
    const {
        roles,
        formRolData,
        cargarRol,
        onChangeInputs,
        guardarRol,
        eliminarRol,
        editarRol,
        openModal,
        closeModal,
        modalVisible,
        isCreating,
        formRef,
        errores,
    } = useRol();

    const [permisosSeleccionados, setPermisosSeleccionados] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        guardarRol(permisosSeleccionados);
    };

    const [busqueda, setBusqueda] = useState('')
    const [paginacionActual, setPaginacionActual] = useState(1)
    const res = useFiltroRoles(roles, busqueda)
    const { itemsPorPagina, funtionFinally } = usePaginacion(paginacionActual, res)

    useEffect(() => {
        cargarRol();
    }, []);

    return (
        <DashboardLayout title="Roles - Fast Request">
            <div className="container_tablas">
                <div className="table_Header">
                    <h2>Roles</h2>
                    <button className="boton_raro" onClick={openModal}>Crear Nuevo</button>
                    <select className="select_tabla" name="select_tabla">
                        <option defaultValue>Estado</option>
                        <option value="Activo">Activa</option>
                        <option value="Inactivo">Inactiva</option>
                    </select>
                    <div className="input_search">
                        <input 
                        type="search" 
                        placeholder="Buscar" 
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        />
                        <ion-icon id="search-sharp" name="search-sharp"></ion-icon>
                    </div>
                </div>
                <table className="tabladashb">
                    <thead className="tabladashb_thead">
                        <tr>
                            <th className="tabladashb_thead_th">Nombre del rol<ion-icon name="chevron-expand-outline"></ion-icon></th>
                            <th className="tabladashb_thead_th">Estado<ion-icon name="chevron-expand-outline"></ion-icon></th>
                            <th className="tabladashb_thead_th">Fecha de creación<ion-icon name="chevron-expand-outline"></ion-icon></th>
                            <th className="tabladashb_thead_th">Operaciones<ion-icon name="chevron-expand-outline"></ion-icon></th>
                        </tr>
                    </thead>
                    <tbody className="tabladashb_tbody">
                        {funtionFinally.map((rol) => (
                            <tr className="tabladashb_tbody_tr" key={rol.Id}>
                                <td className="tabladashb_tbody_tr_td">{rol.NombreRol}</td>
                                <td className="tabladashb_tbody_tr_td">{rol.EstadoRol}</td>
                                <td className="tabladashb_tbody_tr_td">{new Date(rol.createdAt).toLocaleDateString()}</td>
                                <td className="tabladashb_tbody_tr_td">
                                    
                                {rol.NombreRol !== "Administrador" && (
                                    <a onClick={() => editarRol(rol)}>
                                    <ion-icon id="iconosoperacionEditar" name="pencil"></ion-icon>
                                    </a>
                                )}
                                {!["Administrador", "Cliente", "Empleado"].includes(rol.NombreRol) && (
                                    <a onClick={() => eliminarRol(rol.Id)}>
                                    <ion-icon id="iconosoperacionEliminar" name="trash"></ion-icon>
                                    </a>
                                )}
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
                <form id="miFormulario" ref={formRef} onSubmit={handleSubmit}>
                    <h2 className="modal__title">{isCreating ? "Crear Rol" : "Editar Rol"}</h2>

                    <div className="dashinputs_formulario">
                        <label htmlFor="NombreRol">Nombre del Rol:</label>
                        <input
                            type="text"
                            name="NombreRol"
                            value={formRolData.NombreRol}
                            onChange={onChangeInputs}
                            className="dashinputs_formulario_Labels"
                        />
                        {errores.NombreRol && (
                            <span className="errores">{errores.NombreRol}</span>
                        )}
                    </div>

                    <div className="dashinputs_formulario">
                        <label htmlFor="EstadoRol">Estado:</label>
                        <select
                            name="EstadoRol"
                            value={formRolData.EstadoRol}
                            onChange={onChangeInputs}
                            className="dashinputs_formulario_Labels"
                        >
                            <option value="" hidden>Selecciona Uno</option>
                            <option value="Activo">Activo</option>
                            <option value="Inactivo">Inactivo</option>
                        </select>
                        {errores.EstadoRol && (
                            <span className="errores">{errores.EstadoRol}</span>
                        )}
                    </div>

                    <div className="dashinputs_formulario">
                        <PermisosDropdown onChange={setPermisosSeleccionados} />
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
    );
};

export default RolesDashboard;