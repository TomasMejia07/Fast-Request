import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { authHeader } from "../helpers/authHeader";
import Swal from 'sweetalert2';
import { validacionDeCampos } from '../helpers/validacionDeCampos';

export const useComplementos = (initialSalsas = { nombreSalsa: "", estadoSalsa: "activo" }, initialGaseosas = { nombreGaseosa: "", estadoGaseosa: "" }) => {
    const [dataSalsas, setDataSalsas] = useState([]);
    const [dataGaseosas, setDataGaseosas] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [modalTipo, setModalTipo] = useState('salsa')
    const [forComplementosData, setForComplementosData] = useState(
        modalTipo === 'salsa' ? initialSalsas : initialGaseosas
    );
    const [busquedaSalsa, setBusquedaSalsa] = useState('')
    const [busquedaGaseosa, setBusquedaGaseosa] = useState('')
    const [paginacionActualSalsas, setPaginacionActualSalsas] = useState(1)
    const [paginacionActualGaseosas, setPaginacionActualGaseosas] = useState(1)
    const [errores, setErrores] = useState({
        nombreSalsa: "",
        nombreGaseosa: ""
    })

    const formRef = useRef(null);

    const onChangeInputs = async ({ target }) => {
        const { name, value } = target;
        setForComplementosData({
            ...forComplementosData,
            [name]: value
        });

        const tipo = name === 'nombreSalsa' ? 'salsa' : 'gaseosa'

        const mensajeError = await validacionDeComplementos(tipo, value)

        setErrores(prev => ({
            ...prev,
            [name]: validacionDeCampos(name, value) || mensajeError
        }))
    };


    const validacionesDeCampos = () => {
        const nombreSalsaError = validacionDeCampos('nombreSalsa', forComplementosData.nombreSalsa, dataSalsas)
        const nombreGaseosaError = validacionDeCampos('nombreGaseosa', forComplementosData.nombreGaseosa, dataGaseosas)

        setErrores({
            nombreSalsa: nombreSalsaError,
            nombreGaseosa: nombreGaseosaError
        })

        return nombreSalsaError || nombreGaseosaError

    }


    const resApiSalsas = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/complementos/obtener-salsas', {
                headers: authHeader()
            });
            setDataSalsas(res.data.salsas || res.data);
        } catch (err) {
            console.log('Error al obtener las salsas de la base de datos');
        }
    };

    const resApiGaseosas = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/complementos/obtener-gaseosas', {
                headers: authHeader()
            });
            setDataGaseosas(res.data.gaseosas || res.data);
        } catch (err) {
            console.log('Error al obtener las gaseosas de la base de datos');
        }
    };

    const ComplementosSalsas = async () => {
        try {
            if (forComplementosData.id) {
                await axios.put(`http://localhost:5000/api/complementos/update-salsa/${forComplementosData.id}`,
                    forComplementosData,
                    {
                        headers: authHeader()
                    });

                Swal.fire("Actualizado", "Salsa actualizada correctamente", "success");
            } else {

                await axios.post('http://localhost:5000/api/complementos/create-salsa', forComplementosData,
                    {
                        headers: authHeader()
                    });

                Swal.fire("Creado", "Salsa creada correctamente", "success");
            }

            await resApiSalsas();
            closeModal();
        } catch (error) {
            console.error("Error al crear o actualizar la salsa:", error);
            Swal.fire("Error", "No se pudo guardar la salsa", "error");
        }
    };

    const ComplementosGaseosas = async () => {
        try {
            if (forComplementosData.id) {

                await axios.put(`http://localhost:5000/api/complementos/update-gaseosa/${forComplementosData.id}`,
                    forComplementosData,
                    {
                        headers: authHeader()
                    });

                Swal.fire("Actualizado", "Gaseosa actualizada correctamente", "success");
            } else {

                await axios.post('http://localhost:5000/api/complementos/create-gaseosa', forComplementosData,
                    {
                        headers: authHeader()
                    });

                Swal.fire("Creado", "Gaseosa creada correctamente", "success");
            }

            await resApiGaseosas();
            closeModal();
        } catch (error) {
            console.error("Error al crear o actualizar la gaseosa:", error);
            Swal.fire("Error", "No se pudo guardar la gaseosa", "error");
        }
    };



    const cambiarEstadoSalsa = async (id) => {
        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "Esto cambiara el estado de la salsa.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, cambiar estado",
            background: "#272727",
            color: "#c9c9c9",
        });

        try {

            if (result.isConfirmed) {
                await axios.put(`http://localhost:5000/api/complementos/update-estado-inactivo-salsa/${id}`,
                    {},
                    {
                        headers: authHeader()
                    }
                )
                Swal.fire({
                    title: "¡Cambio de estado exitoso!",
                    text: "El cambio de estado de la salsa a sido exitoso",
                    icon: "success",
                    background: "#272727",
                    color: "#c9c9c9",
                });

                Swal.fire("¡Cambio de estado exitoso!", "El cambio de estado de la salsa a sido exitoso", "success");
                resApiSalsas()
            }

        } catch (err) {
            console.error("Error al cambiar el estado de la salsa:", err);
            Swal.fire({
                title: "Error",
                text: 'Error al cambiar el estado de la salsa',
                icon: "error",
                background: "#272727",
                color: "#c9c9c9",
            });
        }
    };


    const cambiarEstadoGaseosa = async (id) => {
        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "Esto cambiara el estado de la gaseosa.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, cambiar estado",
            background: "#272727",
            color: "#c9c9c9",
        });

        try {

            if (result.isConfirmed) {
                await axios.put(`http://localhost:5000/api/complementos/update-estado-inactivo-gaseosa/${id}`,
                    {},
                    {
                        headers: authHeader()
                    }
                )
                Swal.fire({
                    title: "¡Cambio de estado exitoso!",
                    text: "El cambio de estado de la gaseosa a sido exitoso",
                    icon: "success",
                    background: "#272727",
                    color: "#c9c9c9",
                });

                Swal.fire("¡Cambio de estado exitoso!", "El cambio de estado de la gaseosa a sido exitoso", "success");

                resApiGaseosas()
            }

        } catch (err) {
            console.error("Error al cambiar el estado de la gaseosa:", err);
            Swal.fire({
                title: "Error",
                text: 'Error al cambiar el estado de la gaseosa',
                icon: "error",
                background: "#272727",
                color: "#c9c9c9",
            });
        }
    };


    const validacionDeComplementos = async (tipo, name) => {

        try {

            const url = `http://localhost:5000/api/complementos/${tipo === 'salsa' ? 'verify-duplicate-salsa' : 'verify-duplicate-gaseosa'}`

            const body = tipo === "salsa" ? { nombreSalsa: name }
                : { nombreGaseosa: name };

            const res = await axios.post(url, body,
                {
                    headers: authHeader()
                },
            )

            if (res.data.existe) {
                return res.data.mensaje || ''
            }

            return ""

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



    const editarSalsa = (salsa) => {
        setForComplementosData(salsa)
        setModalTipo('salsa')
        setIsCreating(false);
        setModalVisible(true);


    }

    const editarGaseosa = (gaseosa) => {
        setForComplementosData(gaseosa)
        setModalTipo('gaseosa')
        setIsCreating(false);
        setModalVisible(true);
    }

    const openModal = () => {
        limpiarFormulario();
        setIsCreating(true);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        if (formRef.current) formRef.current.reset();
        limpiarFormulario();
    };

    const limpiarFormulario = () => {
        setForComplementosData({ nombreSalsa: "", estadoSalsa: "activo", nombreGaseosa: "", estadoGaseosa: "activo" });
    };

    useEffect(() => {
        resApiSalsas();
        resApiGaseosas();
    }, []);

    return {
        dataSalsas,
        dataGaseosas,
        onChangeInputs,
        openModal,
        closeModal,
        modalVisible,
        isCreating,
        forComplementosData,
        formRef,
        ComplementosSalsas,
        ComplementosGaseosas,
        setModalTipo,
        modalTipo,
        setForComplementosData,
        editarSalsa,
        editarGaseosa,
        busquedaSalsa,
        setBusquedaSalsa,
        busquedaGaseosa,
        setBusquedaGaseosa,
        paginacionActualSalsas,
        setPaginacionActualSalsas,
        paginacionActualGaseosas,
        setPaginacionActualGaseosas,
        cambiarEstadoSalsa,
        cambiarEstadoGaseosa,
        validacionesDeCampos,
        errores,
        validacionDeComplementos,
        setErrores
    };
};


