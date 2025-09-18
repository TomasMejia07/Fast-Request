import React from 'react';
import '../../assets/css/configuracion.css';
import ConfiguracionLayout from '../../components/Configuracion/ConfiguracionLayout';
import useConfiguracionPerfilUsuario from '../../hooks/useConfiguracionPerfilUsuario';
import { format } from "date-fns";
import { es } from "date-fns/locale";


const initial = {
  usuarioId: '',
  nombre: '',
  apellido: '',
  correo: '',
  telefono: '',
  direccion: '',
  fechaNacimiento: '',
  Imagen_De_Perfil: "https://res.cloudinary.com/dp9jbvpwl/image/upload/v1757260230/user_izbzpi.png"
}


const ConfiguracionPerfilUsuario = () => {

  const {
    userData,
    isEditing,
    fileInputRef,
    setIsEditing,
    handleInputChange,
    saveChanges,
    handleProfilePictureChange,
    showNotification,
    date,
    fechaNacimineto
  } = useConfiguracionPerfilUsuario(initial);


  const {
    nombre,
    apellido,
    correo,
    telefono,
    direccion,
  } = userData


  return (
    <ConfiguracionLayout>
      <div className="perfil-container1">
        <div className="perfil-header">
          <div className="perfil-title">
            <h2>Perfil de Usuario</h2>
            <p className="subtitle">Información personal</p>
          </div>

          <div className="perfil-foto">
            <div className="foto-container">
              <img src={
                userData.Imagen_De_Perfil
                  ? (userData.Imagen_De_Perfil instanceof File
                    ? URL.createObjectURL(userData.Imagen_De_Perfil)
                    : userData.Imagen_De_Perfil)
                  : "https://res.cloudinary.com/dp9jbvpwl/image/upload/v1757260230/user_izbzpi.png"
              } alt="Foto de perfil" />
              <div className="overlay">
                <label htmlFor="file-input" className={`${isEditing ? 'edit-icon' : ''}`} title="Cambiar foto">
                  {isEditing && <ion-icon name="camera-outline"></ion-icon>}
                </label>
              </div>
            </div>
            <input
              id="file-input"
              type="file"
              name='image'
              ref={fileInputRef}
              onChange={handleProfilePictureChange}
              accept="image/*"
              disabled={!isEditing}
            />
          </div>
        </div>
        
        <div className="perfil-content">
          {!isEditing ? (
            <div className="perfil-info">
              <div className="info-section">
                <div className="info-group">
                  <div className="info-icon">
                    <ion-icon name="person-outline"></ion-icon>
                  </div>
                  <div className="info-text">
                    <label>Nombre</label>
                    <p>{nombre}</p>
                  </div>
                </div>

                <div className="info-group">
                  <div className="info-icon">
                    <ion-icon name="people-outline"></ion-icon>
                  </div>
                  <div className="info-text">
                    <label>Apellido</label>
                    <p>{apellido}</p>
                  </div>
                </div>
              </div>

              <div className="info-section">
                <div className="info-group">
                  <div className="info-icon">
                    <ion-icon name="mail-outline"></ion-icon>
                  </div>
                  <div className="info-text">
                    <label>Correo</label>
                    <p>{correo}</p>
                  </div>
                </div>

                <div className="info-group">
                  <div className="info-icon">
                    <ion-icon name="call-outline"></ion-icon>
                  </div>
                  <div className="info-text">
                    <label>Teléfono</label>
                    <p>{telefono}</p>
                  </div>
                </div>
              </div>

              <div className="info-section">
                <div className="info-group">
                  <div className="info-icon">
                    <ion-icon name="map-outline"></ion-icon>
                  </div>
                  <div className="info-text">
                    <label>Dirección</label>
                    <p>{direccion}</p>
                  </div>
                </div>

                <div className="info-group">
                  <div className="info-icon">
                    <ion-icon name="calendar-outline"></ion-icon>
                  </div>
                  <div className="info-text">
                    <label>Fecha de Nacimiento</label>
                    <p>
                      {date
                        ? format(date, "dd 'de' MMM 'del' yyyy", { locale: es })
                        : "Por completar"}
                    </p>
                  </div>
                </div>
              </div>

              <button
                id="edit-profile"
                className="btn-edit"
                onClick={() => {
                  setIsEditing(true);
                  showNotification('Modo de edición activado', 'info');
                }}
              >
                <ion-icon name="brush-outline" style={{ marginRight: '8px' }}></ion-icon>
                Editar Perfil
              </button>
            </div>
          ) : (
            <div className="perfil-editar active">
              <h3>Editar información</h3>
              <form id="edit-form" onSubmit={saveChanges}>
                <div className="form-group">
                  <label htmlFor="edit-nombre">Nombre</label>
                  <input
                    type="text"
                    id='edit-nombre'
                    name="nombre"
                    value={nombre || ''}
                    onChange={handleInputChange}
                    disabled
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="edit-apellido">Apellido</label>
                  <input
                    type="text"
                    id='edit-apellido'
                    name="apellido"
                    value={apellido || ''}
                    onChange={handleInputChange}
                    disabled
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="edit-correo">Correo</label>
                  <input
                    type="email"
                    id='edit-correo'
                    name="correo"
                    value={correo || ''}
                    onChange={handleInputChange}
                    disabled
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="edit-telefono">Teléfono</label>
                  <input
                    type="tel"
                    id='edit-telefono'
                    name="telefono"
                    value={telefono || ''}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="edit-direccion">Dirección</label>
                  <input
                    type="text"
                    id='edit-direccion'
                    name="direccion"
                    value={direccion || ''}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="edit-fechaNacimiento">Fecha de Nacimiento</label>
                  <input
                    type="date"
                    id='edit-fechaNacimiento'
                    name="fechaNacimiento"
                    value={fechaNacimineto || ''}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="actions">
                  <button type="submit" className="btn-save">
                    <i className="fas fa-save"></i> Guardar
                  </button>
                  <button
                    type="button"
                    className="btn-cancel"
                    onClick={() => setIsEditing(false)}
                  >
                    <i className="fas fa-times"></i> Cancelar
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </ConfiguracionLayout>
  );
};

export default ConfiguracionPerfilUsuario;
