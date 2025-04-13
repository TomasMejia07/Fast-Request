import React, { useState, useEffect } from 'react';

const PasoNombre = ({ siguiente, datos, actualizar }) => {

  const [nombre, setNombre] = useState(datos.nombre || '');

  const [apellido, setApellido] = useState(datos.apellido || '');

  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'Ingresa tu Nombre - Fast Request';
  }, []);

  const manejarEnvio = (e) => {
    e.preventDefault();

    if (!nombre || !apellido) {
      setError('Por favor, complete todos los campos.');
    } else {
        setError('');
        actualizar({ ...datos, nombre, apellido });
        siguiente(); 
    }
  };

  return (
    <form onSubmit={manejarEnvio} className="form-group login-form-group">
      <fieldset>
        <div className="login-img-container">
          <img className="login-avatar" src="/img/user.png" alt="usuario" />
        </div>
        <h3>Elige un nombre para ti o para tu negocio</h3>

        <div className="input-container ic1 mb-3">
          <input
            type="text"
            className="login-input"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre"
          />
        </div>

        <div className="input-container ic1 mb-3">
          <input
            type="text"
            className="login-input"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            placeholder="Apellido"
          />
        </div>

        {error && <span className="error">{error}</span>}

        <button type="submit" className="login-btn btn btn-outline-light">
          Continuar
        </button>
      </fieldset>
    </form>
  );
};

export default PasoNombre;