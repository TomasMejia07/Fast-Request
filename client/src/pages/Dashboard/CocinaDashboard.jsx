import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/CocinaDashboard.css"; // Importa el CSS

function CocinaDashboard() {
  const navigate = useNavigate();

  const [pedidos] = useState([
    {
      id: 1,
      cliente: "Juan Pérez",
      producto: "Hamburguesa Doble",
      cantidadProducto: 2,
      municipioLocalidad: "Medellín",
      direccion: "Cra 45 #67-89",
      puntoDeReferencia: "Cerca al Éxito",
      deseaSalsas: "Sí",
      tipos_salsas: ["Mayonesa", "Rosada"],
      deseaGaseosa: "Sí",
      tipos_gaseosas: ["Coca-Cola"],
      notasAdicionales: "Sin cebolla",
      total: 35000,
    },
    {
      id: 2,
      cliente: "Laura Gómez",
      producto: "Perro Caliente",
      cantidadProducto: 1,
      municipioLocalidad: "Bello",
      direccion: "Calle 52 #20-13",
      puntoDeReferencia: "Frente al parque",
      deseaSalsas: "Sí",
      tipos_salsas: ["Mostaza"],
      deseaGaseosa: "No",
      tipos_gaseosas: [],
      notasAdicionales: "",
      total: 12000,
    },
    {
      id: 3,
      cliente: "Carlos Ruiz",
      producto: "Pizza Personal",
      cantidadProducto: 1,
      municipioLocalidad: "Itagüí",
      direccion: "Av. Las Vegas #10-45",
      puntoDeReferencia: "Al lado del Metro",
      deseaSalsas: "No",
      tipos_salsas: [],
      deseaGaseosa: "Sí",
      tipos_gaseosas: ["Pepsi"],
      notasAdicionales: "Extra queso",
      total: 18000,
    },
    {
      id: 4,
      cliente: "Ana López",
      producto: "Empanadas",
      cantidadProducto: 6,
      municipioLocalidad: "Envigado",
      direccion: "Calle 34 #45-22",
      puntoDeReferencia: "Diagonal a la iglesia",
      deseaSalsas: "Sí",
      tipos_salsas: ["Ají"],
      deseaGaseosa: "No",
      tipos_gaseosas: [],
      notasAdicionales: "",
      total: 9000,
    },
    {
      id: 5,
      cliente: "David Torres",
      producto: "Salchipapa",
      cantidadProducto: 1,
      municipioLocalidad: "Sabaneta",
      direccion: "Cra 50 #70-15",
      puntoDeReferencia: "Frente al Éxito",
      deseaSalsas: "Sí",
      tipos_salsas: ["Rosada", "BBQ"],
      deseaGaseosa: "Sí",
      tipos_gaseosas: ["Colombiana"],
      notasAdicionales: "Bien doradas",
      total: 20000,
    },
  ]);

  return (
    <div className="cocina-container">
      <div className="cocina-header">
        <ion-icon name="restaurant-outline" class="icon"></ion-icon>
        <h2>Área de Cocina</h2>
      </div>

      <div className="pedidos-grid">
        {pedidos.map((pedido) => (
          <div className="pedido-card" key={pedido.id}>
            <div className="pedido-header">
              <h3>
                <ion-icon name="fast-food-outline"></ion-icon> Pedido #{pedido.id}
              </h3>
              <p className="cliente">
                <ion-icon name="person-outline"></ion-icon> {pedido.cliente}
              </p>
            </div>
            <div className="pedido-body">
              <p><strong>Producto:</strong> {pedido.producto}</p>
              <p><strong>Cantidad:</strong> {pedido.cantidadProducto}</p>
              <p><strong>Dirección:</strong> {pedido.direccion}</p>
              <p><strong>Referencia:</strong> {pedido.puntoDeReferencia}</p>
              <p><strong>Salsas:</strong> {pedido.deseaSalsas} ({pedido.tipos_salsas.join(", ")})</p>
              <p><strong>Gaseosa:</strong> {pedido.deseaGaseosa} ({pedido.tipos_gaseosas.join(", ")})</p>
              {pedido.notasAdicionales && (
                <p><strong>Notas:</strong> {pedido.notasAdicionales}</p>
              )}
              <p className="total"><strong>Total:</strong> ${pedido.total.toLocaleString()}</p>
            </div>
            <div className="pedido-footer">
              <button className="btn-completar">
                <ion-icon name="checkmark-circle-outline"></ion-icon> Completar
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="btn-regresar" onClick={() => navigate("/dashboard")}>
        <ion-icon name="arrow-back-outline"></ion-icon> Regresar al Dashboard
      </button>
    </div>
  );
}

export default CocinaDashboard;
