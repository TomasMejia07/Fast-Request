import React, { useState } from "react";
import "../../assets/css/miPagina.css";
import { useNavigate } from "react-router-dom";

const Contactanos = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("¡Gracias por contactarnos! Te responderemos pronto.");
    setFormData({ nombre: "", email: "", mensaje: "" });
  };

  return (
    <div className="page">

      {/* Sección de contacto */}
      <section className="contact-section">
        <div className="contact-container">
          <h2>Contáctanos</h2>
          <p>
            Si tienes alguna pregunta, sugerencia o deseas más información, no dudes en escribirnos.
          </p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="Inputs-Contactanos">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Tu nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="Inputs-Contactanos">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="tuemail@ejemplo.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="Inputs-Contactanos">
              <label htmlFor="mensaje">Mensaje</label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows="5"
                placeholder="Escribe tu mensaje aquí..."
                value={formData.mensaje}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn-enviar">
              Enviar Mensaje
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div>
            <div className="logo">LOGO</div>
            <p>Tu tienda de confianza con los mejores productos y precios increíbles.</p>
          </div>
          <div>
            <h3>Enlaces Rápidos</h3>
            <ul>
              <li><a href="#">Inicio</a></li>
              <li><a href="#">Productos</a></li>
              <li><a href="#">Contacto</a></li>
            </ul>
          </div>
          <div>
            <h3>Contacto</h3>
            <p><ion-icon name="location-outline"></ion-icon> Medellín, Colombia</p>
            <p><ion-icon name="call-outline"></ion-icon> +57 300 123 4567</p>
            <p><ion-icon name="mail-outline"></ion-icon> info@empresa.com</p>
          </div>
          <div>
            <h3>Síguenos</h3>
            <div className="socials">
              <a href="#"><ion-icon name="logo-facebook"></ion-icon></a>
              <a href="#"><ion-icon name="logo-twitter"></ion-icon></a>
              <a href="#"><ion-icon name="logo-instagram"></ion-icon></a>
            </div>
          </div>
        </div>
        <div className="copy">© 2025 Tu Empresa. Todos los derechos reservados.</div>
      </footer>
    </div>
  );
};

export default Contactanos;
