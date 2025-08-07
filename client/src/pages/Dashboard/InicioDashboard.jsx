import React from 'react';
import DashboardLayout from "../../components/Dashboard/DashboardLayout";



const InicioDashboard = () => {
    return (
        <DashboardLayout title="Inicio - Fast Request">
            <div className="cardsDas" >
                <div className="cardDas">
                    <div>
                        <span className="cardDas-numeros">10</span>
                        <span className="cardDas-nombre">Pedidos en espera</span>
                    </div>
                    <div className="cardDas-icono">
                        <ion-icon name="time"></ion-icon>
                    </div>
                </div>
                <div className="cardDas">
                    <div>
                        <span className="cardDas-numeros">5</span>
                        <span className="cardDas-nombre">Pedidos en proceso</span>
                    </div>
                    <div className="cardDas-icono">
                        <ion-icon name="bicycle"></ion-icon>
                    </div>
                </div>
                <div className="cardDas">
                    <div>
                        <span className="cardDas-numeros">30</span>
                        <span className="cardDas-nombre">Pedidos Terminados</span>
                    </div>
                    <div className="cardDas-icono">
                        <ion-icon name="checkbox"></ion-icon>
                    </div>
                </div>
                <div className="cardDas">
                    <div>
                        <span className="cardDas-numeros">$500.000</span>
                        <span className="cardDas-nombre">Ventas de hoy</span>
                    </div>
                    <div className="cardDas-icono">
                        <ion-icon name="cash"></ion-icon>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default InicioDashboard