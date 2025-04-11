import React, { useEffect, useState } from 'react';
import '../assets/css/style.css';
import { Link } from 'react-router-dom';

function Login() {

  useEffect(() => {
  document.title = 'Iniciar Sesion - Fast Request'; 
  }, []); 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorUsuario, setErrorUsuario] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    setErrorUsuario(email ? '' : 'Por favor ingrese un correo.');
    setErrorPassword(password ? '' : 'Por favor ingrese una contraseña.');

    if (email && password) {
      console.log('Enviando datos:', { email, password });
    }
  };

  return (
    <div className="container login-container">
      <form className="form-group login-form-group" onSubmit={handleLogin}>
        <fieldset>
          <div className="login-img-container">
            <img className="login-avatar" src="/img/user.png" alt="usuario" />
          </div>

          <h3 className="titulo">Login</h3>

          <div className="input-container ic1 mb-3">
            <input
              type="email"
              className="login-input"
              id="usuario"
              value={email}
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="error">{errorUsuario}</span>
          </div>

          <div className="input-container ic2 mb-3">
            <input
              type="password"
              className="login-input"
              id="password"
              value={password}
              placeholder="Contraseña"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="error">{errorPassword}</span>
          </div>

          <Link to="/recuperarContrasena" className="aRecuperar">¿Olvidaste tu contraseña?</Link>

          <button type="submit" className="login-btn btn btn-outline-light login-btn-ingresar">Ingresar</button>

          <div className="linea-registro">
            <span>o</span>
          </div>

          <Link to="/registro" className="login-btn btn btn-outline-light">Regístrate</Link>
        </fieldset>
      </form>
    </div>
  );
}

export default Login;
