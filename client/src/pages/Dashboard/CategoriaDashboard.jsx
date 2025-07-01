import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import ModalDashboard from "../../components/Dashboard/ModalDashboard";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useCategorias } from "../../hooks/useCategorias";
import { useFiltroCategoria } from "../../hooks/useFiltro";
import { usePaginacion } from "../../hooks/usePaginacion";

const CategoriaDashboard = () => {
    const {
        categorias,
        cargarCategorias,
        guardarCategoria,
        eliminarCategoria,
        editarCategoria,
        formCategoriaData,
        setFormCategoriaData,
        onChangeInputs,
        modalVisible,
        openModal,
        closeModal,
        isCreating,
        formRef,
        errores
    } = useCategorias();

    const [busqueda, setBusqueda] = useState('')
    const [paginacionActual, setPaginacionActual] = useState(1)
    const res = useFiltroCategoria(categorias, busqueda)
    const { itemsPorPagina, funtionFinally } = usePaginacion(paginacionActual, res)

    useEffect(() => {
        cargarCategorias();
    }, []);




    return (
        <DashboardLayout title="Categoría">
            <div className="container_tablas">
                <div className="table_Header">
                    <h2>Categoria</h2>
                    <button className="boton_raro" onClick={openModal}>Crear Nuevo</button>
                    <select className="select_tabla" name="" id="">
                        <option defaultValue>Estado</option>
                        <option value="">Inactivo</option>
                        <option value="">Activo</option>
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
                            <th className="tabladashb_thead_th">Nombre<ion-icon name="chevron-expand-outline"></ion-icon></th>
                            <th className="tabladashb_thead_th">Estado<ion-icon name="chevron-expand-outline"></ion-icon></th>
                            <th className="tabladashb_thead_th">Operaciones<ion-icon name="chevron-expand-outline"></ion-icon></th>
                        </tr>
                    </thead>
                    <tbody className="tabladashb_tbody">
                        {funtionFinally.map((cat) => (
                            <tr className="tabladashb_tbody_tr" key={cat.id}>
                                <td className="tabladashb_tbody_tr_td">{cat.NombreCategoria}</td>
                                <td className="tabladashb_tbody_tr_td">{cat.EstadoCategoria}</td>
                                <td className="tabladashb_tbody_tr_td" >
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault(); // ← Esto evita que recargue la página
                                            editarCategoria(cat);
                                        }}>
                                        <ion-icon id="iconosoperacionEditar" name="pencil"></ion-icon>
                                    </a>

                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault(); // ← Esto también
                                            eliminarCategoria(cat.id);
                                        }}>
                                        <ion-icon id="iconosoperacionEliminar" name="trash"></ion-icon>
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
                    onSubmit={(e) => {
                        e.preventDefault();
                        guardarCategoria();
                    }}
                >
                    <h2 className="modal__title">
                        {isCreating ? "Crear Categoría" : "Editar Categoría"}
                    </h2>

                    <div className="dashinputs_formulario">
                        <label htmlFor="NombreCategoria">Nombre de la Categoría:</label>
                        <input
                            type="text"
                            name="NombreCategoria"
                            id="NombreCategoria"
                            className="dashinputs_formulario_Labels"
                            value={formCategoriaData.NombreCategoria}
                            onChange={onChangeInputs}

                        />
                        {errores.NombreCategoria && (
                            <span className="errores">{errores.NombreCategoria}</span>
                        )}
                    </div>

                    <div className="dashinputs_formulario">
                        <label htmlFor="EstadoCategoria">Estado:</label>
                        <select
                            name="EstadoCategoria"
                            id="EstadoCategoria"
                            className="dashinputs_formulario_Labels"
                            value={formCategoriaData.EstadoCategoria}
                            onChange={onChangeInputs}

                        >
                            <option value="" hidden>Selecciona uno</option>
                            <option value="Activo">Activo</option>
                            <option value="Inactivo">Inactivo</option>
                        </select>
                        {errores.EstadoCategoria && (
                            <span className="errores">{errores.EstadoCategoria}</span>
                        )}
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

export default CategoriaDashboard;
