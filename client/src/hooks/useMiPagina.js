import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios"
import { useParams } from "react-router-dom";

const API_URL = "http://localhost:5000/api/categorias/categorias";
const API_URL2 = "http://localhost:5000/api/productos/productos";
const API_EMPRESA = "http://localhost:5000/api/empresa/empresaPublic"
// Extraccion del token y decodificación

export const useMiPagina = () => {

    const [categorias, setCategorias] = useState([]);
    const [productos, setProductos] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(1);
    const [empresaId, setEmpresaId] = useState(null);
    const [empresaNombre, setEmpresaNombre] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { empresaSlug } = useParams();

    const VisualizarCategoriasMenu = async () => {
        try {

            if (!empresaId) return

            const res = await axios.get(API_URL, {
                params: {
                    empresaId
                }
            })

            setCategorias(res.data)
        } catch (error) {
            console.error("Error al cargar categorías:", error);
            Swal.fire("Error", "Error al cargar las categorías", "error");
        }
    }

    const cargarProductos = async () => {
        try {

            if (!empresaId) return

            const res = await axios.get(API_URL2,
                {
                    params: {
                        empresaId
                    }
                })

            setProductos(res.data)
        } catch (error) {
            console.error("Error al cargar los productos")
            Swal.fire("Error", "Error al cargar los productos", "error");
        }
    }

    useEffect(() => {

        if (!empresaSlug) {
            setError("No se proporcionó el identificador de la empresa");
            setLoading(false);
            return;
        }

        const obtenerEmpresa = async () => {
            try {

                setLoading(true);

                console.log('🔍 Buscando empresa con slug:', empresaSlug);


                const res = await axios.get(`${API_EMPRESA}/${empresaSlug}`);

                console.log('✅ Empresa encontrada:', res.data);
                setEmpresaId(res.data.empresaId);
                setEmpresaNombre(res.data.nombre);
                setError(null)

            } catch (error) {
                console.error("❌ Error al obtener empresa:", error);
                setError("No se pudo encontrar la empresa");
                Swal.fire({
                    icon: "error",
                    title: "Empresa no encontrada",
                    text: "La página que buscas no existe o no está disponible"
                });
            } finally {
                setLoading(false);
            }
        }
        obtenerEmpresa()
    }, [empresaSlug]);


    useEffect(() => {
        if (empresaId) {
            VisualizarCategoriasMenu();
            cargarProductos();
        }
    }, [empresaId]);

    return {
        categorias,
        productos,
        setCategoriaSeleccionada,
        categoriaSeleccionada,
        empresaNombre,
        loading,
        error,
    }
}