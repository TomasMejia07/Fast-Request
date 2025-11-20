import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authHeader } from '../helpers/authHeader';
import Swal from 'sweetalert2';

export const useCategoriasInactivas = () => {

    const navigate = useNavigate();
    const [categorias, setCategorias] = useState([]);

    // ✅ Obtener todas las categorías inactivas
    const visualizarCategoriasInactivas = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/categorias/Categorias-inactivas', {
                headers: authHeader(),
            });
            setCategorias(res.data);
        } catch (err) {
            console.error('Error al obtener las categorías inactivas:', err);
        }
    };

    // ✅ Cambiar estado de categoría (activar)
    const cambiarEstadoCategoria = async (Id) => {
        try {
            await axios.put(
                `http://localhost:5000/api/categorias/CambiarActivo/${Id}`,
                {},
                { headers: authHeader() }
            );

            Swal.fire({
                title: '¡Cambio de estado exitoso!',
                text: 'La categoría ha sido activada correctamente.',
                icon: 'success',
                background: '#272727',
                color: '#c9c9c9',
            });

            // Refrescar lista
            visualizarCategoriasInactivas();

        } catch (err) {
            console.error('Error al cambiar el estado de la categoría:', err);
            Swal.fire('Error', 'No se pudo cambiar el estado de la categoría.', 'error');
        }
    };

    const eliminarCategoria = async (Id) => {
        console.log("ID recibido para eliminar:", Id);
        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "Esto eliminará la categoría.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            background: "#272727",
            color: "#c9c9c9"
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`http://localhost:5000/api/categorias/CategoriasInactivas/${Id}`, {
                    headers: authHeader()
                });
                Swal.fire("Eliminado", "Categoría eliminada", "success");
                visualizarCategoriasInactivas();
            } catch (error) {
                console.error("Error al eliminar categoría:", error);
                Swal.fire({
                    title: "Error",
                    text: "Error al eliminar categoria",
                    icon: "error",
                    background: "#272727",
                    color: "#c9c9c9"
                });
            }
        }
    };

    // ✅ Volver al panel principal de categorías
    const volverAlInicio = (e) => {
        e.preventDefault();
        navigate('/dashboard/categoria');
    };

    useEffect(() => {
        visualizarCategoriasInactivas();
    }, []);

    return {
        categorias,
        cambiarEstadoCategoria,
        volverAlInicio,
    };
};
