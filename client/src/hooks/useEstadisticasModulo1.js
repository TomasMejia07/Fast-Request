import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { authHeader } from "../helpers/authHeader";

export const useEstadisticas = () => {

    const [ingresoTotal, setIngresosTotales] = useState({
        total: 0,
    })
    const [ventasTotales, setVentasTotales] = useState({
        total: 0,
    })
    const [nuevosClientes, setnuevosClientes] = useState({
        total: 0,
    })
    const [promedioVenta, setPromedioVenta] = useState({
        total: 0,
    })

    const [periodoIngresosTotales, setPeriodoIngresosTotales] = useState('dia')
    const [periodoVentasTotales, setPeriodoVentasTotales] = useState('dia')
    const [periodonuevosClientes, setPeriodonuevosClientes] = useState('dia')
    const [periodopromedioVenta , setPeriodopromedioVenta ] = useState('dia')


    const onChangeInputIngresosTotales = ({ target }) => {
        const { value } = target

        setPeriodoIngresosTotales(value)
    }

    const onChangeInputVentasTotales = ({ target }) => {
        const { value } = target

        setPeriodoVentasTotales(value)
    }

    const onChangeInputNuevosClientes = ({ target }) => {
        const { value } = target

        setPeriodonuevosClientes(value)
    }

    const onChangeInputPromedioVenta = ({ target }) => {
        const { value } = target

        setPeriodopromedioVenta(value)
    }


    const abreviarNumero = (num) => {
        if (num >= 1e6) return `$${(num / 1e6).toFixed(1)}M`;  // 1e6 = 1,000,000
        if (num >= 1e3) return `$${(num / 1e3).toFixed(1)}K`; // 1e3 = 1000
        return `${num.toFixed(0)}`;
    };


    const API_URL = 'http://localhost:5000/api/estadisticas'

    const Api_ingresosTotales = async () => {
        try {
            const res = await axios.get(`${API_URL}/ingresos-totales?periodo=${periodoIngresosTotales}`, {
                headers: {
                    ...authHeader(),
                    'Content-Type': 'application/json'
                }
            })

            setIngresosTotales({
                total: abreviarNumero(res.data.ingresoTotal)
            });
            console.log('datos obtenidos de manera exitosa')

        } catch (err) {
            console.error('errror al cargar los datos de la api de ingresos totales')
        }
    }



    const Api_ventasTotales = async () => {
        try {
            const res = await axios.get(`${API_URL}/ventas-totales?periodo=${periodoVentasTotales}`, {
                headers: {
                    ...authHeader(),
                    'Content-Type': 'application/json'
                }
            })

            setVentasTotales({
                total: abreviarNumero(res.data.totalVentas)
            });
            console.log('datos obtenidos de manera exitosa')

        } catch (err) {
            console.error('errror al cargar los datos de la api de ventas totales')
        }
    }



    const Api_nuevosClientes = async () => {
        try {
            const res = await axios.get(`${API_URL}/nuevos-clientes?periodo=${periodonuevosClientes}`, {
                headers: {
                    ...authHeader(),
                    'Content-Type': 'application/json'
                }
            })

            setnuevosClientes({
                total: abreviarNumero(res.data.totalNuevosClientes)
            });
            console.log('datos obtenidos de manera exitosa')

        } catch (err) {
            console.error('errror al cargar los datos de la api de nuevos clientes')
        }
    }



    const Api_promedioVenta = async () => {
        try {
            const res = await axios.get(`${API_URL}/promedio-venta?periodo=${periodopromedioVenta}`, {
                headers: {
                    ...authHeader(),
                    'Content-Type': 'application/json'
                }
            })

            setPromedioVenta({
                total: abreviarNumero(res.data.promedioVenta)
            });
            console.log('datos obtenidos de manera exitosa')

        } catch (err) {
            console.error('errror al cargar los datos de la api de promedio de venta')
        }
    }




    useEffect(() => {
        Api_ingresosTotales()
    }, [periodoIngresosTotales]);

    useEffect(() => {
        Api_ventasTotales()
    }, [periodoVentasTotales]);

    useEffect(() => {
        Api_nuevosClientes()
    }, [periodonuevosClientes]);

    useEffect(() => {
        Api_promedioVenta()
    }, [periodopromedioVenta]);



    return {
        ingresoTotal,
        ventasTotales,
        nuevosClientes,
        promedioVenta,
        periodoIngresosTotales,
        periodoVentasTotales,
        periodonuevosClientes,
        periodopromedioVenta,
        onChangeInputIngresosTotales,
        onChangeInputVentasTotales,
        onChangeInputNuevosClientes,
        onChangeInputPromedioVenta
    }
}
