import { useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const API_URL = "http://localhost:5000/api/categorias"; // Cambia si tu backend usa otra URL

export const useCategorias = (initial = { NombreCategoria: "", EstadoCategoria: "" }) => {
    const [formCategoriaData, setFormCategoriaData] = useState(initial);
    const [modalVisible, setModalVisible] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [categorias, setCategorias] = useState([]);
    const formRef = useRef(null);

    //  Manejo de inputs
    const onChangeInputs = ({ target }) => {
        const { name, value } = target;
        setFormCategoriaData({
            ...formCategoriaData,
            [name]: value
        });
    };

    //  Cargar categorías desde la API
    const cargarCategorias = async () => {
        try {
            const res = await axios.get(API_URL);
            setCategorias(res.data);
        } catch (error) {
            console.error("Error al cargar categorías:", error);
        }
    };

    //  Crear o actualizar categoría
    const guardarCategoria = async () => {
        try {
            if (formCategoriaData.id) {
                await axios.put(`${API_URL}/${formCategoriaData.id}`, formCategoriaData);
                Swal.fire("Actualizado", "Categoría actualizada correctamente", "success");
            } else {
                await axios.post(API_URL, formCategoriaData);
                Swal.fire({
                    title: "Creado",
                    text: "Categoría creada correctamente",
                    icon: "success",
                    background: "#272727", // Posible Alerta quizas uy poco mas de estilos yo creo
                    color: "#c9c9c9",      
                });
            }
            cargarCategorias();
            closeModal();
        } catch (error) {
            console.error("Error al guardar categoría:", error);
            Swal.fire({
                title: "Error",
                text: "No se pudo guardar la categoría",
                icon: "error",
                background: "#272727", 
                color: "#c9c9c9",      
            });
        }
    };

    //  Eliminar categoría con confirmación
    const eliminarCategoria = async (id) => {
        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "Esto eliminará la categoría.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                Swal.fire("Eliminado", "Categoría eliminada", "success");
                cargarCategorias();
            } catch (error) {
                console.error("Error al eliminar categoría:", error);
                Swal.fire("Error", "No se pudo eliminar la categoría", "error");
            }
        }
    };

    //  Editar categoría (carga los datos en el formulario)
    const editarCategoria = (categoria) => {
        setFormCategoriaData(categoria);
        setIsCreating(false); // Estamos editando
        setModalVisible(true);
    };
    

    //  Limpiar formulario
    const limpiarFormulario = () => {
        setFormCategoriaData({ NombreCategoria: "", EstadoCategoria: "" });
    };

    //  Abrir y cerrar modal
    const openModal = () => {
        limpiarFormulario();
        setIsCreating(true); // Ahora sí, solo para crear
        setModalVisible(true);
    };
    

    const closeModal = () => {
        setModalVisible(false);
        if (formRef.current) formRef.current.reset();
        limpiarFormulario();
    };

    return {
        categorias,
        cargarCategorias,
        guardarCategoria,
        eliminarCategoria,
        editarCategoria,
        formCategoriaData,
        setFormCategoriaData,
        onChangeInputs,
        modalVisible,
        openModal,
        closeModal,
        isCreating,
        formRef
    };
};
