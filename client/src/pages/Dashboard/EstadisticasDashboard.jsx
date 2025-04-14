import React from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement, ArcElement } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { Configuraciones , setData } from "../../helpers/graficoHelper";


ChartJS.register(CategoryScale, BarElement, ArcElement, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ventasDiarias = [
    {
        label: 'ventas Del Dia',
        data: [23,45,67,89,34,56,12,56,34],
        labels: ['10:00 Am','12:00 Pm','1:00 Pm','2:00 Pm','4:00 Pm','6:00 Pm','8:00 Pm','10:00 Pm','12:00 Am', ]
    }
]

const ventasSemanales = [
    {
        label: 'ventas De La Semana',
        data: [23,45,67,89,34],
        labels: ['Dia 1','Dia 2','Dia 3','Dia 4','Dia 5','Dia 6','Dia 7']
    }
]
const ventasMensuales = [
    {
        label: 'ventas Mensuales',
        data: [2300, 1800, 2500, 3200, 2900, 3100, 2700, 3000, 2400, 2800, 2600, 3500],
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    }
]

const productoMasVendidoDeLaSemana = [
    {
        label: 'ventas Mensuales',
        data: [34, 56, 43, 29, 58, 63, 89],
        labels:  ['Dia 1','Dia 2','Dia 3','Dia 4','Dia 5','Dia 6','Dia 7']
    }
]

const MiGrafico = ({ tipoGrafico, Config, Dates, RefDatos }) => {
    const { labels, data, label } = RefDatos;
    const opciones = Configuraciones(Config);
    const info = setData(Dates, labels, data, label);

    return (
        <Chart type={tipoGrafico} data={info} options={opciones} />
    );
};

const EstadisticasDashboard = () => {
    return (
        <DashboardLayout title="Estadisticas">
            <div className="parent">
                <div className="card ">
                    <div className="chart-title">Ventas Diarias</div>
                   <MiGrafico
                      tipoGrafico="line"
                      Config="Config1"
                      Dates="data1"
                      RefDatos={ventasDiarias[0]}
                   />
                </div>
                <div className="card ">
                    <div className="chart-title">Ventas Mensuales</div>
                    <MiGrafico
                      tipoGrafico="doughnut"
                      Config="Config2"
                      Dates="data3"
                      RefDatos={ventasMensuales[0]}
                   />
                </div>
                <div className="card ">
                    <div className="chart-title">Ventas Semanales</div>
                    <MiGrafico
                      tipoGrafico="bar"
                      Config="Config2"
                      Dates="data2"
                      RefDatos={ventasSemanales[0]}
                   />
                </div>
                <div className="card ">
                    <div className="chart-title">Producto Mas vendido De La Semana</div>
                    <MiGrafico
                      tipoGrafico="bar"
                      Config="Config3"
                      Dates="data4"
                      RefDatos={productoMasVendidoDeLaSemana[0]}
                   />
                </div>
            </div>
        </DashboardLayout>
    );
};

export default EstadisticasDashboard;
