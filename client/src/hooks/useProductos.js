import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useCategorias } from "./useCategorias";
import { authHeader } from "../helpers/authHeader";

const API_URL = "http://localhost:5000/api/productos";


export const useProductos = (initial = {NombreProducto: "", IdCategoria: "", PrecioProducto: "", DescripcionProducto: "", EstadoProducto: ""  }) => {
    const [formProductoData, setFormProductoData] = useState(initial)
    const [modalVisible, setModalVisible] = useState(false);
    const [isCreating, setIsCreating] = useState(false)
    const [productos, setProductos] = useState([])
    const [errores, setErrores] = useState({})
    const formRef = useRef(null)
    const { categorias, cargarCategorias } = useCategorias();


    useEffect(() => {
        cargarProductos()
        cargarCategorias()
    }, []); 

    const cargarProductos = async () => {
        try {
            const res = await axios.get(API_URL, {
                headers: authHeader()
            })
            setProductos(res.data)
        } catch (error) {
            console.error("Error al cargar los productos")
        }
    }

    const validarFormulario = () => {
        const erroresTemp = {};

    // NombreProducto
        if (!formProductoData.NombreProducto.trim()) {
            erroresTemp.NombreProducto = "El nombre es obligatorio";
        } else if (!/^[A-Za-z\s]+$/.test(formProductoData.NombreProducto)) {
            erroresTemp.NombreProducto = "Nombre no válido";
        } else {
            const nombreExiste = productos.some((producto) => 
                producto.NombreProducto.toLowerCase().trim() === formProductoData.NombreProducto.toLowerCase().trim() &&
                producto.Id !== formProductoData.Id
            );
            if (nombreExiste) {
                erroresTemp.NombreProducto = "Este nombre de producto ya existe";
            }
        }

        if (!formProductoData.IdCategoria) {
            erroresTemp.IdCategoria = "Selecciona una categoría";
        }

    // PrecioProducto
        if (!formProductoData.PrecioProducto) {
            erroresTemp.PrecioProducto = "El precio es obligatorio";
        } else if (!/^\d+(\.\d{1,2})?$/.test(formProductoData.PrecioProducto)) {
            erroresTemp.PrecioProducto = "Precio no válido";
        }

    // DescripcionProducto
        if (!formProductoData.DescripcionProducto.trim()) {
            erroresTemp.DescripcionProducto = "La descripción es obligatoria";
        } else if (!/^[A-Za-z0-9\s.,;:!?()-]+$/.test(formProductoData.DescripcionProducto)) {
            erroresTemp.DescripcionProducto = "Descripción no válida";
        }

    // EstadoProducto
        if (!formProductoData.EstadoProducto) {
            erroresTemp.EstadoProducto = "Selecciona un estado";
        }

        setErrores(erroresTemp);
        return Object.keys(erroresTemp).length === 0;
    };

    const onChangeInputs = ({ target }) => {
    const { name, value } = target;
    const nuevoEstado = {
        ...formProductoData,
        [name]: value
    };

    setFormProductoData(nuevoEstado);

    const erroresTemp = { ...errores };

    switch (name) {
        case "NombreProducto":
            if (!value.trim()) {
                erroresTemp.NombreProducto = "El nombre es obligatorio";
            } else if (!/^[A-Za-z\s]+$/.test(value)) {
                erroresTemp.NombreProducto = "Nombre no válido";
            } else if (
                productos.some((producto) =>
                    producto.NombreProducto.toLowerCase().trim() === value.toLowerCase().trim() &&
                    producto.Id !== formProductoData.Id
                )
            ) {
                erroresTemp.NombreProducto = "Este nombre ya existe";
            } else {
                delete erroresTemp.NombreProducto;
            }
            break;

        case "IdCategoria":
            if (!value) {
                erroresTemp.IdCategoria = "Selecciona una categoría";
            } else {
                delete erroresTemp.IdCategoria;
            }
            break;

        case "PrecioProducto":
            if (!value) {
                erroresTemp.PrecioProducto = "El precio es obligatorio";
            } else if (!/^\d+(\.\d{1,2})?$/.test(value)) {
                erroresTemp.PrecioProducto = "Precio no válido";
            } else {
                delete erroresTemp.PrecioProducto;
            }
            break;

        case "DescripcionProducto":
            if (!value.trim()) {
                erroresTemp.DescripcionProducto = "La descripción es obligatoria";
            } else if (!/^[A-Za-z0-9\s.,;:!?()-]+$/.test(value)) {
                erroresTemp.DescripcionProducto = "Descripción no válida";
            } else {
                delete erroresTemp.DescripcionProducto;
            }
            break;

        case "EstadoProducto":
            if (!value) {
                erroresTemp.EstadoProducto = "Selecciona un estado";
            } else {
                delete erroresTemp.EstadoProducto;
            }
            break;

        default:
            break;
    }

    setErrores(erroresTemp);
};


    const guardarProducto = async () => {
        if (!validarFormulario()){
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
            if (formProductoData.Id) {
                await axios.put(`${API_URL}/${formProductoData.Id}`, formProductoData, 
                    {
                        headers: authHeader()
                    });
                Swal.fire({
                    title: "Actualizado",
                    text: "Producto actualizado correctamente",
                    icon: "success",
                    background: "#272727",
                    color: "#c9c9c9"
                });
            } else {
                await axios.post(API_URL, formProductoData, 
                    {
                        headers: authHeader()
                    }
                );
                Swal.fire({
                    title: "Creado",
                    text: "Producto creado correctamente",
                    icon: "success",
                    background: "#272727",
                    color: "#c9c9c9"
                });
            }

            cargarProductos();
            closeModal();
        } catch (error) {
            console.error("Error al guardar producto:", error);
            Swal.fire({
                title: "Error",
                text: "No se pudo guardar el producto",
                icon: "error",
                background: "#272727",
                color: "#c9c9c9"
            });
        }
    };

    const eliminarProducto = async (Id) =>{
        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "Esto eliminará el producto.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            background: "#272727",
            color: "#c9c9c9"
        })

        if (result.isConfirmed){
            try {
                await axios.delete(`${API_URL}/${Id}`, 
                    {
                        headers: authHeader()
                    }
                )
                Swal.fire({
                    title: "Eliminado",
                    text: "Producto eliminado",
                    icon: "success",
                    background: "#272727",
                    color: "#c9c9c9"
                })
                cargarProductos();
            } catch (error) {
                console.error("Error al eliminar producto:", error);
                Swal.fire({
                    title: "Error",
                    text: "No se pudo eliminar el producto",
                    icon: "error",
                    background: "#272727",
                    color: "#c9c9c9"
                });
            }
        }
    };

    const cambiarEstadoProductoInactivo = async (Id) =>{
        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "Esto cambiará el estado del producto a inactiva.\nYa no se visualizará en el apartado principal.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, cambiar estado",
            background: "#272727",
            color: "#c9c9c9",
        })

        try {
            if (result.isConfirmed){
                await axios.put(`${API_URL}/CambiarInactivo/${Id}`,
                    {},
                    { headers: authHeader() }
                )

                Swal.fire({
                    title: "¡Cambio de estado exitoso!",
                    text: "El estado del producto se cambió correctamente.",
                    icon: "success",
                    background: "#272727",
                    color: "#c9c9c9",
                })
                cargarProductos();
            }
        } catch (error) {
            console.error("Error al cambiar el estado del producto:", error);
            Swal.fire({
                title: 'Error',
                text: 'No se puedo cambiar el estado del producto.',
                icon: 'error',
                background: '#272727',
                color: '#c9c9c9'
            })
        }
    }

    const editarProducto = (producto) =>{
        setFormProductoData(producto);
        setIsCreating(false);
        setErrores({});
        setModalVisible(true);
    }
    
    const openModal = () => {
        limpiarFormulario();
        setIsCreating(true);
        setErrores({});
        setModalVisible(true)
    }

    const closeModal = () => {
        setModalVisible(false);
        setErrores({})
        if (formRef.current) formRef.current.reset();
        limpiarFormulario();
    }

    const limpiarFormulario = () =>{
        setFormProductoData({NombreProducto: "", IdCategoria: "", PrecioProducto: "", DescripcionProducto: "", EstadoProducto: ""  })
    }

    return {
        productos,
        cargarProductos,
        guardarProducto,
        eliminarProducto,
        cambiarEstadoProductoInactivo,
        editarProducto,
        formProductoData,
        setFormProductoData,
        onChangeInputs,
        modalVisible,
        openModal,
        closeModal,
        isCreating,
        formRef,
        errores,
        categorias
    }
} 