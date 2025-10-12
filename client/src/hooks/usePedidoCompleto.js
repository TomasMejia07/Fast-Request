import { useEffect, useState } from 'react'
import axios from 'axios'
import { authHeader } from '../helpers/authHeader'

export const usePedidoCompleto = (id) => {

    const [dataPedido, setDataPedido] = useState(null)

    const getPedidoCompleto = async () => {
        try {

            const res = await axios.get(
                `http://localhost:5000/api/pedidos/pedidoFull/${id}`, 
                {
                    headers: authHeader()
                }
            )
            
            setDataPedido(res.data.data)
            console.log('Pedido obtenido de manera correcta')
            
        } catch (err) {
            console.error('Error al obtener el pedido completo', err)
        }
    }

    useEffect(() => {
        if (id) {
            getPedidoCompleto()
        }
    }, [id])

    return {
        dataPedido,
    }
}
