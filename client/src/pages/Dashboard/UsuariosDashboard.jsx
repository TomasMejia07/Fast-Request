import React, { useState, useRef } from 'react';
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import ModalDashboard from "../../components/Dashboard/ModalDashboard";

const UsuariosDashboard = ({ onClose }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const formRef = useRef(null);
    
    const openModal = () => {
        setModalVisible(true);
    };
    
    const closeModal = () => {
        setModalVisible(false);
        if (formRef.current) formRef.current.reset(); // Resetea el formulario
    };
    return (
        <DashboardLayout title="Usuarios">
            <div className="container_tablas">
            <div className="table_Header">
                <h2>Usuarios</h2>
                <button className="boton_raro" onClick={openModal}>Crear nuevo</button>
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
            <table className="tabladashb">
                <thead className="tabladashb_thead">
                    <tr>
                        <th className="tabladashb_thead_th">Nombre<ion-icon name="chevron-expand-outline"></ion-icon></th>
                        <th className="tabladashb_thead_th">Rol<ion-icon name="chevron-expand-outline"></ion-icon></th>
                        <th className="tabladashb_thead_th">Estado<ion-icon name="chevron-expand-outline"></ion-icon></th>
                        <th className="tabladashb_thead_th">Operaciones<ion-icon name="chevron-expand-outline"></ion-icon></th>
                    </tr>
                </thead>
                <tbody className="tabladashb_tbody">
                    <tr className="tabladashb_tbody_tr">
                        <td className="tabladashb_tbody_tr_td">Usuario 1</td>
                        <td className="tabladashb_tbody_tr_td">Rol 1</td>
                        <td className="tabladashb_tbody_tr_td">Activa</td>
                        <td className="tabladashb_tbody_tr_td">
                            <a href="#"><ion-icon id="iconosoperacion" name="pencil"></ion-icon></a>
                            <a href="#"><ion-icon id="iconosoperacion" name="trash"></ion-icon></a>
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
            <ModalDashboard show={modalVisible} onClose={closeModal}>
                <form id="miFormulario">
                    <h2 className="modal__title">Crear Usuario</h2>
                    <div className="dashinputs_formulario">
                        <label for="nombre">Nombre:</label>
                        <input type="text" name="nombre" id="nombre" className="dashinputs_formulario_Labels" />
                        <span id="" className="error"></span>
                    </div>
                    <div className="dashinputs_formulario">
                        <label for="apellido">Apellido:</label>
                        <input type="text" name="apellido" id="apellido" className="dashinputs_formulario_Labels" />
                        <span id="" className="error"></span>
                    </div>
                    <div className="dashinputs_formulario">
                        <label for="documento">Documento:</label>
                        <input type="text" name="documento" id="documento" className="dashinputs_formulario_Labels" />
                        <span id="" className="error"></span>
                    </div>
                    <div className="dashinputs_formulario">
                        <label for="correo">Correo:</label>
                        <input type="text" name="correo" id="correo" className="dashinputs_formulario_Labels" />
                        <span id="" className="error"></span>
                    </div>
                    <div className="dashinputs_formulario">
                        <label for="estado">rol:</label>
                        <select name="estado" id="estado" className="dashinputs_formulario_Labels">
                            <option defaultValue>Seleciona Uno</option>
                            <option value="" >rol 1</option>
                            <option value="">rol 2</option>
                        </select>
                        <span id="" className="error"></span>
                    </div>
                    <div className="botones_formulario">
                        <button type="submit" className="boton_formulario">Crear</button>
                        <button className="close__modal" onClick={onClose}>Cancelar</button>
                    </div>
                </form>
            </ModalDashboard>
        </DashboardLayout>
    )
}

export default UsuariosDashboard