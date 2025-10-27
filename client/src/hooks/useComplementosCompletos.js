import { useEffect, useState } from 'react'
import axios from 'axios'
import { authHeader } from '../helpers/authHeader'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { jwtDecode } from "jwt-decode";

export const useComplemntosCompletos = () => {

    const [dataComplementoSalsa, setDataComplementoSalsa] = useState([])
    const [dataComplementoGaseosa, setDataComplementoGaseosa] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const getSalsasCompletos = async () => {
        try {

            const res = await axios.get(
                `http://localhost:5000/api/complementos/obtener-salsas-inactivas`,
                {
                    headers: authHeader()
                }
            )


            setDataComplementoSalsa(res.data)
            console.log('Salsas obtenido de manera correcta')

        } catch (err) {
            console.error('Error al obtener las salsas completas', err)
        }
    }


    const getGaseosasCompletos = async () => {
        try {

            const res = await axios.get(
                `http://localhost:5000/api/complementos/obtener-gaseosas-inactivas`,
                {
                    headers: authHeader()
                }
            )

            setDataComplementoGaseosa(res.data)
            console.log('Gaseosas obtenido de manera correcta')

        } catch (err) {
            console.error('Error al obtener las gaseosas completas', err)
        }
    }

    // cambio de salsa a estado activo
    const actualizaEstadoSalsa = async (id) => {
        try {

            await axios.put(`http://localhost:5000/api/complementos/update-estado-activo-salsa/${id}`,
                {},
                {
                    headers: authHeader()
                }
            )

            Swal.fire({
                title: "¡Cambio de estado exitoso!",
                text: "El cambio de estado de la  salsa a sido exitoso",
                icon: "success",
                background: "#272727",
                color: "#c9c9c9",
            });

            getSalsasCompletos()
        } catch (err) {
            console.log('Error al cambiar el estado de la salsa')
            Swal.fire("Error", "No se a podido cambiar el estado de la salsa", "error");
        }
    }


    // cambio de gaseosa a estado activo
    const actualizaEstadoGaseosa = async (id) => {
        try {

            await axios.put(`http://localhost:5000/api/complementos/update-estado-activo-gaseosa/${id}`,
                {},
                {
                    headers: authHeader()
                }
            )

            Swal.fire({
                title: "¡Cambio de estado exitoso!",
                text: "El cambio de estado de la  gaseosa a sido exitoso",
                icon: "success",
                background: "#272727",
                color: "#c9c9c9",
            });

            getGaseosasCompletos()
        } catch (err) {
            console.log('Error al cambiar el estado de la gaseosa')
            Swal.fire("Error", "No se a podido cambiar el estado de la gaseosa", "error");
        }
    }


    const eliminacionDeSalsa = async (id) => {

        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "Esto eliminará la salsa.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            background: "#272727",
            color: "#c9c9c9"
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`http://localhost:5000/api/complementos/destroy-salsa/${id}`,
                    {
                        headers: authHeader()
                    }
                )
                Swal.fire({
                    title: "¡Salsa eliminada exitosamente!",
                    text: "La salsa a sido eliminada de manera exitosa",
                    icon: "success",
                    background: "#272727",
                    color: "#c9c9c9",
                });
                getSalsasCompletos()

            } catch (err) {
                console.log('Error al eliminar la salsa')
                Swal.fire("Error", "No se a podidoeliminar la salsa", "error");
            }
        }
    }

    const eliminacionDeGaseosa = async (id) => {

        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "Esto eliminará la gaseosa.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            background: "#272727",
            color: "#c9c9c9"
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`http://localhost:5000/api/complementos/destroy-gaseosa/${id}`,
                    {
                        headers: authHeader()
                    }
                )
                Swal.fire({
                    title: "¡Gaseosa eliminada exitosamente!",
                    text: "La gaseosa a sido eliminada de manera exitosa",
                    icon: "success",
                    background: "#272727",
                    color: "#c9c9c9",
                });
                getGaseosasCompletos()

            } catch (err) {
                console.log('Error al eliminar la gaseosa')
                Swal.fire("Error", "No se a podido eliminar la gaseosa", "error");
            }
        }
    }


    const volverAlInicio = (e) => {
        e.preventDefault()
        navigate('/dashboard/complementos')

    }

    useEffect(() => {
        const cargarDatos = async () => {
            setLoading(true)
            await Promise.all([
                getSalsasCompletos(),
                getGaseosasCompletos()
            ])
            setLoading(false)
        }

        cargarDatos()
    }, [])

    return {
        dataComplementoSalsa,
        dataComplementoGaseosa,
        volverAlInicio,
        loading,
        actualizaEstadoSalsa,
        actualizaEstadoGaseosa,
        eliminacionDeGaseosa,
        eliminacionDeSalsa
    }
}

