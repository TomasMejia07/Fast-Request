import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios"
import { authHeader } from "../helpers/authHeader";

const API_URL = "http://localhost:5000/api/categorias/";
const API_URL2 = "http://localhost:5000/api/productos/";

export const useMiPaginaEdit = () => {

    const [categorias, setCategorias] = useState([]);
    const [productos, setProductos] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(1);

    const VisualizarCategoriasMenu = async () => {
        try {
            const res = await axios.get(API_URL, { headers: authHeader() })
            setCategorias(res.data)
        } catch (error) {
            console.error("Error al cargar categorías:", error);
            Swal.fire("Error", "No se pudo cargar los datos de la categoría", "error");
        }
    }

    const cargarProductos = async () => {
        try {
            const res = await axios.get(API_URL2, { headers: authHeader() })
            setProductos(res.data)
        } catch (error) {
            console.error("Error al cargar los productos")
        }
    }

    useEffect(() => {
        VisualizarCategoriasMenu();
        cargarProductos();
    }, []);

    return {
        categorias,
        productos,
        setCategoriaSeleccionada,
        categoriaSeleccionada
    }
}