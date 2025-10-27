import React from "react";
import "../../../assets/css/miPagina.css";
import { Link } from "react-router-dom";

const Login_miPagina = () => {
  return (
    <div className="login-page">
      <div className="login-card large">
        <h2 className="login-title">Iniciar Sesión</h2>

        <form className="login-form">
          <div className="login-field">
            <input
              type="email"
              name="usuario"
              placeholder="Correo electrónico"
              className="login-input"
              autoComplete="email"
            />
          </div>

          <div className="login-field">
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              className="login-input"
              autoComplete="current-password"
            />
          </div>

          <div className="login-extra">
            <Link to="/recuperarContrasena" className="login-link">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <button type="button" className="login-btn">
            Ingresar
          </button>

          <div className="login-divider">
            <span>o</span>
          </div>

          <Link to="/registro" className="login-btn secondary">
            Regístrate
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login_miPagina;
