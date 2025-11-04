import React from "react";
import "../../../assets/css/miPagina.css";
import { Link } from "react-router-dom";

const Login_miPagina = () => {
  return (
    <div className="user-login-page">
      <div className="user-login-wrapper">
        <div className="user-login-card large">
          <h2 className="user-login-title">Iniciar Sesión</h2>

          <form className="user-login-form">
            <div className="user-login-field">
              <input
                type="email"
                name="usuario"
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
                autoComplete="current-password"
              />
            </div>

            <div className="user-login-extra">
              <Link to="/recuperarContrasena" className="user-login-link">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <button type="button" className="user-login-btn">
              Ingresar
            </button>

            <div className="user-login-divider">
              <span>o</span>
            </div>

            <Link to="/miPagina/Registro" className="user-login-btn secondary">
              Regístrate
            </Link>
          </form>
        </div>

        {/* ✅ Enlace centrado debajo */}
        <Link to="/miPagina" className="user-login-back">
          Regresar
        </Link>
      </div>
    </div>
  );
};

export default Login_miPagina;
