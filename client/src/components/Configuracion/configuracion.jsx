import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

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

// Componente para toggles de notificación
const NotificationToggle = ({ type, icon, label, checked, onChange }) => {
  return (
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
};

const Dashboard = () => {
  // Estados para la interfaz
  const [navActive, setNavActive] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [userName, setUserName] = useState("Usuario");
  const [selectedTheme, setSelectedTheme] = useState('light');
  const [actionStatus, setActionStatus] = useState('');
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
    'actual-password': false,
    'nueva-password': false,
    'confirm-password': false
  });
  const [passwordStrength, setPasswordStrength] = useState({
    strength: 0,
    status: 'Débil',
    color: '#ea4335'
  });

  const userMenuRef = useRef(null);
  const fileInputRef = useRef(null);
  const statusTimeoutRef = useRef(null);

  // Mostrar mensaje de estado
  const showStatus = (message) => {
    setActionStatus(message);
    
    // Limpiar cualquier timeout existente
    if (statusTimeoutRef.current) {
      clearTimeout(statusTimeoutRef.current);
    }
    
    // Establecer un nuevo timeout para limpiar el mensaje después de 3 segundos
    statusTimeoutRef.current = setTimeout(() => {
      setActionStatus('');
    }, 3000);
  };

  // Limpiar timeout al desmontar el componente
  useEffect(() => {
    return () => {
      if (statusTimeoutRef.current) {
        clearTimeout(statusTimeoutRef.current);
      }
    };
  }, []);

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
  
  // Función para toggle de visibilidad de contraseña
  const togglePasswordVisibility = (id) => {
    setPasswordVisibility(prev => ({ 
      ...prev, 
      [id]: !prev[id] 
    }));
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

    if (window.confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      window.location.href = "/";
    } else {
      console.log("El usuario decidió no cerrar sesión.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      const maxSize = 5 * 1024 * 1024; // 5MB
      
      if (!validTypes.includes(file.type)) {
        alert("Por favor selecciona una imagen (JPG, PNG, GIF)");
        return;
      }
      
      if (file.size > maxSize) {
        alert("La imagen no debe superar los 5MB");
        return;
      }
      
      setSelectedFile(file);
      showStatus(`Imagen seleccionada: ${file.name}`);
    }
  };

  const saveName = () => {
    if (!userName.trim()) {
      alert("El nombre de usuario no puede estar vacío");
      return;
    }
    
    // Simulando solicitud al servidor
    showStatus("Guardando nombre...");
    
    // Simulación de respuesta exitosa después de 1 segundo
    setTimeout(() => {
      const oldName = userName;
      // Guardar el nombre actual en una variable temporal
      const tempName = userName;
      // Limpiar el campo
      setUserName("");
      // Mostrar mensaje
      showStatus(`Nombre guardado correctamente: ${tempName}`);
      // Opcional: restaurar el nombre después de un segundo para mejor UX
      setTimeout(() => {
        setUserName(tempName);
      }, 200);
    }, 1000);
  };

  // Manejador para cambios en campos de contraseña
  const handlePasswordChange = (e) => {
    const { id, value } = e.target;
    let fieldName = '';
    
    switch(id) {
      case 'actual-password':
        fieldName = 'current';
        break;
      case 'nueva-password':
        fieldName = 'new';
        // Actualiza la fuerza de la contraseña
        setPasswordStrength(calculatePasswordStrength(value));
        break;
      case 'confirm-password':
        fieldName = 'confirm';
        break;
      default:
        fieldName = '';
    }
    
    if (fieldName) {
      setPasswords(prev => ({ ...prev, [fieldName]: value }));
    }
  };

  // Función para manejar cambios en notificaciones
  const handleNotificationToggle = (type) => {
    setNotifications(prev => {
      const updated = { ...prev, [type]: !prev[type] };
      
      const status = updated[type] ? "activadas" : "desactivadas";
      const typeText = type === 'email' ? 'correo electrónico' : 
                      type === 'push' ? 'push' : 'actualizaciones';
      
      showStatus(`Notificaciones de ${typeText} ${status}`);
      return updated;
    });
  };

  const savePassword = () => {
    if (!passwords.current) {
      alert("Por favor ingresa tu contraseña actual");
      return;
    }
    
    if (!passwords.new) {
      alert("Por favor ingresa una nueva contraseña");
      return;
    }
    
    if (passwords.new !== passwords.confirm) {
      alert("Las contraseñas no coinciden");
      return;
    }
    
    if (passwordStrength.strength < 40) {
      alert("Tu contraseña es demasiado débil");
      return;
    }
    
    // Simulando solicitud al servidor
    showStatus("Cambiando contraseña...");
    
    // Simulación de respuesta exitosa después de 1 segundo
    setTimeout(() => {
      // Guardar temporalmente el estado de fuerza de contraseña
      const oldStrength = passwordStrength;
      
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
      
      // Mostrar confirmación
      showStatus("Contraseña cambiada correctamente");
      
      // Efecto visual para mostrar éxito (cambio de color en la barra de fuerza)
      setTimeout(() => {
        setPasswordStrength({
          ...oldStrength,
          color: '#4CAF50' // Verde para indicar éxito
        });
        
        setTimeout(() => {
          setPasswordStrength({
            strength: 0,
            status: 'Débil',
            color: '#ea4335'
          });
        }, 500);
      }, 300);
    }, 1000);
  };

  const handleThemeChange = (e) => {
    const oldTheme = selectedTheme;
    const newTheme = e.target.value;
    
    // Añadir clase de animación
    document.documentElement.classList.add('theme-transition');
    
    // Cambiar tema
    setSelectedTheme(newTheme);
    
    // Mostrar estado
    showStatus(`Tema cambiado a ${newTheme === 'light' ? 'claro' : newTheme === 'dark' ? 'oscuro' : 'automático'}`);
    
    // Quitar clase de animación después de la transición
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 500);
  };

  const resetConfig = () => {
    if (window.confirm("¿Estás seguro de que deseas restablecer todas las configuraciones?")) {
      // Guardar tema actual
      const oldTheme = selectedTheme;
      
      // Aplicar tema predeterminado
      setSelectedTheme('light');
      document.documentElement.setAttribute('data-theme', 'light');
      
      // Restablecer notificaciones
      setNotifications({
        email: true,
        push: false,
        updates: true
      });
      
      // Añadir animación
      document.documentElement.classList.add('reset-animation');
      
      showStatus("Configuraciones restablecidas correctamente");
      
      // Quitar animación después de completarse
      setTimeout(() => {
        document.documentElement.classList.remove('reset-animation');
      }, 1000);
    }
  };

  const saveProfilePicture = () => {
    if (!selectedFile) {
      alert("Por favor selecciona una imagen primero");
      return;
    }
    
    // Simulando carga de archivo
    showStatus("Subiendo imagen...");
    
    // Guardar referencia del archivo actual para mostrar en el mensaje
    const currentFile = selectedFile;
    
    // Simulación de respuesta exitosa después de 2 segundos
    setTimeout(() => {
      // Limpiar el campo de archivo
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      // Mostrar animación de éxito
      const filePreview = document.querySelector('.custom-file-selector');
      if (filePreview) {
        filePreview.classList.add('upload-success');
        setTimeout(() => {
          filePreview.classList.remove('upload-success');
        }, 1000);
      }
      
      showStatus(`Imagen subida correctamente: ${currentFile.name}`);
      
      // Limpiar el estado de archivo seleccionado
      setSelectedFile(null);
    }, 2000);
  };

  return (
    <section className="dashboard-section">
      {/* Indicador de estado de acción */}
      {actionStatus && (
        <div className="action-status">
          {actionStatus}
        </div>
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
                    <a href="/" onClick={handleLogout} className="user-menu-link">
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
    </section>
  );
};

export default Dashboard;