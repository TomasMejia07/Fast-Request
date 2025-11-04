import React from "react";
import "../../../assets/css/miPagina.css";
import { Link } from "react-router-dom";

const Registro_miPagina = () => {
  return (
    <div className="user-login-page">
      <div className="user-login-wrapper">
        <div className="user-login-card large">
          <h2 className="user-login-title">Crear Cuenta</h2>

          <form className="user-login-form">
            <div className="user-login-field">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre completo"
                className="user-login-input"
                autoComplete="name"
              />
            </div>

            <div className="user-login-field">
              <input
                type="email"
                name="correo"
                placeholder="Correo electrónico"
                className="user-login-input"
                autoComplete="email"
              />
            </div>

            <div className="user-login-field">
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                className="user-login-input"
                autoComplete="new-password"
              />
            </div>

            <div className="user-login-field">
              <input
                type="text"
                name="contacto"
                placeholder="Número de contacto"
                className="user-login-input"
                autoComplete="tel"
              />
            </div>

            <button type="button" className="user-login-btn">
              Registrarse
            </button>

            <div className="user-login-divider">
              <span>o</span>
            </div>

            <Link to="/miPagina/Login" className="user-login-btn secondary">
              Iniciar Sesión
            </Link>
          </form>
        </div>

        <Link to="/miPagina" className="user-login-back">
            Regresar
        </Link>
    </div>
    </div>
  );
};

export default Registro_miPagina;
