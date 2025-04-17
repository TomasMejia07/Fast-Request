import React from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";

/* IMPORTACIONES PARA LOS GRAFICOS */
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement, ArcElement, Filler } from 'chart.js';
import { Chart } from 'react-chartjs-2';

/* IMPORTACIONES DE HELPERS NECESARIOS PARA LOS GRAFICOS */
import { Configuraciones, setData } from "../../helpers/graficoHelper";
import { valuesGraficos } from "../../helpers/valuesGraficos";


ChartJS.register(CategoryScale, BarElement, ArcElement, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);


const { resumenGeneral, datosParaLosGraficos } = valuesGraficos()


const MiGrafico = ({ tipoGrafico, Config, Dates, RefDatos }) => {
    const { labels, data, label } = RefDatos;
    const opciones = Configuraciones(Config);
    const info = setData(Dates, labels, data, label);

    return (
        <Chart key={`chart-${info}`}  type={tipoGrafico} data={info} options={opciones} />
    );
};



const EstadisticasDashboard = () => {
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
                            <div className="metric">
                                <span className="metric-value">{resumenGeneral.ingresosTotales.total}</span>
                                <span className="metric-label">Ingresos Totales</span>
                                <span className="metric-change positive">{resumenGeneral.ingresosTotales.porcentaje}</span>
                            </div>
                            <div className="metric">
                                <span className="metric-value">{resumenGeneral.ventasTotale.total}</span>
                                <span className="metric-label">Ventas Totales</span>
                                <span className="metric-change positive">{resumenGeneral.ventasTotale.porcentaje}</span>
                            </div>
                            <div className="metric">
                                <span className="metric-value">{resumenGeneral.nuevosClientes.total}</span>
                                <span className="metric-label">Nuevos Clientes</span>
                                <span className="metric-change positive">{resumenGeneral.nuevosClientes.porcentaje}</span>
                            </div>
                            <div className="metric">
                                <span className="metric-value">{resumenGeneral.ValorPromedioPorVenta.total}</span>
                                <span className="metric-label">Valor Promedio Por Venta</span>
                                <span className="metric-change positive">{resumenGeneral.ValorPromedioPorVenta.porcentaje}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Ventas Diarias */}
                <div className="stats-card daily-sales">
                    <div className="card-header">
                        <h3>Ventas Diarias</h3>
                    </div>
                    <div className="card-content">
                        <MiGrafico
                            tipoGrafico="line"
                            Config="ConfigGraficosDeLinea"
                            Dates="dataParaVentasDiarias"
                            RefDatos={datosParaLosGraficos.ventasDiarias}
                        />
                    </div>
                </div>

                {/* Ventas Mensuales */}
                <div className="stats-card monthly-sales">
                    <div className="card-header">
                        <h3>Ventas Mensuales</h3>
                    </div>
                    <div className="card-content">
                        <MiGrafico
                            tipoGrafico="doughnut"
                            Config="ConfigGraficosRedondos"
                            Dates="dataParaVentasMensuales"
                            RefDatos={datosParaLosGraficos.ventasMensuales}
                        />
                    </div>
                </div>

                {/* Ventas Semanales */}
                <div className="stats-card weekly-sales">
                    <div className="card-header">
                        <h3>Ventas Semanales</h3>
                    </div>
                    <div className="card-content">
                        <MiGrafico
                            tipoGrafico="bar"
                            Config="ConfigGraficosEnBarras"
                            Dates="dataParaVentasSemanales"
                            RefDatos={datosParaLosGraficos.ventasSemanales}
                        />
                    </div>
                </div>

                {/* Producto Más Vendido */}
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

                {/* Análisis de Clientes */}
                <div className="stats-card customer-analysis">
                    <div className="card-header">
                        <h3>Productos Más Vendido De La Semana</h3>
                    </div>
                    <div className="card-content">
                        <MiGrafico
                            tipoGrafico="bar"
                            Config="ConfigGraficosEnBarras"
                            Dates="dataParaProductoMasVendidoDeLaSemana"
                            RefDatos={datosParaLosGraficos.productoMasVendidoDeLaSemana}
                        />
                    </div>
                </div>

                {/* Rendimiento por Municipio */}
                <div className="stats-card regional-performance">
                    <div className="card-header">
                        <h3>Rendimiento por Municipio</h3>
                    </div>
                    <div className="card-content">
                        <MiGrafico
                            tipoGrafico="line" 
                            Config="ConfigGraficosDeArea"
                            Dates="dataParaRendimientoPorRegión"
                            RefDatos={datosParaLosGraficos.RendimientoPorRegión}
                        />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default EstadisticasDashboard;


