import React, { useState, useRef, useEffect } from 'react';
import ConfiguracionLayout from '../../components/Configuracion/ConfiguracionLayout';
import { useConfiguracion } from '../../hooks/useConfiguracion';
// Componente para campos de contraseña
const PasswordInput = ({ id, label, placeholder, value, onChange, toggleVisibility, visible }) => (
  <div className="input-group password-group">
    <label htmlFor={id} className="input-label">{label}</label>
    <div className="password-wrapper">
      <input 
        type={visible ? "text" : "password"} 
        id={id} 
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onCopy={(e) => e.preventDefault()}
        className="password-input"
      />
      <span 
        className="toggle-visibility" 
        onClick={() => toggleVisibility(id)}
      >
        <ion-icon name={visible ? "eye-off-outline" : "eye-outline"}></ion-icon>
      </span>
    </div>
  </div>
);

// Componente reutilizable para toggles de notificación
const NotificationToggle = ({ type, icon, label, checked, onChange }) => (
  <div className="notification-toggle">
    <div className="toggle-left">
      <div className="toggle-icon">
        <ion-icon name={icon}></ion-icon>
      </div>
      <span className="toggle-label">{label}</span>
    </div>
    <label className="toggle-switch">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onChange(type)}
      />
      <span className="toggle-slider"></span>
    </label>
  </div>
);

const Configuracion = () => {
  // Estados para la interfaz
  const {
    selectedFile, setSelectedFile,
    userName, setUserName,
    selectedTheme,
    actionStatus,
    notifications,
    passwords,
    passwordVisibility,
    passwordStrength,
    fileInputRef,
    showStatus,
    togglePasswordVisibility,
    handlePasswordChange,
    handleNotificationToggle,
    saveName,
    savePassword,
    handleFileChange,
    saveProfilePicture,
    handleThemeChange,
    resetConfig,
  } = useConfiguracion();
  

  return (
    <ConfiguracionLayout>
        {/* Indicador de estado de acción */}
        {actionStatus && (
          <div className="action-status">
              {actionStatus}
          </div>
        )}

         {/* CONFIGURACIONES */}
        <div className="dashboard-config">
          <div className="config-header">
            <h2 className="config-title">Configuraciones</h2>
            <p className="config-desc">Personaliza tu experiencia según tus preferencias</p>
          </div>
          
          <div className="config-block">
            <div className="block-header">
              <ion-icon name="image-outline" className="block-icon"></ion-icon>
              <h3 className="block-title">Perfil</h3>
            </div>
            <div className="config-panel">
              <div className="panel-content">
                <div className="panel-icon">
                  <ion-icon name="image-outline"></ion-icon>
                </div>
                <div className="panel-details">
                  <h4 className="panel-title">Subir Nuevo Logo</h4>
                  <p className="panel-desc">Actualiza el logo de tu perfil con una imagen personalizada</p>
                  <div className="input-group">
                    <label htmlFor="nuevo-logo" className="custom-file-selector">
                      <ion-icon name="cloud-upload-outline"></ion-icon>
                      {selectedFile ? selectedFile.name : 'Seleccionar imagen'}
                    </label>
                    <input 
                      type="file" 
                      id="nuevo-logo" 
                      accept="image/jpeg,image/png,image/gif" 
                      onChange={handleFileChange}
                      className="file-input"
                      ref={fileInputRef}
                    />
                  </div>
                  <button 
                    className="dashboard-btn dashboard-btn-primary"
                    onClick={saveProfilePicture}
                  >
                    <ion-icon name="save-outline"></ion-icon>
                    Guardar Logo
                  </button>
                </div>
              </div>
            </div>
            
            {/* Cambiar Nombre */}
            <div className="config-panel">
              <div className="panel-content">
                <div className="panel-icon">
                  <ion-icon name="person-outline"></ion-icon>
                </div>
                <div className="panel-details">
                  <h4 className="panel-title">Cambiar Nombre de Usuario</h4>
                  <p className="panel-desc">Modifica como aparece tu nombre en la plataforma</p>
                  <div className="input-group">
                    <label htmlFor="nombre-usuario" className="input-label">Nuevo Nombre:</label>
                    <input 
                      type="text" 
                      id="nombre-usuario" 
                      placeholder="Ingrese su nuevo nombre"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="text-input"
                      maxLength={50}
                    />
                  </div>
                  <button 
                    className="dashboard-btn dashboard-btn-primary" 
                    onClick={saveName}
                  >
                    <ion-icon name="save-outline"></ion-icon>
                    Guardar Nombre
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="config-block">
            <div className="block-header">
              <ion-icon name="shield-outline" className="block-icon"></ion-icon>
              <h3 className="block-title">Seguridad</h3>
            </div>
            
            {/* Cambiar Contraseña */}
            <div className="config-panel">
              <div className="panel-content">
                <div className="panel-icon">
                  <ion-icon name="lock-closed-outline"></ion-icon>
                </div>
                <div className="panel-details">
                  <h4 className="panel-title">Cambiar Contraseña</h4>
                  <p className="panel-desc">Actualiza tu contraseña para mantener tu cuenta segura</p>
                  
                  <PasswordInput 
                    id="actual-password"
                    label="Contraseña Actual:"
                    placeholder="Ingrese su contraseña actual"
                    value={passwords.current}
                    onChange={handlePasswordChange}
                    toggleVisibility={togglePasswordVisibility}
                    visible={passwordVisibility['actual-password']}
                  />
                  
                  <PasswordInput 
                    id="nueva-password"
                    label="Nueva Contraseña:"
                    placeholder="Ingrese su nueva contraseña"
                    value={passwords.new}
                    onChange={handlePasswordChange}
                    toggleVisibility={togglePasswordVisibility}
                    visible={passwordVisibility['nueva-password']}
                  />
                  <PasswordInput 
                    id="confirm-password"
                    label="Confirmar Contraseña:"
                    placeholder="Confirme su nueva contraseña"
                    value={passwords.confirm}
                    onChange={handlePasswordChange}
                    toggleVisibility={togglePasswordVisibility}
                    visible={passwordVisibility['confirm-password']}
                  />
                  
                  <div className="password-meter">
                    <div className="meter-wrapper">
                      <div 
                        className="meter-bar" 
                        style={{ 
                          width: `${passwordStrength.strength}%`,
                          backgroundColor: passwordStrength.color 
                        }}
                      ></div>
                    </div>
                    <span className="meter-text">{`Fuerza de contraseña: ${passwordStrength.status}`}</span>
                  </div>
                  <button 
                    className="dashboard-btn dashboard-btn-primary" 
                    onClick={savePassword}
                  >
                    <ion-icon name="shield-checkmark-outline"></ion-icon>
                    Cambiar Contraseña
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="config-block">
            <div className="block-header">
              <ion-icon name="options-outline" className="block-icon"></ion-icon>
              <h3 className="block-title">Preferencias</h3>
            </div>
            
            {/* Alternar Tema */}
            <div className="config-panel">
              <div className="panel-content">
                <div className="panel-icon">
                  <ion-icon name="contrast-outline"></ion-icon>
                </div>
                <div className="panel-details">
                  <h4 className="panel-title">Modo de Tema</h4>
                  <p className="panel-desc">Personaliza la apariencia de la plataforma</p>
                  <div className="theme-options">
                    {['light', 'dark', 'auto'].map((theme) => (
                      <div className="theme-choice" key={theme}>
                        <label htmlFor={`theme-${theme}`} className="theme-option-label">
                          <input 
                            type="radio" 
                            id={`theme-${theme}`} 
                            name="theme" 
                            value={theme} 
                            checked={selectedTheme === theme}
                            onChange={handleThemeChange}
                            className="theme-radio"
                          />
                          <div className={`theme-preview ${theme}`}>
                            <ion-icon name={theme === 'light' ? "sunny-outline" : 
                                            theme === 'dark' ? "moon-outline" : "sync-outline"}></ion-icon>
                            <span>{theme === 'light' ? 'Claro' : 
                                    theme === 'dark' ? 'Oscuro' : 'Auto'}</span>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Notificaciones - AÑADIDO */}
            <div className="config-panel">
              <div className="panel-content">
                <div className="panel-icon">
                  <ion-icon name="notifications-outline"></ion-icon>
                </div>
                <div className="panel-details">
                  <h4 className="panel-title">Gestión de Notificaciones</h4>
                  <p className="panel-desc">Configura cómo quieres recibir tus notificaciones</p>
                  <div className="notification-options">
                    <NotificationToggle 
                      type="email"
                      icon="mail-outline"
                      label="Correo electrónico"
                      checked={notifications.email}
                      onChange={handleNotificationToggle}
                    />
                    
                    <NotificationToggle 
                      type="push"
                      icon="phone-portrait-outline"
                      label="Notificaciones push"
                      checked={notifications.push}
                      onChange={handleNotificationToggle}
                    />
                    
                    <NotificationToggle 
                      type="updates"
                      icon="refresh-outline"
                      label="Actualizaciones del sistema"
                      checked={notifications.updates}
                      onChange={handleNotificationToggle}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="config-block">
            <div className="block-header">
              <ion-icon name="settings-outline" className="block-icon"></ion-icon>
              <h3 className="block-title">Avanzado</h3>
            </div>
            
            {/* Restablecer Configuraciones */}
            <div className="config-panel danger">
              <div className="panel-content">
                <div className="panel-icon danger">
                  <ion-icon name="refresh-outline"></ion-icon>
                </div>
                <div className="panel-details">
                  <h4 className="panel-title">Restablecer Configuraciones</h4>
                  <p className="panel-desc">Esto restablecerá todas las configuraciones a sus valores predeterminados.</p>
                  <button className="dashboard-btn dashboard-btn-danger" onClick={resetConfig}>
                    <ion-icon name="refresh-outline"></ion-icon>
                    Restablecer Configuraciones
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      
      {/* Estilos para las nuevas funcionalidades */}
      <style jsx>{`
        .action-status {
          position: fixed;
          top: 20px;
          right: 20px;
          background-color: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 10px 20px;
          border-radius: 4px;
          z-index: 1000;
          animation: fadeIn 0.3s, fadeOut 0.3s 2.7s;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeOut {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-20px); }
        }
        
        .theme-transition {
          transition: all 0.5s ease;
        }
        
        .custom-file-selector.upload-success {
          background-color: #4CAF50;
          color: white;
          transition: all 0.3s ease;
        }
        
        .reset-animation {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
        
        .dashboard-btn {
          position: relative;
          overflow: hidden;
        }
        
        .dashboard-btn:after {
          content: '';
          display: block;
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          pointer-events: none;
          background-image: radial-gradient(circle, #fff 10%, transparent 10.01%);
          background-repeat: no-repeat;
          background-position: 50%;
          transform: scale(10, 10);
          opacity: 0;
          transition: transform .5s, opacity 1s;
        }
        
        .dashboard-btn:active:after {
          transform: scale(0, 0);
          opacity: .3;
          transition: 0s;
        }
      `}</style>

    </ConfiguracionLayout>
  );
};

export default Configuracion;