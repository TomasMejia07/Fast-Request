import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const API_URL = "http://localhost:5000/api/categorias";

export const useCategorias = (initial = { NombreCategoria: "", EstadoCategoria: "" }) => {
    const [formCategoriaData, setFormCategoriaData] = useState(initial);
    const [modalVisible, setModalVisible] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [categorias, setCategorias] = useState([]);
    const [errores, setErrores] = useState({});
    const formRef = useRef(null);

    useEffect(() => {
        cargarCategorias();
    }, []);

    const cargarCategorias = async () => {
        try {
            const res = await axios.get(API_URL);
            setCategorias(res.data);
        } catch (error) {
            console.error("Error al cargar categorías:", error);
            Swal.fire("Error", "No se pudo cargar los datos de la categoría", "error");
        }
    };

    const validarFormulario = () => {
        const erroresTemp = {};

        if (!formCategoriaData.NombreCategoria.trim()) {
            erroresTemp.NombreCategoria = "El nombre es obligatorio";
        } else if (!/^[A-Za-z]/.test(formCategoriaData.NombreCategoria)) {
            erroresTemp.NombreCategoria = "Nombre no valido";
        } else {
            const nombreExiste = categorias.some((cat) =>
                cat.NombreCategoria.toLowerCase().trim() === formCategoriaData.NombreCategoria.toLowerCase().trim() &&
                cat.Id !== formCategoriaData.Id
            );
            if (nombreExiste) {
                erroresTemp.NombreCategoria = "Este nombre de categoria ya existe";
            }
        }

        if (!formCategoriaData.EstadoCategoria) {
            erroresTemp.EstadoCategoria = "Selecciona un estado";
        }

        setErrores(erroresTemp);
        return Object.keys(erroresTemp).length === 0;
    };

    const onChangeInputs = ({ target }) => {
        const { name, value } = target;
        const nuevoEstado = {
            ...formCategoriaData,
            [name]: value
        };

        setFormCategoriaData(nuevoEstado);

        // Validación en tiempo real
        const erroresTemp = { ...errores };
            if (name === "NombreCategoria") {
                if (!value.trim()) {
                    erroresTemp.NombreCategoria = "El nombre es obligatorio";
                } else if (!/^[A-Za-z]/.test(value)) {
                    erroresTemp.NombreCategoria = "Nombre no valido";
                } else if (
                    categorias.some((cat) =>
                        cat.NombreCategoria.toLowerCase().trim() === value.toLowerCase().trim() &&
                        cat.Id !== formCategoriaData.Id
                    )
                ) {
                    erroresTemp.NombreCategoria = "Este nombre de categoria ya existe";
                } else {
                    delete erroresTemp.NombreCategoria;
                }
            }

            if (name === "EstadoCategoria") {
                if (!value) {
                    erroresTemp.EstadoCategoria = "Selecciona un estado";
                } else {
                    delete erroresTemp.EstadoCategoria;
                }
            }

        setErrores(erroresTemp);
    };

    const guardarCategoria = async () => {
        if (!validarFormulario()) {
            Swal.fire({
                title: "Datos no validos",
                text: "Digita correctamente los datos del formulario",
                icon: "error",
                background: "#272727",
                color: "#c9c9c9"
            });
            return;
        }

        try {
            if (formCategoriaData.Id) {
                await axios.put(`${API_URL}/${formCategoriaData.Id}`, formCategoriaData);
                Swal.fire({
                    title: "Actualizado",
                    text: "Categoría actualizada correctamente",
                    icon: "success",
                    background: "#272727",
                    color: "#c9c9c9"
                });
            } else {
                await axios.post(API_URL, formCategoriaData);
                Swal.fire({
                    title: "Creado",
                    text: "Categoría creada correctamente",
                    icon: "success",
                    background: "#272727",
                    color: "#c9c9c9"
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
                color: "#c9c9c9"
            });
        }
    };

    const eliminarCategoria = async (Id) => {
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
                await axios.delete(`${API_URL}/${Id}`);
                Swal.fire({
                    title: "Eliminado",
                    text: "Categoría eliminada",
                    icon: "success",
                    background: "#272727",
                    color: "#c9c9c9"
                });
                cargarCategorias();
            } catch (error) {
                console.error("Error al eliminar categoría:", error);
                Swal.fire({
                    title: "Error",
                    text: "No se pudo eliminar la categoría",
                    icon: "error",
                    background: "#272727",
                    color: "#c9c9c9"
                });
            }
        }
    };

    const editarCategoria = (categoria) => {
        setFormCategoriaData(categoria);
        setIsCreating(false);
        setErrores({});
        setModalVisible(true);
    };

    const openModal = () => {
        limpiarFormulario();
        setIsCreating(true);
        setErrores({});
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setErrores({});
        if (formRef.current) formRef.current.reset();
        limpiarFormulario();
    };

    const limpiarFormulario = () => {
        setFormCategoriaData({ NombreCategoria: "", EstadoCategoria: "" });
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
        formRef,
        errores
    };
};
