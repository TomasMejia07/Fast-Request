import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios"
import { authHeader } from "../helpers/authHeader";


const API_URL = "http://localhost:5000/api/pedidos";

const useCocina = () => {
    const [pedidos, setPedidos] = useState([]);
    const nagivate = useNavigate();

    const obtenerPedidosEnCocina = async ( ) => {
        try {
            const res = await axios.get(`${API_URL}/obtenerPedidosEnCocina`,
                {
                    headers: authHeader()
                }
            )
            setPedidos(res.data)
        } catch (error) {
            console.log("Error al obtener los pedidos",error);

        }
    }

    const CambioDeEstado = async (Id) => {
        try {
            const result = await Swal.fire({
                title: "¿Estas seguro?",
                text: "Esto cambiará el estado a completado.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Si, cambiar estado",
                background: "#272727",
                color: "#c9c9c9"
            })
            if(result.isConfirmed){
                await axios.put(`${API_URL}/cambiarEstadoPedido/${Id}`,
                { "nuevoEstado": "terminado" },
                {
                    headers: authHeader()
                }
                )
                Swal.fire({
                    title: "¡Cambio de estado exitoso!",
                    text: "El estado del pedido se cambió correctamente.",
                    icon: "success",
                    background: "#272727",
                    color: "#c9c9c9"
                })
                obtenerPedidosEnCocina();
            }
        } catch (error) {
            console.error("Error al cambiar el estado del pedido:", error);    
        }
    }

    return {
        pedidos,
        obtenerPedidosEnCocina,
        CambioDeEstado
    }
}

export default useCocina