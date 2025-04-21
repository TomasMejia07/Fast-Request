import React, { useState } from 'react';
import PasoCorreo from './pasoCorreo';
import PasoNombre from './pasoCodigo';
import PasoCodigo from './PasoContrasenaNueva';

function RecuperarContrasena() {
  const [paso, setPaso] = useState(1);
  const [formData, setFormData] = useState({
    correo: '',
    codigo: '',
    nuevaContrasena: '',
    confirmarNuevaContrasena: ''
  });

  const avanzarPaso = () => setPaso((prev) => prev + 1);
  const retrocederPaso = () => setPaso((prev) => prev - 1);

  const actualizarDatos = (nuevosDatos) => {
    setFormData((prevData) => ({ ...prevData, ...nuevosDatos }));
  };

  return (
    <div className="container login-container">
      {paso === 1 && (
        <PasoCorreo 
          datos={formData} 
          actualizar={actualizarDatos} 
          siguiente={avanzarPaso} 
        />
      )}
      {paso === 2 && (
        <PasoNombre 
          datos={formData} 
          actualizar={actualizarDatos} 
          siguiente={avanzarPaso} 
          anterior={retrocederPaso} 
        />
      )}
      {paso === 3 && (
        <PasoCodigo 
          datos={formData} 
          actualizar={actualizarDatos} 
          siguiente={avanzarPaso} 
          anterior={retrocederPaso} 
        />
      )}
    </div>
  );
}

export default RecuperarContrasena;