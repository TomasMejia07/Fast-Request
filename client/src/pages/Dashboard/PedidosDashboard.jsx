import React, { useRef, useState } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import ModalDashboard from "../../components/Dashboard/ModalDashboard";

const PedidosDashboard = ({ onClose }) => {
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
        <DashboardLayout title="Pedidos">
                <div className="container_tablas">
                <div className="table_Header">
                    <h2>Pedidos</h2>
                    <select className="select_tabla" name="" id="">
                        <option defaultValue>Tiempo</option>
                    </select>
                    <div className="input_search">
                        <input type="search" placeholder="Buscar" />
                        <ion-icon id="search-sharp" name="search-sharp"></ion-icon>
                    </div>
                </div> 
            <table className="tabladashb">
                <thead className="tabladashb_thead">
                    <tr>
                        <th className="tabladashb_thead_th">Id Pedido<ion-icon name="chevron-expand-outline"></ion-icon></th>
                        <th className="tabladashb_thead_th">Precio<ion-icon name="chevron-expand-outline"></ion-icon></th>
                        <th className="tabladashb_thead_th">Fecha<ion-icon name="chevron-expand-outline"></ion-icon></th>
                        <th className="tabladashb_thead_th">Operaciones<ion-icon name="chevron-expand-outline"></ion-icon></th>
                    </tr>
                </thead>
                <tbody className="tabladashb_tbody">
                    <tr className="tabladashb_tbody_tr">
                        <td className="tabladashb_tbody_tr_td">Orden 1</td>
                        <td className="tabladashb_tbody_tr_td">$100.00</td>
                        <td className="tabladashb_tbody_tr_td">2022/20/2 13:00</td>
                        <td className="tabladashb_tbody_tr_td">
                            <button className="detalles_pedido" onClick={openModal}><ion-icon id="iconosoperaciondetalles" name="filter"></ion-icon></button>
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
            <ModalDashboard show={modalVisible} onClose={closeModal}>
                <form ref={formRef}>
                <h2 className="modal__title">Detalles del Pedido</h2>
                <div className="botones_formulario">
                    <button type="submit" className="boton_formulario">Modificar</button>
                    <button className="close__modal" onClick={onClose}>Cerrar </button>
                </div>
                </form>
            </ModalDashboard>
        </DashboardLayout>
    )
}

export default PedidosDashboard