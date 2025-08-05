import React, { useState } from 'react';
import PasoCorreoRecuperar from './PasoCorreoRecuperar';
import PasoCodigoRecuperar from './PasoCodigoRecuperar';
import PasoContrasenaNueva from './PasoContrasenaNueva';

function RecuperarContrasena() {
  const [paso, setPaso] = useState(1);
  const [formData, setFormData] = useState({
    correo: '',
    codigo: '',
    nuevaContrasena: '',
    confirmarNuevaContrasena: ''
  });

  const avanzarPaso = () => setPaso((prev) => prev + 1);

  const actualizarDatos = (nuevosDatos) => {
    setFormData((prevData) => ({ ...prevData, ...nuevosDatos }));
  };

  return (
    <div className="container login-container">
      {paso === 1 && (
        <PasoCorreoRecuperar 
          datos={formData} 
          actualizar={actualizarDatos} 
          siguiente={avanzarPaso} 
        />
      )}
      {paso === 2 && (
        <PasoCodigoRecuperar 
          datos={formData} 
          actualizar={actualizarDatos} 
          siguiente={avanzarPaso} 
        />
      )}
      {paso === 3 && (
        <PasoContrasenaNueva
          datos={formData} 
          actualizar={actualizarDatos} 
          siguiente={avanzarPaso} 
        />
      )}
    </div>
  );
}

export default RecuperarContrasena;