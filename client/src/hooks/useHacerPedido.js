import { useState, useRef } from "react"
import { validacionDeCampos } from "../helpers/validacionDeCampos"

export const useHacerPedido = (initial) => {

    const [formPedidosData, setFormPedidosData] = useState(initial)
    const [modalVisibleSalsas, setModalVisibleSalsas] = useState(false);
    const [modalGaseosaVisible, setModalGaseosaVisible] = useState(false);
    const [isCreatingSalsas, setIsCreatingSalsas] = useState(false);
    const [isCreatingGaseosas, setIsCreatingGaseosas] = useState(false);
    const [errores, setErrores] = useState({
        nombreCliente: '',
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

        setErrores({
            ...errores,
            [name]: validacionDeCampos(name, value)
        })

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
        errores
    }
}



