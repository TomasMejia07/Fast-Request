import React, { useState, useRef, useEffect } from 'react';
import "../../assets/css/configuracion.css";
import { Link } from 'react-router-dom';

// Componente para mostrar notificaciones toast
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-content">
        <ion-icon name={type === 'success' ? 'checkmark-circle' : 'alert-circle'}></ion-icon>
        <span>{message}</span>
      </div>
      <button className="toast-close" onClick={onClose}>×</button>
    </div>
  );
};

const Dashboard = () => {
  // Estados para la interfaz
  const [navActive, setNavActive] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [userName, setUserName] = useState("Usuario");
  const [selectedTheme, setSelectedTheme] = useState('light');
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    updates: true
  });
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [passwordVisibility, setPasswordVisibility] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [passwordStrength, setPasswordStrength] = useState({
    strength: 0,
    status: 'Débil',
    color: '#ea4335'
  });

  // Estado para notificaciones toast
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success'
  });

  const userMenuRef = useRef(null);
  const fileInputRef = useRef(null);

  // Mostrar mensaje toast
  const showToast = (message, type = 'success') => {
    setToast({
      show: true,
      message,
      type
    });
  };

  // Cerrar toast
  const closeToast = () => {
    setToast(prev => ({ ...prev, show: false }));
  };

  // Aplicar tema cuando cambia
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', selectedTheme);
  }, [selectedTheme]);

  // Click outside handler para el menú de usuario
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Funciones toggle
  const toggleMenu = () => setNavActive(prev => !prev);
  const toggleUserMenu = () => setUserMenuOpen(prev => !prev);
  const togglePasswordVisibility = (field) => {
    setPasswordVisibility(prev => ({ ...prev, [field]: !prev[field] }));
  };

  // Calcular fuerza de contraseña
  const calculatePasswordStrength = (password) => {
    if (!password) return { strength: 0, status: 'Débil', color: '#ea4335' };
    
    let strength = 0;
    
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 20;
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;
    if (password.length >= 12) strength += 15;
    
    strength = Math.min(strength, 100);
    
    let status, color;
    if (strength >= 80) {
      status = 'Muy Fuerte';
      color = '#0f9d58';
    } else if (strength >= 60) {
      status = 'Fuerte';
      color = '#34a853';
    } else if (strength >= 40) {
      status = 'Medio';
      color = '#fbbc05';
    } else {
      status = 'Débil';
      color = '#ea4335';
    }
    
    return { strength, status, color };
  };

  // Event handlers
  const handleMenuItemHover = (index) => setActiveMenuItem(index);
  
  const handleLogout = (e) => {
    e.preventDefault();
    // Simulación de logout
    showToast("Cerrando sesión...", "success");
    setTimeout(() => {
      alert("Has cerrado sesión correctamente");
      // Aquí normalmente redirigirías al usuario a la página de login
      // history.push('/login');
    }, 1000);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      const maxSize = 5 * 1024 * 1024; // 5MB
      
      if (!validTypes.includes(file.type)) {
        showToast("Por favor selecciona una imagen (JPG, PNG, GIF)", "error");
        return;
      }
      
      if (file.size > maxSize) {
        showToast("La imagen no debe superar los 5MB", "error");
        return;
      }
      
      setSelectedFile(file);
      showToast("Imagen seleccionada: " + file.name, "success");
    }
  };

  const saveName = () => {
    if (!userName.trim()) {
      showToast("El nombre de usuario no puede estar vacío", "error");
      return;
    }
    
    // Simulando solicitud al servidor
    showToast("Guardando nombre...", "success");
    
    // Simulación de respuesta exitosa después de 1 segundo
    setTimeout(() => {
      showToast("Nombre guardado correctamente: " + userName, "success");
    }, 1000);
  };

  const handlePasswordChange = (e) => {
    const { id, value } = e.target;
    let key = '';
    
    if (id === 'actual-password') key = 'current';
    else if (id === 'nueva-password') {
      key = 'new';
      setPasswordStrength(calculatePasswordStrength(value));
    } 
    else key = 'confirm';
    
    setPasswords(prev => ({ ...prev, [key]: value }));
  };

  const savePassword = () => {
    if (!passwords.current) {
      showToast("Por favor ingresa tu contraseña actual", "error");
      return;
    }
    
    if (!passwords.new) {
      showToast("Por favor ingresa una nueva contraseña", "error");
      return;
    }
    
    if (passwords.new !== passwords.confirm) {
      showToast("Las contraseñas no coinciden", "error");
      return;
    }
    
    if (passwordStrength.strength < 40) {
      showToast("Tu contraseña es demasiado débil", "error");
      return;
    }
    
    // Simulando solicitud al servidor
    showToast("Cambiando contraseña...", "success");
    
    // Simulación de respuesta exitosa después de 1 segundo
    setTimeout(() => {
      showToast("Contraseña cambiada correctamente", "success");
      // Limpiar formulario
      setPasswords({
        current: '',
        new: '',
        confirm: ''
      });
      setPasswordStrength({
        strength: 0,
        status: 'Débil',
        color: '#ea4335'
      });
    }, 1000);
  };

  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    setSelectedTheme(newTheme);
    showToast(`Tema cambiado a ${newTheme === 'light' ? 'claro' : newTheme === 'dark' ? 'oscuro' : 'automático'}`, "success");
  };

  const handleNotificationToggle = (type) => {
    setNotifications(prev => {
      const updated = {
        ...prev,
        [type]: !prev[type]
      };
      
      const status = updated[type] ? "activadas" : "desactivadas";
      const typeText = type === 'email' ? 'correo electrónico' : 
                      type === 'push' ? 'push' : 'actualizaciones';
      
      showToast(`Notificaciones de ${typeText} ${status}`, "success");
      return updated;
    });
  };

  const resetConfig = () => {
    if (window.confirm("¿Estás seguro de que deseas restablecer todas las configuraciones?")) {
      setSelectedTheme('light');
      setNotifications({
        email: true,
        push: false,
        updates: true
      });
      
      document.documentElement.setAttribute('data-theme', 'light');
      showToast("Configuraciones restablecidas correctamente", "success");
    }
  };

  const saveProfilePicture = () => {
    if (!selectedFile) {
      showToast("Por favor selecciona una imagen primero", "error");
      return;
    }
    
    // Simulando carga de archivo
    showToast("Subiendo imagen...", "success");
    
    // Simulación de respuesta exitosa después de 2 segundos
    setTimeout(() => {
      showToast("Imagen subida correctamente: " + selectedFile.name, "success");
    }, 2000);
  };

  // Componente para campos de contraseña
  const PasswordInput = ({ id, label, placeholder, value, visible }) => (
    <div className="input-group password-group">
      <label htmlFor={id} className="input-label">{label}</label>
      <div className="password-wrapper">
        <input 
          type={visible ? "text" : "password"} 
          id={id} 
          placeholder={placeholder}
          value={value}
          onChange={handlePasswordChange}
          className="password-input"
        />
        <span 
          className="toggle-visibility" 
          onClick={() => togglePasswordVisibility(id === 'actual-password' ? 'current' : id === 'nueva-password' ? 'new' : 'confirm')}>
          <ion-icon name={visible ? "eye-off-outline" : "eye-outline"}></ion-icon>
        </span>
      </div>
    </div>
  );

  // Componente para toggles de notificación
  const NotificationToggle = ({ type, icon, label, checked }) => (
    <div className="notification-option">
      <label className="toggle-switch">
        <input 
          type="checkbox" 
          checked={checked}
          onChange={() => handleNotificationToggle(type)}
          className="toggle-checkbox"
        />
        <span className="toggle-track"></span>
        <div className="toggle-label-wrapper">
          <ion-icon name={icon} className="toggle-icon"></ion-icon>
          <span className="toggle-text">{label}</span>
        </div>
      </label>
    </div>
  );

  return (
    <section className="dashboard-section">
      {/* Sistema de notificaciones toast */}
      {toast.show && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={closeToast} 
        />
      )}
      
      {/* MENU LATERAL */}
      <div className={`dashboard-nav ${navActive ? 'active' : ''}`}>
        <ul className="dashboard-menu">
          <li onMouseOver={() => handleMenuItemHover(0)} className={activeMenuItem === 0 ? 'active' : ''}>
            <a href="#" className="dashboard-link">
              <span className="dashboard-icon"><ion-icon name="happy"></ion-icon></span>
              <span className="dashboard-label">Logo</span>
            </a>
          </li>
          <li onMouseOver={() => handleMenuItemHover(1)} className={activeMenuItem === 1 ? 'active' : ''}>
            <Link to="/dashboard" className="dashboard-link">
              <span className="dashboard-icon"><ion-icon name="home"></ion-icon></span>
              <span className="dashboard-label">Inicio</span>
            </Link>
          </li>
          <li onMouseOver={() => handleMenuItemHover(2)} className={activeMenuItem === 2 ? 'active' : ''}>
            <Link to="/perfil" className="dashboard-link">
              <span className="dashboard-icon"><ion-icon name="person-circle"></ion-icon></span>
              <span className="dashboard-label">Perfil</span>
            </Link>
          </li>
          <li onMouseOver={() => handleMenuItemHover(3)} className={activeMenuItem === 3 ? 'active' : ''}>
            <Link to="/configuracion" className="dashboard-link">
              <span className="dashboard-icon"><ion-icon name="cog"></ion-icon></span>
              <span className="dashboard-label">Configuraciones</span>
            </Link>
          </li>
          <li onMouseOver={() => handleMenuItemHover(4)} className={activeMenuItem === 4 ? 'active' : ''}>
            <Link to="/registo" onClick={handleLogout} className="dashboard-link">
              <span className="dashboard-icon">
              <ion-icon name="log-out"></ion-icon>
              </span>
              <span className="dashboard-label">Cerrar sesión</span>
            </Link>
          </li>
        </ul>
      </div>
      {/* FIN MENU */}
      
      {/* DASHBOARD CONTAINER */}
      <div className={`dashboard-container ${navActive ? 'active' : ''}`}>
        {/* BARRA SUPERIOR (TOPBAR) */}
        <div className="dashboard-topbar">
          <div className="dashboard-toggle" onClick={toggleMenu}>
            <ion-icon name="menu"></ion-icon>
          </div>
          <div className="dashboard-search">
            <label className="search-label">
              <input type="text" placeholder="Buscar" className="search-input" /> 
              <ion-icon name="search" className="search-icon"></ion-icon>
            </label>
          </div>
          <div 
            className={`dashboard-user-profile ${userMenuOpen ? 'active' : ''}`}
            ref={userMenuRef}
          >
            <img 
              src="../../../public/img/user.png" 
              alt="Usuario" 
              className="user-avatar" 
              onClick={toggleUserMenu}
            />
            {/* Menú desplegable */}
            {userMenuOpen && (
              <div className="user-menu">
                <ul className="user-menu-list">
                  <li className="user-menu-item">
                    <Link to="/perfil" className="user-menu-link">
                      <span className="user-menu-icon"><ion-icon name="person-circle"></ion-icon></span>
                      <span className="user-menu-text">Cuenta</span>
                    </Link>
                  </li>
                  <li className="user-menu-item">
                    <Link to="/configuracion" className="user-menu-link">
                      <span className="user-menu-icon"><ion-icon name="cog"></ion-icon></span>
                      <span className="user-menu-text">Configuraciones</span>
                    </Link>
                  </li>
                  <li className="user-menu-item">
                    <a href="#" onClick={handleLogout} className="user-menu-link">
                      <span className="user-menu-icon"><ion-icon name="log-out"></ion-icon></span>
                      <span className="user-menu-text">Cerrar sesión</span>
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        {/* FIN DE LA TOPBAR */}
        
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
                    visible={passwordVisibility.current}
                  />
                  
                  <PasswordInput 
                    id="nueva-password"
                    label="Nueva Contraseña:"
                    placeholder="Ingrese su nueva contraseña"
                    value={passwords.new}
                    visible={passwordVisibility.new}
                  />
                  
                  <PasswordInput 
                    id="confirm-password"
                    label="Confirmar Contraseña:"
                    placeholder="Confirme su nueva contraseña"
                    value={passwords.confirm}
                    visible={passwordVisibility.confirm}
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
            
            {/* Notificaciones */}
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
                    />
                    
                    <NotificationToggle 
                      type="push"
                      icon="phone-portrait-outline"
                      label="Notificaciones push"
                      checked={notifications.push}
                    />
                    
                    <NotificationToggle 
                      type="updates"
                      icon="refresh-outline"
                      label="Actualizaciones del sistema"
                      checked={notifications.updates}
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
      </div>
      
      {/* Estilos CSS para las notificaciones toast */}
      <style jsx>{`
        .toast {
          position: fixed;
          top: 20px;
          right: 20px;
          padding: 12px 20px;
          border-radius: 6px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
          display: flex;
          align-items: center;
          justify-content: space-between;
          animation: slideIn 0.3s ease-out;
          z-index: 9999;
          min-width: 250px;
          max-width: 450px;
        }
        
        .toast-success {
          background-color: #d4edda;
          color: #155724;
          border-left: 5px solid #28a745;
        }
        
        .toast-error {
          background-color: #f8d7da;
          color: #721c24;
          border-left: 5px solid #dc3545;
        }
        
        .toast-content {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .toast-content ion-icon {
          font-size: 20px;
        }
        
        .toast-close {
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          color: inherit;
          opacity: 0.7;
        }
        
        .toast-close:hover {
          opacity: 1;
        }
        
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
};

export default Dashboard;