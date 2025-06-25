import React from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";

/* IMPORTACIONES PARA LOS GRAFICOS */
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement, ArcElement, Filler } from 'chart.js';
import { Chart } from 'react-chartjs-2';

/* IMPORTACIONES DE HELPERS NECESARIOS PARA LOS GRAFICOS */
import { Configuraciones, setData } from "../../helpers/graficoHelper";
import { valuesGraficos } from "../../helpers/valuesGraficos";
import { useEstadisticas } from "../../hooks/useEstadisticasModulo1";
import { useEstadisticasModulo2 } from "../../hooks/useEstadisticasModulo2";


ChartJS.register(CategoryScale, BarElement, ArcElement, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);


const { datosParaLosGraficos } = valuesGraficos()


const MiGrafico = ({ tipoGrafico, Config, Dates, RefDatos }) => {
    const { labels, data, label } = RefDatos;
    const opciones = Configuraciones(Config);
    const info = setData(Dates, labels, data, label);

    return (
        <Chart key={`chart-${info}`} type={tipoGrafico} data={info} options={opciones} />
    );
};





const EstadisticasDashboard = () => {

    const { ingresoTotal, ventasTotales, nuevosClientes, promedioVenta,
        periodoIngresosTotales, onChangeInputIngresosTotales, periodoVentasTotales,
        periodonuevosClientes, periodopromedioVenta, onChangeInputVentasTotales, onChangeInputNuevosClientes,
        onChangeInputPromedioVenta } = useEstadisticas()

    const { rendimientoMunicipio, onChageInputRendimientoMunicipio, periodoMunicipio,
        onChageInputAnalisisVentas, periodoVentas, analisisVentas,
        onChageInputProductosMasVendidos, periodoProducto, productosMasVendidos } = useEstadisticasModulo2()

    const resumenGeneral = {

        ingresosTotales: {
            total: ingresoTotal.total
        },

        ventasTotale: {
            total: ventasTotales.total
        },

        nuevosClientes: {
            total: nuevosClientes.total
        },

        ValorPromedioPorVenta: {
            total: promedioVenta.total
        }
    }




    return (
        <DashboardLayout title="Estadísticas">
            <div className="stats-dashboard">
                {/* Resumen general */}
                <div className="stats-card summary-card">
                    <div className="card-header">
                        <h3>Resumen General</h3>
                    </div>
                    <div className="card-content">
                        <div className="summary-metrics">

                            {/* INGRESOS TOTALES */}
                            <div className="metric">
                                <span className="metric-label">Ingresos Totales</span>
                                <select
                                    className="metric-select"
                                    value={periodoIngresosTotales}
                                    onChange={onChangeInputIngresosTotales}
                                >
                                    <option value="dia">Día</option>
                                    <option value="semana">Semana</option>
                                    <option value="mes">Mes</option>
                                    <option value="ano">Año</option>
                                </select>
                                <span className="metric-value">{resumenGeneral.ingresosTotales.total}</span>
                                <span className="metric-change positive">
                                    <ion-icon name="trending-up-outline"></ion-icon>
                                </span>
                            </div>

                            {/* VENTAS TOTALES */}
                            <div className="metric">
                                <span className="metric-label">Ventas Totales</span>
                                <select
                                    className="metric-select"
                                    value={periodoVentasTotales}
                                    onChange={onChangeInputVentasTotales}
                                >
                                    <option value="dia">Día</option>
                                    <option value="semana">Semana</option>
                                    <option value="mes">Mes</option>
                                    <option value="ano">Año</option>
                                </select>
                                <span className="metric-value">{resumenGeneral.ventasTotale.total}</span>
                                <span className="metric-change positive">
                                    <ion-icon name="cart-outline"></ion-icon>
                                </span>
                            </div>

                            {/* NUEVOS CLIENTES */}
                            <div className="metric">
                                <span className="metric-label">Nuevos Clientes</span>
                                <select
                                    className="metric-select"
                                    value={periodonuevosClientes}
                                    onChange={onChangeInputNuevosClientes}
                                >
                                    <option value="dia">Día</option>
                                    <option value="semana">Semana</option>
                                    <option value="mes">Mes</option>
                                    <option value="ano">Año</option>
                                </select>
                                <span className="metric-value">{resumenGeneral.nuevosClientes.total}</span>
                                <span className="metric-change positive">
                                    <ion-icon name="people-outline"></ion-icon>
                                </span>
                            </div>

                            {/* VALOR PROMEDIO POR VENTA */}
                            <div className="metric">
                                <span className="metric-label">Promedio Por Venta</span>
                                <select
                                    className="metric-select"
                                    value={periodopromedioVenta}
                                    onChange={onChangeInputPromedioVenta}
                                >
                                    <option value="dia">Día</option>
                                    <option value="semana">Semana</option>
                                    <option value="mes">Mes</option>
                                    <option value="ano">Año</option>
                                </select>
                                <span className="metric-value">{resumenGeneral.ValorPromedioPorVenta.total}</span>
                                <span className="metric-change positive">
                                    <ion-icon name="cash-outline"></ion-icon>
                                </span>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Ventas Diarias */}
                <div className="stats-card daily-sales">
                    <div className="card-header">
                        <h3>Ventas Diarias</h3>
                        <select
                            className="metric-select"
                            value={periodoVentas}
                            onChange={onChageInputAnalisisVentas}
                        >
                            <option value="dia">Día</option>
                            <option value="semana">Semana</option>
                            <option value="mes">Mes</option>
                            <option value="ano">Año</option>
                        </select>
                    </div>
                    <div className="card-content">
                        <MiGrafico
                            tipoGrafico="line"
                            Config="ConfigGraficosDeLinea"
                            Dates="dataParaVentasDiarias"
                            RefDatos={{
                                label: 'Analisis de ventas ',
                                data: analisisVentas.data,
                                labels: analisisVentas.labels
                            }}
                        />
                    </div>
                </div>


                {/* Producto Más Vendido */}

                <div className="stats-card customer-analysis">
                    <div className="card-header">
                        <h3>Productos Más Vendido De La Semana</h3>
                        <select
                            className="metric-select"
                            value={periodoProducto}
                            onChange={onChageInputProductosMasVendidos}
                        >
                            <option value="dia">Día</option>
                            <option value="semana">Semana</option>
                            <option value="mes">Mes</option>
                            <option value="ano">Año</option>
                        </select>
                    </div>
                    <div className="card-content">
                        <MiGrafico
                            tipoGrafico="bar"
                            Config="ConfigGraficosEnBarras"
                            Dates="dataParaProductoMasVendidoDeLaSemana"
                            RefDatos={{
                                label: 'Producto mas vendido',
                                data: productosMasVendidos.data,
                                labels: productosMasVendidos.labels
                            }}
                        />
                    </div>
                </div>

                {/* Análisis de Clientes */}
                <div className="stats-card top-product">
                    <div className="card-header">
                        <h3>Análisis de Clientes</h3>
                    </div>
                    <div className="card-content">
                        <MiGrafico
                            tipoGrafico="pie"
                            Config="ConfigGraficosRedondos"
                            Dates="dataParaAnálisisDeClientes"
                            RefDatos={datosParaLosGraficos.AnálisisDeClientes}
                        />
                    </div>
                </div>


                {/* Rendimiento por Municipio */}
                <div className="stats-card regional-performance">
                    <div className="card-header">
                        <h3>Rendimiento por Municipio</h3>
                        <select
                            className="metric-select"
                            value={periodoMunicipio}
                            onChange={onChageInputRendimientoMunicipio}
                        >
                            <option value="dia">Día</option>
                            <option value="semana">Semana</option>
                            <option value="mes">Mes</option>
                            <option value="ano">Año</option>
                        </select>
                    </div>

                    <div className="card-content">
                        <MiGrafico
                            tipoGrafico="line"
                            Config="ConfigGraficosDeArea"
                            Dates="dataParaRendimientoPorRegión"
                            RefDatos={{
                                label: 'Rendimiento por municipio del Valle de Aburra',
                                data: rendimientoMunicipio.data,
                                labels: rendimientoMunicipio.labels
                            }}
                        />
                    </div>
                </div>

            </div>
        </DashboardLayout>
    );
};

export default EstadisticasDashboard;



