import { useState, useRef } from "react"
import axios from "axios";
import Swal from "sweetalert2";

export const useClientes = (initial = {NombreCliente: "", NumeroDocumento:"" , CorreoElectronico:"", NumeroContacto:"", EstadoCliente: ""}) => {

    const [modalVisible, SetmodalVisible] = useState(false)
    const [formData, setFormData] = useState(initial)
    const [isCreating, setIsCreating] = useState(false);
    const [clientes, setClientes] = useState([]);
    const formRef = useRef(null);

    const onChangeInputs = ({ target }) => {
        const { name, value } = target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const obtenerClientes = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/cliente/')
            setClientes(res.data)
        } catch (err) {
            console.error("Error al obtener los Clientes:", err);
        }
    }

    const CrearOactualizarCliente = async () => {
        try {
            if (formData.id) {
                await axios.put(`http://localhost:5000/api/cliente/${formData.id}`, formData)
                Swal.fire("Actualizado", "Cliente actualizado correctamente", "success");
            } else {
                await axios.post('http://localhost:5000/api/cliente/', formData);
                Swal.fire({
                    title: "Creado",
                    text: "Cliente creado correctamente",
                    icon: "success",
                    background: "#272727",
                    color: "#c9c9c9",
                });
            }
            obtenerClientes()
            closeModal()
        } catch (err) {
            console.error("Error al crear o actualizar el Cliente:", err);
        }
    }

    const eliminarCliente = async (id) => {
        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "Esto eliminará la categoría.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
        });
        try {
            if (result.isConfirmed) {
                await axios.delete(`http://localhost:5000/api/cliente/${id}`)
                Swal.fire("Eliminado", "cliente eliminada exitosamente", "success");
                obtenerClientes()
            }

        } catch (err) {
            console.error("Error al eliminar el cliente:", err);
            Swal.fire("Error", "No se pudo eliminar el cliente", "error");
        }
    }


     const limpiarFormulario = () => {
        setFormData({ NombreCliente: "", NumeroDocumento:"" , CorreoElectronico:"", NumeroContacto:"", EstadoCliente: "" });
    };

     const editarCliente = (customer) => {
        setFormData(customer);
        setIsCreating(false);
        SetmodalVisible(true);
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
        CrearOactualizarCliente,
        eliminarCliente,
        clientes,
        obtenerClientes,
        editarCliente,
        openModal,
        isCreating,
        modalVisible,
        formRef,
        formData,
        closeModal
    }
}


