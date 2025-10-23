import React from 'react'
import { useComplemntosCompletos } from '../../hooks/useComplementosCompletos'

const ComplementosCompletos = () => {

    const { dataComplementoSalsa, dataComplementoGaseosa, volverAlInicio, 
        loading, actualizaEstadoSalsa, actualizaEstadoGaseosa, eliminacionDeGaseosa,
        eliminacionDeSalsa  } = useComplemntosCompletos()

    if (loading) {
        return (
            <div className="mainContainer">
                <div style={{ textAlign: 'center', padding: '50px' }}>
                    <h2>Cargando...</h2>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="mainContainer">
                <section className="containerSalsas">
                    <div className="tituloSeccionSalsas">
                        <h2>Salsas Inactivas</h2>
                    </div>
                    <table className="tablaSalsas">
                        <thead>
                            <tr>
                                <th>Nombre Salsa</th>
                                <th>Estado Salsa</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataComplementoSalsa.map((salsa) => (
                                <tr className="tabladashb_tbody_tr" key={salsa.id}>
                                    <td className="tabladashb_tbody_tr_td">{salsa.nombreSalsa}</td>
                                    <td className="tabladashb_tbody_tr_td">{salsa.estadoSalsa}</td>
                                    <td className="tabladashb_tbody_tr_td" >
                                        <button
                                            className="btn-cambio-estado"
                                            title="Cambio de estado"
                                            aria-label={`Cambio de estado ${salsa.id}`}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                actualizaEstadoSalsa(salsa.id)
                                            }}
                                        >
                                            <ion-icon name="checkmark-outline"></ion-icon>
                                        </button>
                                        <button
                                            className="btn-elminacion"
                                            title="Eliminacion"
                                            aria-label={`Eliminacion ${salsa.id}`}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                eliminacionDeSalsa(salsa.id)
                                            }}
                                        >
                                            <ion-icon name="trash-bin-outline"></ion-icon>
                                        </button>
                                    </td>
                                </tr>

                            ))}
                        </tbody>
                    </table>
                </section>


                <section className="containerGaseosas">
                    <div className="tituloSeccionGaseosas">
                        <h2>Gaseosas Inactivas</h2>
                    </div>
                    <table className="tablaGaseosas">
                        <thead>
                            <tr>
                                <th>Nombre Gaseosa</th>
                                <th>Estado Gaseosa</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataComplementoGaseosa.map((gaseosa) => (
                                <tr className="tabladashb_tbody_tr" key={gaseosa.id}>
                                    <td className="tabladashb_tbody_tr_td">{gaseosa.nombreGaseosa}</td>
                                    <td className="tabladashb_tbody_tr_td">{gaseosa.estadoGaseosa}</td>
                                    <td className="tabladashb_tbody_tr_td" >
                                        <button
                                            className="btn-cambio-estado"
                                            title="Cambio de estado"
                                            aria-label={`Eliminacion ${gaseosa.id}`}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                actualizaEstadoGaseosa(gaseosa.id)
                                            }}
                                        >
                                            <ion-icon name="checkmark-outline"></ion-icon>
                                        </button>
                                        <button
                                            className="btn-elminacion"
                                            title="Eliminacion"
                                            aria-label={`Cambio de estado ${gaseosa.id}`}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                eliminacionDeGaseosa(gaseosa.id)
                                            }}
                                        >
                                            <ion-icon name="trash-bin-outline"></ion-icon>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>

            <div className='btn-center'>
                <button className="btn-volver-complementos" onClick={volverAlInicio}>
                    Volver
                </button>
            </div>

        </>
    )
}

export default ComplementosCompletos
