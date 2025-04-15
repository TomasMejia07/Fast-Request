import React from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import ModalDashboard from "../../components/Dashboard/ModalDashboard";

const RolesDashboard = () => {
    return (
        <DashboardLayout title="Roles">
            <div className="container_tablas">
                <div className="table_Header">
                <h2>Roles</h2>
                <button className="boton_raro" >Crear Nuevo</button>
                <select className="select_tabla" name="select_tabla" id="">
                    <option defaultValue>Estado</option>
                    <option value="">Activa</option>
                    <option value="">Inactiva</option>
                </select>
                <div className="input_search">
                    <input type="search" placeholder="Buscar" />
                    <ion-icon id="search-sharp" name="search-sharp"></ion-icon>
                </div>
            </div> 
        <table>
            <thead>
                <tr>
                    <th>Nombre del rol<ion-icon name="chevron-expand-outline"></ion-icon></th>
                    <th>Estado<ion-icon name="chevron-expand-outline"></ion-icon></th>
                    <th>Fecha de creacion<ion-icon name="chevron-expand-outline"></ion-icon></th>
                    <th>Operaciones<ion-icon name="chevron-expand-outline"></ion-icon></th>
                </tr>
            </thead>
                <tbody>
                    <tr>
                        <td>rol 1</td>
                        <td>Inactiva</td>
                        <td>15/12/2010</td>
                        <td>
                            <a href="#"><ion-icon id="iconosoperacion" name="pencil"></ion-icon></a>
                            <a href="#"><ion-icon id="iconosoperacion" name="trash"></ion-icon></a>
                        </td>
                    </tr>
                    <tr>
                        <td>rol 2</td>
                        <td>Activa</td>
                        <td>1/5/1999</td>
                        <td>
                            <a href="#"><ion-icon id="iconosoperacion" name="pencil"></ion-icon></a>
                            <a href="#"><ion-icon id="iconosoperacion" name="trash"></ion-icon></a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <ModalDashboard>
            { /*
            <form id="miFormulario">
                <h2 className="modal__title">Crear Rol</h2>
                <div className="inputs_formulario">
                    <label for="nombre">Nombre Del Rol:</label>
                    <input type="text" name="nombre" id="nombre" className="Labels" />
                    <span id="" className="error"></span>
                </div>
                <div className="inputs_formulario">
                    <label for="estado">Estado:</label>
                    <select name="estado" id="estado" className="Labels">
                        <option defaultValue>Seleciona Uno</option>
                        <option value="" >Activo</option>
                        <option value="">Inactivo</option>
                    </select>
                    <span id="" className="error"></span>
                </div>
                <div className="inputs_formulario">                 
                    <div className="dropdown">
                        <label for="search">Permisos:</label>
                        <input type="text" id="search" className="inputs_formulario" placeholder="Buscar..." oninput="filterOptions()" onclick="toggleDropdown()" />
                    <div id="options" className="options" style="display: none;">
                        <label><input type="checkbox" value="all" onclick="selectAll(this)" /> Todos</label>
                        <label><input type="checkbox" value="abarth" /> Crear Roles</label>
                        <label><input type="checkbox" value="alfa_romeo" /> Crear Usuarios</label>
                        <label><input type="checkbox" value="aston_martin" /> Hacer Pedidos</label>
                        <label><input type="checkbox" value="audi" /> Estadisticas</label>
                        <label><input type="checkbox" value="bentley" /> Modificar Diseño</label>
                        <label><input type="checkbox" value="bmw" /> Activar MIPAGINA</label>
                    </div>
                    </div>
                    <span id="" className="error"></span>
                </div>
                <div className="botones_formulario">
                    <button type="submit" className="boton_formulario">Crear</button>
                    <button className="close__modal">Cancelar</button>
                </div>
            </form>
                        */}
        </ModalDashboard>
        </DashboardLayout>
    )
}

export default RolesDashboard