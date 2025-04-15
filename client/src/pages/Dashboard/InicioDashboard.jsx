import React from 'react';
import DashboardLayout from "../../components/Dashboard/DashboardLayout";



const InicioDashboard = () => {
    return (
        <DashboardLayout title="Inicio">
            <div className="cards" >
                <div className="card">
                    <div>
                        <span className="card-numeros">10</span>
                        <span className="card-nombre">Pedidos en espera</span>
                    </div>
                    <div className="card-icono">
                        <ion-icon name="time"></ion-icon>
                    </div>
                </div>
                <div className="card">
                    <div>
                        <span className="card-numeros">5</span>
                        <span className="card-nombre">Pedidos en proceso</span>
                    </div>
                    <div className="card-icono">
                        <ion-icon name="bicycle"></ion-icon>
                    </div>
                </div>
                <div className="card">
                    <div>
                        <span className="card-numeros">30</span>
                        <span className="card-nombre">Pedidos Terminados</span>
                    </div>
                    <div className="card-icono">
                        <ion-icon name="checkbox"></ion-icon>
                    </div>
                </div>
                <div className="card">
                    <div>
                        <span className="card-numeros">$500.000</span>
                        <span className="card-nombre">Ventas de hoy</span>
                    </div>
                    <div className="card-icono">
                        <ion-icon name="cash"></ion-icon>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default InicioDashboard