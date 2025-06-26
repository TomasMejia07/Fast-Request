import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const useEstadisticasModulo2 = () => {

    const [rendimientoMunicipio, setRendimientoMunicipio] = useState({
        labels: [],
        data: []
    })

    const [analisisVentas, setAnalisisVentas] = useState({
        labels: [],
        data: []
    })

    const [productosMasVendidos, setProductosMasVendidos] = useState({
        labels: [],
        data: []
    })

    const [topClientes, setTopClientes] = useState([])


    const [periodoMunicipio, setPeriodoMunicipio] = useState('dia')
    const [periodoVentas, setPeriodoVentas] = useState('dia')
    const [periodoProducto, setPeriodoProducto] = useState('dia')
    const [periodoClientes, setPeriodoClientes] = useState('dia')


    const onChageInputRendimientoMunicipio = ({ target }) => {
        const { value } = target

        setPeriodoMunicipio(value)
    }

    const onChageInputAnalisisVentas = ({ target }) => {
        const { value } = target

        setPeriodoVentas(value)
    }

    const onChageInputProductosMasVendidos = ({ target }) => {
        const { value } = target

        setPeriodoProducto(value)
    }



    const onChageInputTopClientes = ({ target }) => {
        const { value } = target

        setPeriodoClientes(value)
    }





    const API_URL = 'http://localhost:5000/api/estadisticas'


    const API_Municipio = async () => {
        try {
            const res = await axios.get(`${API_URL}/rendimiento-municipio?periodo=${periodoMunicipio}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const municipios = res.data.rendimientoMunicipios;

            const labels = municipios.map(m => m.municipio);
            const data = municipios.map(m => m.ventaTotal);

            setRendimientoMunicipio({
                labels,
                data
            })

            console.log('datos obtenidos de manera exitosa')

        } catch (err) {

            console.error('Error al cargar rendimiento por municipio:', err);
        }
    }


    const API_AnalisisVentas = async () => {
        try {

            const res = await axios.get(`${API_URL}/analisis-ventas?periodo=${periodoVentas}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const ventas = res.data.analisisVentas

            const labels = ventas.map(v => v.fecha)
            const data = ventas.map(v => v.totalVentas)

            setAnalisisVentas({
                labels,
                data
            })

            console.log('datos obtenidos de manera exitosa')

        } catch (err) {

            console.error('Error al cargar analisis de ventas:', err);
        }
    }



    
    const API_ProductosMasVerndidos = async () => {
        try {

            const res = await axios.get(`${API_URL}/productos-mas-vendidos?periodo=${periodoProducto}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const productos = res.data.productosMasVendidos

            const labels = productos.map(p => p.nombreProducto)
            const data = productos.map(p => p.ventaTotal)

            setProductosMasVendidos({
                labels,
                data
            })

            console.log('datos obtenidos de manera exitosa')

        } catch (err) {

            console.error('Error al cargar analisis de ventas:', err);
        }
    }



    const API_TopClientes = async () => {
        try {

            const res = await axios.get(`${API_URL}/top-clientes?periodo=${periodoClientes}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const clientes = res.data.clientesTop

            setTopClientes(clientes)

            console.log('datos obtenidos de manera exitosa')

        } catch (err) {

            console.error('Error al cargar analisis de ventas:', err);
        }
    }




    useEffect(() => {

        API_Municipio()

    }, [periodoMunicipio])


    useEffect(() => {

        API_AnalisisVentas()

    }, [periodoVentas])


    useEffect(() => {

        API_ProductosMasVerndidos()

    }, [periodoProducto])


    useEffect(() => {

        API_TopClientes()

    }, [periodoClientes])




    return {
        rendimientoMunicipio,
        analisisVentas,
        productosMasVendidos,
        topClientes,
        periodoMunicipio,
        periodoVentas,
        periodoProducto,
        periodoClientes,
        onChageInputRendimientoMunicipio,
        onChageInputAnalisisVentas,
        onChageInputProductosMasVendidos,
        onChageInputTopClientes
    }
}



