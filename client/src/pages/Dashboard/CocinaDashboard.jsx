import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/CocinaDashboard.css";
import useCocina from "../../hooks/useCocina";

function CocinaDashboard() {
  const navigate = useNavigate();
  const { pedidos, obtenerPedidosEnCocina, CambioDeEstado } = useCocina();

  useEffect(() => {
    obtenerPedidosEnCocina();
  }, []);

  return (
    <div className="cocina-container">
      <div className="cocina-header">
        <ion-icon name="restaurant-outline" className="icon"></ion-icon>
        <h2>Área de Cocina</h2>
      </div>

      <div className="pedidos-grid">
        {pedidos.length === 0 ? (
          <p>No hay pedidos en proceso.</p>
        ) : (
          pedidos.map((pedido) => (
            <div className="pedido-card" key={pedido.id}>
              <div className="pedido-header">
                <h3>
                  <ion-icon name="fast-food-outline"></ion-icon> Pedido #{pedido.id}
                </h3>
                <p className="cliente">
                  <ion-icon name="person-outline"></ion-icon> {pedido.cliente?.NombreCliente || pedido.Cliente?.NombreCliente}
                </p>
              </div>

              <div className="pedido-body">
                <p><strong>Producto:</strong> {pedido.Producto?.NombreProducto}</p>
                <p><strong>Cantidad:</strong> {pedido.cantidadProducto}</p>

                {pedido.salsas?.length > 0 && (
                  <p><strong>Salsas:</strong> {pedido.salsas.map(s => s.nombreSalsa).join(", ")}</p>
                )}

                {pedido.gaseosas?.length > 0 && (
                  <p><strong>Gaseosas:</strong> {pedido.gaseosas.map(g => g.nombreGaseosa).join(", ")}</p>
                )}

                {pedido.notasAdicionales && (
                  <p><strong>Notas:</strong> {pedido.notasAdicionales}</p>
                )}

                <p className="total">
                  <strong>Total:</strong> ${parseFloat(pedido.total).toLocaleString()}
                </p>
              </div>

              <div className="pedido-footer">
                <button
                  className="btn-completar"
                  onClick={() => CambioDeEstado(pedido.id)}
                >
                  <ion-icon name="checkmark-circle-outline"></ion-icon> Completar
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <button className="btn-regresar" onClick={() => navigate("/dashboard")}>
        <ion-icon name="arrow-back-outline"></ion-icon> Regresar al Dashboard
      </button>
    </div>
  );
}

export default CocinaDashboard;
