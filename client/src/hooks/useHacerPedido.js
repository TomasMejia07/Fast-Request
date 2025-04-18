import { useState, useRef } from "react"

export const useHacerPedido = (initial) => {

    const [formPedidosData, setFormPedidosData] = useState(initial)
    const [tipos_salsas, setTiposSalsas] = useState([]);
    const [tipos_gaseosas, setTiposGaseosas] = useState([]);

    const [modalVisibleSalsas, setModalVisibleSalsas] = useState(false);
    const [modalGaseosaVisible, setModalGaseosaVisible] = useState(false);

    const formRef = useRef(null);

    const OnChangeInputs = ({ target }) => {
        const { name, value } = target

        setFormPedidosData({
            ...formPedidosData,
            [name]: value
        })
    }

    const checkboxs = ({ target }) => {

        const { name, value, checked  } = target

        if (name === "tipos_salsas") {
            setTiposSalsas(prev =>
                checked
                    ? [...prev, value] 
                    : prev.filter(item => item !== value) 
            )
        }
    
        if (name === "tipos_gaseosas") {
            setTiposGaseosas(prev =>
                checked
                    ? [...prev, value]
                    : prev.filter(item => item !== value)
            )
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

    return {
        OnChangeInputs,
        modalVisibleSalsas,
        formRef,
        closeModalSalsas,
        openModalSalsas,
        formPedidosData,
        tipos_salsas,
        tipos_gaseosas,
        checkboxs,
        modalGaseosaVisible,
        openModalGaseosa,
        closeModalGaseosa
    }
}



