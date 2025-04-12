import React from 'react';
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import '../../assets/css/dashboard.css';


const InicioDashboard = () => {
    return (
        <DashboardLayout title="Inicio">
            <div class="cards" >
                <div class="card">
                    <div>
                        <span class="card-numeros">10</span>
                        <span class="card-nombre">Pedidos en espera</span>
                    </div>
                    <div class="card-icono">
                        <ion-icon name="time"></ion-icon>
                    </div>
                </div>
                <div class="card">
                    <div>
                        <span class="card-numeros">5</span>
                        <span class="card-nombre">Pedidos en proceso</span>
                    </div>
                    <div class="card-icono">
                        <ion-icon name="bicycle"></ion-icon>
                    </div>
                </div>
                <div class="card">
                    <div>
                        <span class="card-numeros">30</span>
                        <span class="card-nombre">Pedidos Terminados</span>
                    </div>
                    <div class="card-icono">
                        <ion-icon name="checkbox"></ion-icon>
                    </div>
                </div>
                <div class="card">
                    <div>
                        <span class="card-numeros">$500.000</span>
                        <span class="card-nombre">Ventas de hoy</span>
                    </div>
                    <div class="card-icono">
                        <ion-icon name="cash"></ion-icon>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default InicioDashboard