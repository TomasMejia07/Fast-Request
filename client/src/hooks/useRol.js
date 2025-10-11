import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import { authHeader } from "../helpers/authHeader";

const API_URL = "http://localhost:5000/api/rol"


export const useRol = (initial = {NombreRol: "", EstadoRol: ""}) => {
    const [formRolData, setFormRolData] = useState(initial)
    const [modalVisible, setModalVisible] = useState(false);
    const [isCreating, setIsCreating] = useState(false)
    const formRef = useRef(null)
    const [errores, setErrores] = useState({})
    const [roles, setRoles] = useState([])

    useEffect(() =>{
        cargarRol()
    }, [])

    const cargarRol = async () =>{
        try {
            const res = await axios.get(API_URL, {
                headers: authHeader()
            })
            setRoles(res.data)
        } catch (error) {
            console.error("Error al cargar los roles")
        }
    }

    const validarFormulario = () => {
        const erroresTemp = {}

        if (!formRolData.NombreRol.trim()) {
            erroresTemp.NombreRol = "El nombre es obligatorio";
        } else if (!/^[A-Za-z]/.test(formRolData.NombreRol)) {
            erroresTemp.NombreRol = "Nombre no valido";
        } else {
            const nombreExiste = roles.some((rol) =>
                rol.NombreRol.toLowerCase().trim() === formRolData.NombreRol.toLowerCase().trim() &&
                rol.Id !== formRolData.Id
            );
            if (nombreExiste) {
                erroresTemp.NombreRol = "Este nombre de rol ya existe";
            }
        }

        if (!formRolData.EstadoRol) {
            erroresTemp.EstadoRol = "Selecciona un estado";
        }

        setErrores(erroresTemp);
        return Object.keys(erroresTemp).length === 0;
    }

    const onChangeInputs = ({ target }) => {
        const { name, value } = target;
        const nuevoEstado = {
            ...formRolData,
            [name]: value
        };

        setFormRolData(nuevoEstado);

        // Validación en tiempo real
        const erroresTemp = { ...errores };
            if (name === "NombreRol") {
                if (!value.trim()) {
                    erroresTemp.NombreRol = "El nombre es obligatorio";
                } else if (!/^[A-Za-z]/.test(value)) {
                    erroresTemp.NombreRol = "Nombre no valido";
                } else if (
                    roles.some((rol) =>
                        rol.NombreRol.toLowerCase().trim() === value.toLowerCase().trim() &&
                        rol.Id !== formRolData.Id
                    )
                ) {
                    erroresTemp.NombreRol = "Este nombre de rol ya existe";
                } else {
                    delete erroresTemp.NombreRol;
                }
            }

            if (name === "EstadoRol") {
                if (!value) {
                    erroresTemp.EstadoRol = "Selecciona un estado";
                } else {
                    delete erroresTemp.EstadoRol;
                }
            }

        setErrores(erroresTemp);
    };

    const guardarRol = async (permisosSeleccionados = []) => {
    if (!validarFormulario()) {
        Swal.fire({ 
            title: "Datos no válidos", 
            text: "Digita correctamente los datos", 
            icon: "error", 
            background: "#272727", 
            color: "#c9c9c9" });
        return;
    }

    const payload = {
        ...formRolData,
        Permisos: permisosSeleccionados  // enviar permisos aquí
    };

    try {
        if (formRolData.Id) {
            await axios.put(`${API_URL}/${formRolData.Id}`, payload, {
                headers: authHeader()
            });
            Swal.fire({ 
                title: "Actualizado", 
                text: "Rol actualizado", 
                icon: "success", background: 
                "#272727", 
                color: "#c9c9c9" });
        } else {
            await axios.post(API_URL, payload, {
                headers: authHeader()
            });
            Swal.fire({ 
                title: "Creado", 
                text: "Rol creado", 
                icon: "success", 
                background: "#272727", 
                color: "#c9c9c9" });
        }
        cargarRol();
        closeModal();
    } catch (error) {
        console.error("Error al guardar rol:", error);
        Swal.fire({ 
            title: "Error", 
            text: "No se pudo guardar el rol", 
            icon: "error", 
            background: "#272727", 
            color: "#c9c9c9" });
    }
};

    const eliminarRol = async (Id) =>{
        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "Esto eliminará el Rol.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            background: "#272727",
            color: "#c9c9c9"
        })

        if (result.isConfirmed){
            try {
                await axios.delete(`${API_URL}/${Id}`, {
                    headers: authHeader()
                })
                Swal.fire({
                    title: "Eliminado",
                    text: "Rol eliminado",
                    icon: "success",
                    background: "#272727",
                    color: "#c9c9c9"
                })
                cargarRol();
            } catch (error) {
                console.error("Error al eliminar rol:", error);
                Swal.fire({
                    title: "Error",
                    text: "No se pudo eliminar el rol",
                    icon: "error",
                    background: "#272727",
                    color: "#c9c9c9"
                });
            }
        }
    };

    const editarRol = (rols) =>{
        setFormRolData(rols);
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
        setFormRolData({NombreRol: "", EstadoRol: ""})
    }

    return{
        roles,
        cargarRol,
        guardarRol,
        eliminarRol,
        editarRol,
        openModal,
        closeModal,
        formRolData,
        setFormRolData,
        onChangeInputs,
        modalVisible,
        isCreating,
        formRef,
        errores,
    }
}