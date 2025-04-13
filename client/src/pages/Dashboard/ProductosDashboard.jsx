import React from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import ModalDashboard from "../../components/Dashboard/ModalDashboard";

const ProductosDashboard = () => {
    return (
        <DashboardLayout title="Productos">
            <div className="container_tablas">
                <div className="table_Header">
                    <h2>Productos</h2>
                    <button className="boton_raro">Crear nuevo</button>
                    <select className="select_tabla" name="" id="">
                        <option defaultValue>Categoria</option>
                        <option value="">Categoria 1</option>
                        <option value="">Categoria 2</option>
                    </select>
                    <div className="input_search">
                        <input type="search" placeholder="Buscar" />
                        <ion-icon id="search-sharp" name="search-sharp"></ion-icon>
                    </div>
                </div> 
            <table>
                <thead>
                    <tr>
                        <th>Nombre del producto<ion-icon name="chevron-expand-outline"></ion-icon></th>
                        <th>Categoría<ion-icon name="chevron-expand-outline"></ion-icon></th>
                        <th>Precio<ion-icon name="chevron-expand-outline"></ion-icon></th>
                        <th>Descripcion<ion-icon name="chevron-expand-outline"></ion-icon></th>
                        <th>Estado<ion-icon name="chevron-expand-outline"></ion-icon></th>
                        <th>Operaciones<ion-icon name="chevron-expand-outline"></ion-icon></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Producto 1</td>
                        <td>Categoría 1</td>
                        <td>$100.00</td>
                        <td>Descripción del producto 1</td>
                        <td>Inactiva</td>
                        <td>
                            <a href="#"><ion-icon id="iconosoperacion" name="pencil"></ion-icon></a>
                            <a href="#"><ion-icon id="iconosoperacion" name="trash"></ion-icon></a>
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
            <ModalDashboard>
            <form  id="miFormulario">
            <h2 className="modal__title">Crear Producto</h2>
                <div className="inputs_formulario">
                    <label htmlFor="nombreP">Nombre Del Producto:</label>
                    <input type="text" name="nombreP" id="nombreP" className="Labels" />
                    <span id="" className="error"></span>
                </div>
                <div className="inputs_formulario">
                    <label htmlFor="categoria">Categoria:</label>
                    <select name="categoria" id="categoria" className="Labels">
                        <option defaultValue>Seleciona Uno</option>
                        <option value="" >Categoria 1</option>
                        <option value="">Categoria 2</option>
                    </select>
                    <span id="" className="error"></span>
                </div>
                <div className="inputs_formulario">
                    <label htmlFor="precio">Precio:</label>
                    <input type="text" name="precio" id="precio" className="Labels" />
                    <span id="" className="error"></span>
                </div>
                <div className="inputs_formulario">
                    <label htmlFor="descripcion">Descripcion:</label>
                    <input type="text" name="descripcion" id="descripcion" className="Labels" />
                    <span id="" className="error"></span>
                </div>
                <div className="inputs_formulario">
                    <label htmlFor="estado">Estado:</label>
                    <select name="estado" id="estado" className="Labels">
                        <option defaultValue>Seleciona Uno</option>
                        <option value="" >Activo</option>
                        <option value="">Inactivo</option>
                    </select>
                    <span id="" className="error"></span>
                </div>  
                <div className="botones_formulario">
                    <button type="submit" className="boton_formulario">Crear</button>
                    <button className="close__modal">Cancelar</button>
                </div>

            </form>
            </ModalDashboard>
        </DashboardLayout>
    )
}

export default ProductosDashboard