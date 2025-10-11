import { useState, useRef, useEffect } from "react"
import { validacionDeCampos } from "../helpers/validacionDeCampos"
import axios from 'axios'
import { authHeader } from "../helpers/authHeader";

export const useHacerPedido = (initial) => {

    const [formPedidosData, setFormPedidosData] = useState(initial)
    const [modalVisibleSalsas, setModalVisibleSalsas] = useState(false);
    const [modalGaseosaVisible, setModalGaseosaVisible] = useState(false);
    const [isCreatingSalsas, setIsCreatingSalsas] = useState(false);
    const [isCreatingGaseosas, setIsCreatingGaseosas] = useState(false);
    const [clientes, setClientes] = useState([])
    const [productos, setProductos] = useState([]);
    const [errores, setErrores] = useState({
        nombreCliente: '',
        productoId: '',
        cantidadProducto: '',
        municipioLocalidad: '',
        direccion: '',
        puntoDeReferencia: '',
        notasAdicionales: ''
    })

    const formRef = useRef(null);

    const OnChangeInputs = ({ target }) => {
        const { name, value } = target

        setFormPedidosData({
            ...formPedidosData,
            [name]: value
        })

        setErrores(prevErrores => ({
            ...prevErrores,
            [name]: validacionDeCampos(name, value)
        }))

    }

    const checkboxs = ({ target }) => {
        const { name, value, checked } = target;

        setFormPedidosData(prev => {
            const updatedData = { ...prev };

            if (name === "tipos_salsas") {
                updatedData.tipos_salsas = checked
                    ? [...prev.tipos_salsas, value]
                    : prev.tipos_salsas.filter(item => item !== value);
            }

            if (name === "tipos_gaseosas") {
                updatedData.tipos_gaseosas = checked
                    ? [...prev.tipos_gaseosas, value]
                    : prev.tipos_gaseosas.filter(item => item !== value);
            }

            return updatedData;
        });
    };


    const restApi = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/pedidos/productos', {
                headers: {
                    'Content-Type': 'application/json',
                    ...authHeader()
                },
            });

            setProductos(res.data);

        } catch (err) {
            console.error('Error al cargar productos', err);
        }
    }


    const restApiClientes = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/pedidos/clientes', {
                headers: {
                    'Content-Type': 'application/json',
                    ...authHeader()
                },
            });

            setClientes(res.data);

        } catch (err) {
            console.error('Error al cargar productos', err);
        }
    }

    const openModalGaseosa = () => {
        setModalGaseosaVisible(true);
    };

    const closeModalGaseosa = () => {
        setModalGaseosaVisible(false);
    };


    const openModalSalsas = () => {
        setModalVisibleSalsas(true);
    };

    const closeModalSalsas = () => {
        setModalVisibleSalsas(false);

    };

    useEffect(() => {
        restApi()
        restApiClientes()
    }, [])

    return {
        OnChangeInputs,
        modalVisibleSalsas,
        formRef,
        closeModalSalsas,
        openModalSalsas,
        formPedidosData,
        checkboxs,
        modalGaseosaVisible,
        openModalGaseosa,
        closeModalGaseosa,
        isCreatingSalsas,
        setIsCreatingSalsas,
        isCreatingGaseosas,
        setIsCreatingGaseosas,
        setFormPedidosData,
        setErrores,
        errores,
        restApi,
        productos,
        restApiClientes,
        clientes
    }
}



