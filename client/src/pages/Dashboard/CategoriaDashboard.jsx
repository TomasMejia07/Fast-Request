import React from 'react';
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import ModalDashboard from '../../components/Dashboard/ModalDashboard';

const CategoriaDashboard = () => {
    return ( 
        <div className="container_tablas">
        <div className="table_Header">
                <h2>Categorias</h2>
                <button className="boton_raro" >Crear Nuevo</button>
                <select className="select_tabla" name="select_tabla" id="">
                    <option value="" selected>Estado</option>
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
                        <th>Nombre de la categoria<ion-icon name="chevron-expand-outline"></ion-icon></th>
                        <th>Estado<ion-icon name="chevron-expand-outline"></ion-icon></th>
                        <th>Operaciones<ion-icon name="chevron-expand-outline"></ion-icon></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Categoria 1</td>
                        <td>Inactiva</td>
                        <td>
                            <a href="#"><ion-icon id="iconosoperacion" name="pencil"></ion-icon></a>
                            <a href="#"><ion-icon id="iconosoperacion" name="trash"></ion-icon></a>
                        </td>
                    </tr>
                    <tr>
                        <td>Categoria 2</td>
                        <td>Activa</td>
                        <td>
                            <a href="#"><ion-icon id="iconosoperacion" name="pencil"></ion-icon></a>
                            <a href="#"><ion-icon id="iconosoperacion" name="trash"></ion-icon></a>
                        </td>
                    </tr>
                </tbody>
        </table>

        <ModalDashboard>

        </ModalDashboard>
        </div>
        
    )
} 

export default CategoriaDashboard