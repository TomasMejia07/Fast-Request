import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authHeader } from "../helpers/authHeader";
import Swal from "sweetalert2";

export const useProductosInactivos = () => {

    const navigate = useNavigate();
    const [productos, setProductos] = useState([]);

    const visualizarProductosInactivos = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/productos/Productos-inactivos',  {
                headers: authHeader(),
            })
            setProductos(res.data)
        } catch (error) {
            console.error('Error al obtener los productos inactivos: ', err)
        }
    }

    const cambiarEstadoProducto = async (Id) => {
        try {
            await axios.put(`http://localhost:5000/api/productos/CambiarActivo/${Id}`,
            {},
            {
                headers: authHeader()
            })

            Swal.fire({
                title: '¡Cambio de estado exitoso!',
                text: 'El producto ha sido activado',
                icon: 'success',
                background: '#272727',
                color: '#c9c9c9'
            })

            visualizarProductosInactivos();
        } catch (error) {
            console.error('Error al cambiar el estado del producto: ', error);
            Swal.fire({
                title: 'Error',
                text: 'No se puedo cambiar el estado del producto.',
                icon: 'error',
                background: '#272727',
                color: '#c9c9c9'
            })
        }
    }

    const volverAlInicio = (e) => {
        e.preventDefault();
        navigate('/dashboard/productos');
    };

    useEffect(() => {
        visualizarProductosInactivos()
    }, []);

    return {
        productos,
        cambiarEstadoProducto,
        volverAlInicio
    }
}