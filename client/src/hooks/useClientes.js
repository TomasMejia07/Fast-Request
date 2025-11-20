import { useState, useRef } from "react"
import axios from "axios";
import Swal from "sweetalert2";
import { validacionDeCampos } from "../helpers/validacionDeCampos";
import { authHeader } from "../helpers/authHeader";

export const useClientes = (initial = { NombreCliente: "", CorreoElectronico: "", NumeroContacto: "", EstadoCliente: "activo" }) => {

    const [modalVisible, SetmodalVisible] = useState(false)
    const [formData, setFormData] = useState(initial)
    const [isCreating, setIsCreating] = useState(false);
    const [clientes, setClientes] = useState([]);
    const formRef = useRef(null);
    const [errores, setErrores] = useState({
        NombreCliente: '',
        CorreoElectronico: '',
        NumeroContacto: '',
        repeated: '',
    })

    const onChangeInputs = ({ target }) => {
        const { name, value } = target
        setFormData({
            ...formData,
            [name]: value
        })

        setErrores(prevErrores => ({
            ...prevErrores,
            [name]: validacionDeCampos(name, value)
        }))

    }

    const obtenerClientes = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/cliente/',
                {
                    headers: authHeader()
                }
            )
            setClientes(res.data)
        } catch (err) {
            console.error("Error al obtener los Clientes:", err);
        }
    }


    const CrearCliente = async () => {
        try {
            await axios.post('http://localhost:5000/api/cliente/', formData,
                {
                    headers: authHeader()
                }
            );
            Swal.fire({
                title: "Creado",
                text: "Cliente creado correctamente",
                icon: "success",
                background: "#272727",
                color: "#c9c9c9",
            });

            obtenerClientes()
            closeModal()
        } catch (err) {
            console.error("Error al crear el Cliente:", err);
        }
    }

    const cambiarEstadoCliente = async (Id) => {
        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "Esto cambiara el estado del cliente, \n ya no se visualizara en el apartado principal.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, cambiar estado",
            background: "#272727",
            color: "#c9c9c9",
        });
        try {
            if (result.isConfirmed) {
                await axios.put(`http://localhost:5000/api/cliente/inactivo/${Id}`,
                    {},
                    {
                        headers: authHeader()
                    }
                )
                Swal.fire({
                    title: "¡Cambio de estado exitoso!",
                    text: "El cambio de estado del cliente a sido exitoso",
                    icon: "success",
                    background: "#272727",
                    color: "#c9c9c9",
                });

                Swal.fire("¡Cambio de estado exitoso!", "El cambio de estado del cliente a sido exitoso", "success");
                obtenerClientes()
            }

        } catch (err) {
            console.error("Error al cambiar el estado del cliente:", err);
            Swal.fire("Error", "No se cambiar el estado del cliente", "error");
        }
    }



    const validacionDeClientes = async () => {
        try {

            const res = await axios.post(`http://localhost:5000/api/cliente/verify-duplicate`, formData,
                {
                    headers: authHeader()
                },
            )

            return {
                CorreoElectronico: res.data.CorreoElectronico.mensaje || '',
                NumeroContacto: res.data.NumeroContacto.mensaje || ''
            }

        } catch (error) {
            console.error("Error al validar duplicados:", error);

            if (error.response?.status >= 500 || !error.response) {
                Swal.fire({
                    title: "Error",
                    text: "No se pudo validar la información. Intente nuevamente.",
                    icon: "error",
                    background: "#272727",
                    color: "#c9c9c9",
                });
            }
        }
    }


    const limpiarFormulario = () => {
        setFormData({ NombreCliente: "",CorreoElectronico: "", NumeroContacto: "", EstadoCliente: "activo" });
    };


    const openModal = () => {
        limpiarFormulario()
        setIsCreating(true)
        SetmodalVisible(true)
    }

    const closeModal = () => {
        SetmodalVisible(false);
        if (formRef.current) formRef.current.reset();
        limpiarFormulario();
    };

    return {
        onChangeInputs,
        CrearCliente,
        cambiarEstadoCliente,
        clientes,
        obtenerClientes,
        openModal,
        isCreating,
        modalVisible,
        formRef,
        formData,
        closeModal,
        errores,
        setErrores,
        validacionDeClientes
    }
}


