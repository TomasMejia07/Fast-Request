import React, { useRef, useState, useEffect } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import ModalDashboard from "../../components/Dashboard/ModalDashboard";

import axios from 'axios'

const PedidosDashboard = ({ onClose }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [fullPedidos, setFullPedidos] = useState([])
    const formRef = useRef(null);


    const obtenerPedidos = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/pedidos/ObtenerPedidos')
            setFullPedidos(res.data);
        } catch (err) {
             console.error('Error al cargar pedidos:', err);
        }
    }

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        if (formRef.current) formRef.current.reset(); // Resetea el formulario
    };

    useEffect(() => {
        obtenerPedidos()
    }, [])



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
                            <th className="tabladashb_thead_th">Tipo de Producto<ion-icon name="chevron-expand-outline"></ion-icon></th>
                            <th className="tabladashb_thead_th">Cantidad del Producto<ion-icon name="chevron-expand-outline"></ion-icon></th>
                            <th className="tabladashb_thead_th">Fecha del Pedido<ion-icon name="chevron-expand-outline"></ion-icon></th>
                            <th className="tabladashb_thead_th">Operaciones<ion-icon name="chevron-expand-outline"></ion-icon></th>
                        </tr>
                    </thead>
                    <tbody className="tabladashb_tbody">
                        {fullPedidos.map((p) => (
                            <tr className="tabladashb_tbody_tr" key={p.id}>
                                <td className="tabladashb_tbody_tr_td">Orden {p.id}</td>
                                <td className="tabladashb_tbody_tr_td">{p.tipoProducto}</td>
                                <td className="tabladashb_tbody_tr_td">{p.cantidadProducto}</td>
                                <td className="tabladashb_tbody_tr_td">{new Date(p.createdAt).toLocaleDateString()}</td>
                                <td className="tabladashb_tbody_tr_td">
                                    <button className="detalles_pedido" onClick={openModal}><ion-icon id="iconosoperaciondetalles" name="filter"></ion-icon></button>
                                </td>
                            </tr>
                        ))}
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


