import React, { useEffect, useRef } from 'react';
import '../assets/css/style.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import  { validacionDeCampos } from '../helpers/validacionDeCampos'

function Login() {

  const navigate = useNavigate();

  const initial = {
    usuario: '',
    password: ''
  }

  const { usuario, password, OnChangeInput, errores,setErrores } = useLogin(initial)


  const handleLogin = async (e) => {
    e.preventDefault();

    const usuarioError = validacionDeCampos('usuario', usuario)
    const passwordError = validacionDeCampos('password', password)

    setErrores({
        usuario: usuarioError,
        password: passwordError
    })
    if (usuarioError || passwordError) return;

    try {
      const response = await fetch('http://localhost:5000/api/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ usuario, password })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        navigate('/dashboard');
      } else {
        alert(data.error || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
      alert('No se pudo conectar con el servidor');
    }
  };


  const referencia = useRef()

  useEffect(() => {
    document.title = 'Iniciar Sesion - Fast Request';
    referencia.current.focus()
  }, []);


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
              ref={referencia}
              className="login-input"
              name="usuario"
              value={usuario}
              placeholder="E-mail"
              onChange={OnChangeInput}
              autoComplete="email"
            />
            {errores.usuario && <div style={{color: 'red'}}>{errores.usuario}</div>}
          </div>

          <div className="input-container ic2 mb-3">
            <input
              type="password"
              className="login-input"
              name="password"
              value={password}
              placeholder="Contraseña"
              onChange={OnChangeInput}
               autoComplete="current-password"
            />
            {errores.password && <div style={{color: 'red'}}>{errores.password}</div>}
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
