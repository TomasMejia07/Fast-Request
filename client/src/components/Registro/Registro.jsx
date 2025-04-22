import React, { useState } from 'react';
import PasoCorreo from './PasoCorreo';
import PasoNombre from './PasoNombre';
import PasoCodigo from './PasoCodigo';
import PasoPassword from './PasoPassword';

function RegistroFormulario() {
  const [paso, setPaso] = useState(1);
  const [formData, setFormData] = useState({
    correo: '',
    nombre: '',
    apellido: '',
    codigo: '',
    password: '',
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
      {paso === 4 && (
        <PasoPassword 
          datos={formData} 
          actualizar={actualizarDatos} 
          anterior={retrocederPaso} 
        />
      )}
    </div>
  );
}

export default RegistroFormulario;