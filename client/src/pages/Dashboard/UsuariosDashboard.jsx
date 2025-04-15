import React from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import ModalDashboard from "../../components/Dashboard/ModalDashboard";

const UsuariosDashboard = () => {
    return (
        <DashboardLayout title="Usuarios">
            <div className="container_tablas">
            <div className="table_Header">
                <h2>Usuarios</h2>
                <button className="boton_raro" >Crear nuevo</button>
                <select className="select_tabla" name="" id="">
                    <option defaultValue>Rol</option>
                    <option value="">Rol 1</option>
                    <option value="">Rol 2</option>
                </select>
                <div className="input_search">
                    <input type="search" placeholder="Buscar" />
                    <ion-icon id="search-sharp" name="search-sharp"></ion-icon>
                </div>
            </div> 
            <table>
                <thead>
                    <tr>
                        <th>Nombre<ion-icon name="chevron-expand-outline"></ion-icon></th>
                        <th>Rol<ion-icon name="chevron-expand-outline"></ion-icon></th>
                        <th>Estado<ion-icon name="chevron-expand-outline"></ion-icon></th>
                        <th>Operaciones<ion-icon name="chevron-expand-outline"></ion-icon></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Usuario 1</td>
                        <td>Rol 1</td>
                        <td>Activa</td>
                        <td>
                            <a href="#"><ion-icon id="iconosoperacion" name="pencil"></ion-icon></a>
                            <a href="#"><ion-icon id="iconosoperacion" name="trash"></ion-icon></a>
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
            <ModalDashboard>
                <form id="miFormulario">
                    <h2 className="modal__title">Crear Usuario</h2>
                    <div className="inputs_formulario">
                        <label for="nombre">Nombre:</label>
                        <input type="text" name="nombre" id="nombre" className="Labels" />
                        <span id="" className="error"></span>
                    </div>
                    <div className="inputs_formulario">
                        <label for="apellido">Apellido:</label>
                        <input type="text" name="apellido" id="apellido" className="Labels" />
                        <span id="" className="error"></span>
                    </div>
                    <div className="inputs_formulario">
                        <label for="documento">Documento:</label>
                        <input type="text" name="documento" id="documento" className="Labels" />
                        <span id="" className="error"></span>
                    </div>
                    <div className="inputs_formulario">
                        <label for="correo">Correo:</label>
                        <input type="text" name="correo" id="correo" className="Labels" />
                        <span id="" className="error"></span>
                    </div>
                    <div className="inputs_formulario">
                        <label for="estado">rol:</label>
                        <select name="estado" id="estado" className="Labels">
                            <option defaultValue>Seleciona Uno</option>
                            <option value="" >rol 1</option>
                            <option value="">rol 2</option>
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

export default UsuariosDashboard