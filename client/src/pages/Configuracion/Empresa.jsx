import React from "react";
import "../../assets/css/configuracion.css";
import ConfiguracionLayout from "../../components/Configuracion/ConfiguracionLayout";
import useConfiguracionEmpresa from "../../hooks/useConfiguracionEmpresa";

const initial = {
  Id: "",
  NombreEmpresa: "",
  LogoEmpresa:
    "https://res.cloudinary.com/dp9jbvpwl/image/upload/v1757260230/user_izbzpi.png",
};

const Empresa = () => {
  const {
    userData,
    isEditing,
    fileInputRef,
    setIsEditing,
    handleInputChange,
    saveChanges,
    handleProfilePictureChange,
    showNotification,
  } = useConfiguracionEmpresa(initial);

  const { Id, NombreEmpresa, LogoEmpresa } = userData;

  return (
    <ConfiguracionLayout>
      <div className="perfil-container1">
        <div className="perfil-header">
          <div className="perfil-title">
            <h2>Empresa</h2>
            <p className="subtitle">Información de la Empresa</p>
          </div>

          <div className="perfil-foto">
            <div className="foto-container">
              <img
                src={
                  userData.Imagen_De_Perfil
                    ? userData.Imagen_De_Perfil instanceof File
                      ? URL.createObjectURL(userData.Imagen_De_Perfil)
                      : userData.Imagen_De_Perfil
                    : "https://res.cloudinary.com/dp9jbvpwl/image/upload/v1757260230/user_izbzpi.png"
                }
                alt="Foto de perfil"
              />
              <div className="overlay">
                <label
                  htmlFor="file-input"
                  className={`${isEditing ? "edit-icon" : ""}`}
                  title="Cambiar Logo"
                >
                  {isEditing && <ion-icon name="camera-outline"></ion-icon>}
                </label>
              </div>
            </div>
            <input
              id="file-input"
              type="file"
              name="image"
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
                    <ion-icon name="people-circle-outline"></ion-icon>
                  </div>
                  <div className="info-text">
                    <label>Nombre del Establecimiento</label>
                    <p>{NombreEmpresa}</p>
                  </div>
                </div>
              </div>
              <button
                id="edit-profile"
                className="btn-edit"
                onClick={() => {
                  setIsEditing(true);
                  showNotification("Modo de edición activado", "info");
                }}
              >
                <ion-icon
                  name="brush-outline"
                  style={{ marginRight: "8px" }}
                ></ion-icon>
                Editar Datos del Establecimiento
              </button>
            </div>
          ) : (
            <div className="perfil-editar active">
              <h3>Editar información</h3>
              <form id="edit-form" onSubmit={saveChanges}>
                <div className="form-group">
                  <label htmlFor="edit-nombre">Nombre del Establecimiento</label>
                  <input
                    type="text"
                    id="edit-nombre"
                    name="nombre"
                    value={NombreEmpresa || ""}
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

export default Empresa;
