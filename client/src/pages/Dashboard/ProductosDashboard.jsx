import React, { useEffect, useState } from 'react';
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import ModalDashboard from "../../components/Dashboard/ModalDashboard";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useProductos } from "../../hooks/useProductos"
import { useFiltroProductos } from "../../hooks/useFiltro";
import { usePaginacion } from "../../hooks/usePaginacion";

const ProductosDashboard = () => {
    const {
        productos,
        cargarProductos,
        guardarProducto,
        eliminarProducto,
        editarProducto,
        formProductoData,
        setFormProductoData,
        onChangeInputs,
        modalVisible,
        openModal,
        closeModal,
        isCreating,
        formRef,
        errores,
        categorias
    } = useProductos();

    const [busqueda, setBusqueda] = useState('')
    const [paginacionActual, setPaginacionActual] = useState(1)
    const res = useFiltroProductos(productos, busqueda)
    const { itemsPorPagina, funtionFinally } = usePaginacion(paginacionActual, res)

    useEffect(() => {
        cargarProductos();
    }, []);


    return (
        <DashboardLayout title="Productos">
            <div className="container_tablas">
                <div className="table_Header">
                    <h2>Productos</h2>
                    <button className="boton_raro" onClick={openModal}>Crear nuevo</button>
                    <select className="select_tabla" name="" id="">
                        <option defaultValue>Categoria</option>
                        <option value="">Categoria 1</option>
                        <option value="">Categoria 2</option>
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
                            <th className="tabladashb_thead_th">Nombre del producto<ion-icon name="chevron-expand-outline"></ion-icon></th>
                            <th className="tabladashb_thead_th">Categoría<ion-icon name="chevron-expand-outline"></ion-icon></th>
                            <th className="tabladashb_thead_th">Precio<ion-icon name="chevron-expand-outline"></ion-icon></th>
                            <th className="tabladashb_thead_th">Descripcion<ion-icon name="chevron-expand-outline"></ion-icon></th>
                            <th className="tabladashb_thead_th">Estado<ion-icon name="chevron-expand-outline"></ion-icon></th>
                            <th className="tabladashb_thead_th">Operaciones<ion-icon name="chevron-expand-outline"></ion-icon></th>
                        </tr>
                    </thead>
                    <tbody className="tabladashb_tbody">
                        {funtionFinally.map((producto) => (
                            <tr className="tabladashb_tbody_tr" product={producto.Id}>
                                <td className="tabladashb_tbody_tr_td">{producto.NombreProducto}</td>
                                <td className="tabladashb_tbody_tr_td">{producto.categorium?.NombreCategoria}</td>
                                <td className="tabladashb_tbody_tr_td">{producto.PrecioProducto}</td>
                                <td className="tabladashb_tbody_tr_td">{producto.DescripcionProducto}</td>
                                <td className="tabladashb_tbody_tr_td">{producto.EstadoProducto}</td>
                                <td className="tabladashb_tbody_tr_td">
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            editarProducto(producto);
                                        }}>
                                        <ion-icon id="iconosoperacionEditar" name="pencil"></ion-icon>
                                    </a>
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            eliminarProducto(producto.Id);
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
                    id="miFormularioProduc"
                    ref={formRef}
                    onSubmit={(e) => {
                        e.preventDefault();
                        guardarProducto();
                    }}
                >
                    <h2 className="modal__title">
                        {isCreating ? "Crear Producto" : "Editar Producto"}
                    </h2>

                    <div className="dashinputs_formulario">
                        <label htmlFor="NombreProducto">Nombre Del Producto:</label>
                        <input
                            type="text"
                            name="NombreProducto"
                            id="NombreProducto"
                            className="dashinputs_formulario_Labels"
                            value={formProductoData.NombreProducto}
                            onChange={onChangeInputs}
                        />
                        {errores.NombreProducto && (
                            <span className="errores">{errores.NombreProducto}</span>
                        )}
                    </div>
                    <div className="dashinputs_formulario">
                        <label htmlFor="IdCategoria">Categoria:</label>
                        <select
                            name="IdCategoria"
                            id="IdCategoria"
                            className="dashinputs_formulario_Labels"
                            value={formProductoData.IdCategoria}
                            onChange={onChangeInputs}
                        >
                            <option value="">Seleccione una categoría</option>
                            {categorias.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.NombreCategoria}
                                </option>
                            ))}
                        </select>
                        {errores.IdCategoria && (
                            <span className="errores">{errores.IdCategoria}</span>
                        )}
                    </div>

                    <div className="dashinputs_formulario">
                        <label htmlFor="PrecioProducto">Precio:</label>
                        <input
                            type="text"
                            name="PrecioProducto"
                            id="precio"
                            className="dashinputs_formulario_Labels"
                            value={formProductoData.PrecioProducto}
                            onChange={onChangeInputs}
                        />
                        {errores.PrecioProducto && (
                            <span className="errores">{errores.PrecioProducto}</span>
                        )}
                    </div>
                    <div className="dashinputs_formulario">
                        <label htmlFor="DescripcionProducto">Descripcion:</label>
                        <input
                            type="text"
                            name="DescripcionProducto"
                            id="DescripcionProducto"
                            className="dashinputs_formulario_Labels"
                            value={formProductoData.DescripcionProducto}
                            onChange={onChangeInputs}
                        />
                        {errores.DescripcionProducto && (
                            <span className="errores">{errores.DescripcionProducto}</span>
                        )}
                    </div>
                    <div className="dashinputs_formulario">
                        <label htmlFor="EstadoProducto">Estado:</label>
                        <select
                            name="EstadoProducto"
                            id="EstadoProducto"
                            className="dashinputs_formulario_Labels"
                            value={formProductoData.EstadoProducto}
                            onChange={onChangeInputs}
                        >
                            <option value="" hidden>Seleciona Uno</option>
                            <option value="Activo">Activo</option>
                            <option value="Inactivo">Inactivo</option>
                        </select>
                        {errores.EstadoProducto && (
                            <span className="errores">{errores.EstadoProducto}</span>
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
    )
}

export default ProductosDashboard

