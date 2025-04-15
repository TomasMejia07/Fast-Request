import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../assets/css/configuracion.css";


const DashboardConfig = () => {
  // Estados para la navegación y el menú
  const [navActive, setNavActive] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  // Estados para las configuraciones
  const [selectedTheme, setSelectedTheme] = useState('light');
  const [passwordStrength, setPasswordStrength] = useState({
    strength: 0,
    status: 'Fuerza de contraseña',
    color: ''
  });
  const [notifications, setNotifications] = useState({
    email: false,
    push: false,
    updates: false
  });
  const [userName, setUserName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  
  // Estados para los campos de contraseña
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
  
  // Referencias para el cierre de menús al hacer clic fuera
  const userMenuRef = useRef(null);
  const navigate = useNavigate();
  
  // Manejo de eventos de navegación
  const handleMenuItemHover = (index) => {
    setActiveMenuItem(index);
  };
  
  const toggleMenu = () => {
    setNavActive(!navActive);
  };
  
  const toggleUserMenu = (e) => {
    e.stopPropagation();
    setUserMenuOpen(!userMenuOpen);
  };
  
  // Manejo de campos de formulario
  const handlePasswordChange = (e) => {
    const { id, value } = e.target;
    let fieldName = '';
    
    if (id === 'actual-password') fieldName = 'current';
    else if (id === 'nueva-password') fieldName = 'new';
    else if (id === 'confirm-password') fieldName = 'confirm';
    
    setPasswords({
      ...passwords,
      [fieldName]: value
    });
    
    // Evaluar fuerza de contraseña para el campo nueva contraseña
    if (id === 'nueva-password') {
      evaluatePasswordStrength(value);
    }
  };
  
  const evaluatePasswordStrength = (password) => {
    let strength = 0;
    let status = '';
    let color = '';
    
    // Criterios de fuerza de contraseña
    if (password.length > 6) strength += 20;
    if (password.length > 10) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 20;
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;
    
    // Definir color y texto según la fuerza
    if (strength < 40) {
      color = '#ea4335'; // Rojo
      status = 'Débil';
    } else if (strength < 70) {
      color = '#fbbc05'; // Amarillo
      status = 'Moderada';
    } else {
      color = '#34a853'; // Verde
      status = 'Fuerte';
    }
    
    setPasswordStrength({ strength, status, color });
  };
  
  const togglePasswordVisibility = (field) => {
    setPasswordVisibility({
      ...passwordVisibility,
      [field]: !passwordVisibility[field]
    });
  };
  
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  const handleThemeChange = (e) => {
    const themeValue = e.target.value;
    setSelectedTheme(themeValue);
    document.documentElement.setAttribute('data-theme', themeValue);
    showNotification(`Tema cambiado a modo ${themeValue}`, 'success');
  };
  
  const handleNotificationToggle = (type) => {
    setNotifications({
      ...notifications,
      [type]: !notifications[type]
    });
  };
  
  // Funciones para guardar cambios
  const saveName = () => {
    if (userName.trim() !== '') {
      showNotification('Nombre actualizado correctamente', 'success');
    } else {
      showNotification('Por favor ingrese un nombre válido', 'error');
    }
  };
  
  const savePassword = () => {
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      showNotification('Todos los campos son requeridos', 'error');
      return;
    }
    
    if (passwords.new !== passwords.confirm) {
      showNotification('Las contraseñas no coinciden', 'error');
      return;
    }
    
    showNotification('Contraseña actualizada correctamente', 'success');
  };
  
  const resetConfig = () => {
    if (window.confirm('¿Está seguro que desea restablecer todas las configuraciones? Esta acción no se puede deshacer.')) {
      showNotification('Configuraciones restablecidas correctamente', 'success');
    }
  };
  
  const handleLogout = (e) => {
    e.preventDefault();
    const confirmLogout = window.confirm("¿Estás seguro de que deseas cerrar sesión?");
    if (confirmLogout) {
      navigate('/CerrarSesion');
    }
  };
  
  // Notificación
  const showNotification = (message, type) => {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <ion-icon name="${type === 'success' ? 'checkmark-circle' : 'alert-circle'}-outline"></ion-icon>
      <p>${message}</p>
    `;
    
    // Añadir al DOM
    document.body.appendChild(notification);
    
    // Mostrar con animación
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    // Eliminar después de 3 segundos
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  };
  
  // Efecto para cerrar el menú de usuario al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <section>
      {/* MENU */}
      <div className={`nav ${navActive ? 'active' : ''}`}>
        <ul>
          <li onMouseOver={() => handleMenuItemHover(0)} className={activeMenuItem === 0 ? 'active' : ''}>
            <a href="">
              <span className="icono"><ion-icon name="happy"></ion-icon></span>
              <span className="titulo">Logo</span>
            </a>
          </li>
          <li onMouseOver={() => handleMenuItemHover(1)} className={activeMenuItem === 1 ? 'active' : ''}>
            <a href="index.html">
              <span className="icono"><ion-icon name="home"></ion-icon></span>
              <span className="titulo">Inicio</span>
            </a>
          </li>
          <li onMouseOver={() => handleMenuItemHover(2)} className={activeMenuItem === 2 ? 'active' : ''}>
            <a href="perfil.html">
              <span className="icono"><ion-icon name="person-circle"></ion-icon></span>
              <span className="titulo">perfil</span>
            </a>
          </li>
          <li onMouseOver={() => handleMenuItemHover(3)} className={activeMenuItem === 3 ? 'active' : ''}>
            <a href="configuracion.html">
              <span className="icono"><ion-icon name="cog"></ion-icon></span>
              <span className="titulo"> Configuraciones</span>
            </a>
          </li>
          <li onMouseOver={() => handleMenuItemHover(4)} className={activeMenuItem === 4 ? 'active' : ''}>
            <a href="#" onClick={handleLogout}>
              <span className="icono"><ion-icon name="log-out"></ion-icon></span>
              <span className="titulo"> Cerrar sesion</span>
            </a>
          </li>
        </ul>
      </div>
      {/* FIN MENU */}
      
      {/* DASHBOARD */}
      <div className={`container ${navActive ? 'active' : ''}`}>
        {/* BARRA SUPERIOR (TOPBAR) */}
        <div className="topbar">
          <div className="toggle" onClick={toggleMenu}>
            <ion-icon name="menu"></ion-icon>
          </div>
          <div className="buscar">
            <label>
              <input type="text" placeholder="Buscar" /> 
              <ion-icon name="search"></ion-icon>
            </label>
          </div>
          <div 
            className={`perfil-usuario ${userMenuOpen ? 'active' : ''}`} 
            onClick={toggleUserMenu}
            ref={userMenuRef}
          >
            <img src="../../../public/img/user.png" alt="" />
            {/* Menú desplegable */}
            <div className="menu-perfil">
              <ul>
                <li>
                  <a href="perfil.html">
                    <span className="icono-menu-user"><ion-icon name="person-circle"></ion-icon></span>
                    <span className="titulo">Cuenta</span>
                  </a>
                </li>
                <li>
                  <a href="configuracion.html">
                    <span className="icono-menu-user"><ion-icon name="cog"></ion-icon></span>
                    <span className="titulo">Configuraciones</span>
                  </a>
                </li>
                <li>
                  <a href="#" onClick={handleLogout}>
                    <span className="icono-menu-user"><ion-icon name="log-out"></ion-icon></span>
                    <span className="titulo">Cerrar sesión</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* FIN DE LA TOPBAR */}
        
        {/* configuraciones */}
        <div className="config-container">
          <div className="config-header">
            <h2>Configuraciones</h2>
            <p className="config-subtitle">Personaliza tu experiencia según tus preferencias</p>
          </div>
          
          <div className="config-section">
            <div className="section-title">
              <ion-icon name="image-outline"></ion-icon>
              <h3>Perfil</h3>
            </div>
            <div className="config-card">
              <div className="card-content">
                <div className="card-icon">
                  <ion-icon name="image-outline"></ion-icon>
                </div>
                <div className="card-details">
                  <h4>Subir Nuevo Logo</h4>
                  <p>Actualiza el logo de tu perfil con una imagen personalizada</p>
                  <div className="form-group">
                    <label htmlFor="nuevo-logo" className="custom-file-upload">
                      <ion-icon name="cloud-upload-outline"></ion-icon>
                      {selectedFile ? selectedFile.name : 'Seleccionar imagen'}
                    </label>
                    <input 
                      type="file" 
                      id="nuevo-logo" 
                      accept="image/*" 
                      onChange={handleFileChange}
                    />
                  </div>
                  <button className="btn-primary">
                    <ion-icon name="save-outline"></ion-icon>
                    Guardar Logo
                  </button>
                </div>
              </div>
            </div>
            
            {/* Cambiar Nombre */}
            <div className="config-card">
              <div className="card-content">
                <div className="card-icon">
                  <ion-icon name="person-outline"></ion-icon>
                </div>
                <div className="card-details">
                  <h4>Cambiar Nombre de Usuario</h4>
                  <p>Modifica como aparece tu nombre en la plataforma</p>
                  <div className="form-group">
                    <label htmlFor="nombre-usuario">Nuevo Nombre:</label>
                    <input 
                      type="text" 
                      id="nombre-usuario" 
                      placeholder="Ingrese su nuevo nombre"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                  <button className="btn-primary" onClick={saveName}>
                    <ion-icon name="save-outline"></ion-icon>
                    Guardar Nombre
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="config-section">
            <div className="section-title">
              <ion-icon name="shield-outline"></ion-icon>
              <h3>Seguridad</h3>
            </div>
            
            {/* Cambiar Contraseña */}
            <div className="config-card">
              <div className="card-content">
                <div className="card-icon">
                  <ion-icon name="lock-closed-outline"></ion-icon>
                </div>
                <div className="card-details">
                  <h4>Cambiar Contraseña</h4>
                  <p>Actualiza tu contraseña para mantener tu cuenta segura</p>
                  <div className="form-group password-group">
                    <label htmlFor="actual-password">Contraseña Actual:</label>
                    <div className="password-input">
                      <input 
                        type={passwordVisibility.current ? "text" : "password"} 
                        id="actual-password" 
                        placeholder="Ingrese su contraseña actual"
                        value={passwords.current}
                        onChange={handlePasswordChange}
                      />
                      <span 
                        className="toggle-password" 
                        onClick={() => togglePasswordVisibility('current')}
                      >
                        <ion-icon name={passwordVisibility.current ? "eye-off-outline" : "eye-outline"}></ion-icon>
                      </span>
                    </div>
                  </div>
                  <div className="form-group password-group">
                    <label htmlFor="nueva-password">Nueva Contraseña:</label>
                    <div className="password-input">
                      <input 
                        type={passwordVisibility.new ? "text" : "password"} 
                        id="nueva-password" 
                        placeholder="Ingrese su nueva contraseña"
                        value={passwords.new}
                        onChange={handlePasswordChange}
                      />
                      <span 
                        className="toggle-password" 
                        onClick={() => togglePasswordVisibility('new')}
                      >
                        <ion-icon name={passwordVisibility.new ? "eye-off-outline" : "eye-outline"}></ion-icon>
                      </span>
                    </div>
                  </div>
                  <div className="form-group password-group">
                    <label htmlFor="confirm-password">Confirmar Contraseña:</label>
                    <div className="password-input">
                      <input 
                        type={passwordVisibility.confirm ? "text" : "password"} 
                        id="confirm-password" 
                        placeholder="Confirme su nueva contraseña"
                        value={passwords.confirm}
                        onChange={handlePasswordChange}
                      />
                      <span 
                        className="toggle-password" 
                        onClick={() => togglePasswordVisibility('confirm')}
                      >
                        <ion-icon name={passwordVisibility.confirm ? "eye-off-outline" : "eye-outline"}></ion-icon>
                      </span>
                    </div>
                  </div>
                  <div className="password-strength">
                    <div className="strength-meter">
                      <div 
                        className="strength-bar" 
                        style={{ 
                          width: `${passwordStrength.strength}%`,
                          backgroundColor: passwordStrength.color 
                        }}
                      ></div>
                    </div>
                    <span>{`Fuerza de contraseña: ${passwordStrength.status}`}</span>
                  </div>
                  <button className="btn-primary" onClick={savePassword}>
                    <ion-icon name="shield-checkmark-outline"></ion-icon>
                    Cambiar Contraseña
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="config-section">
            <div className="section-title">
              <ion-icon name="options-outline"></ion-icon>
              <h3>Preferencias</h3>
            </div>
            
            {/* Alternar Tema */}
            <div className="config-card">
              <div className="card-content">
                <div className="card-icon">
                  <ion-icon name="contrast-outline"></ion-icon>
                </div>
                <div className="card-details">
                  <h4>Modo de Tema</h4>
                  <p>Personaliza la apariencia de la plataforma</p>
                  <div className="theme-toggle-container">
                    <div className="theme-option">
                      <label htmlFor="theme-light" className="theme-label">
                        <input 
                          type="radio" 
                          id="theme-light" 
                          name="theme" 
                          value="light" 
                          checked={selectedTheme === 'light'}
                          onChange={handleThemeChange}
                        />
                        <div className="theme-preview light">
                          <ion-icon name="sunny-outline"></ion-icon>
                          <span>Claro</span>
                        </div>
                      </label>
                    </div>
                    <div className="theme-option">
                      <label htmlFor="theme-dark" className="theme-label">
                        <input 
                          type="radio" 
                          id="theme-dark" 
                          name="theme" 
                          value="dark"
                          checked={selectedTheme === 'dark'}
                          onChange={handleThemeChange}
                        />
                        <div className="theme-preview dark">
                          <ion-icon name="moon-outline"></ion-icon>
                          <span>Oscuro</span>
                        </div>
                      </label>
                    </div>
                    <div className="theme-option">
                      <label htmlFor="theme-auto" className="theme-label">
                        <input 
                          type="radio" 
                          id="theme-auto" 
                          name="theme" 
                          value="auto"
                          checked={selectedTheme === 'auto'}
                          onChange={handleThemeChange}
                        />
                        <div className="theme-preview auto">
                          <ion-icon name="sync-outline"></ion-icon>
                          <span>Auto</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Notificaciones */}
            <div className="config-card">
              <div className="card-content">
                <div className="card-icon">
                  <ion-icon name="notifications-outline"></ion-icon>
                </div>
                <div className="card-details">
                  <h4>Gestión de Notificaciones</h4>
                  <p>Configura cómo quieres recibir tus notificaciones</p>
                  <div className="toggle-switches">
                    <div className="toggle-group">
                      <label className="toggle">
                        <input 
                          type="checkbox" 
                          checked={notifications.email}
                          onChange={() => handleNotificationToggle('email')}
                        />
                        <span className="toggle-slider"></span>
                        <div className="toggle-label">
                          <ion-icon name="mail-outline"></ion-icon>
                          <span>Correo electrónico</span>
                        </div>
                      </label>
                    </div>
                    <div className="toggle-group">
                      <label className="toggle">
                        <input 
                          type="checkbox" 
                          checked={notifications.push}
                          onChange={() => handleNotificationToggle('push')}
                        />
                        <span className="toggle-slider"></span>
                        <div className="toggle-label">
                          <ion-icon name="phone-portrait-outline"></ion-icon>
                          <span>Notificaciones push</span>
                        </div>
                      </label>
                    </div>
                    <div className="toggle-group">
                      <label className="toggle">
                        <input 
                          type="checkbox" 
                          checked={notifications.updates}
                          onChange={() => handleNotificationToggle('updates')}
                        />
                        <span className="toggle-slider"></span>
                        <div className="toggle-label">
                          <ion-icon name="refresh-outline"></ion-icon>
                          <span>Actualizaciones del sistema</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="config-section">
            <div className="section-title">
              <ion-icon name="settings-outline"></ion-icon>
              <h3>Avanzado</h3>
            </div>
            
            {/* Restablecer Configuraciones */}
            <div className="config-card danger-zone">
              <div className="card-content">
                <div className="card-icon danger">
                  <ion-icon name="refresh-outline"></ion-icon>
                </div>
                <div className="card-details">
                  <h4>Restablecer Configuraciones</h4>
                  <p>Esto restablecerá todas las configuraciones a sus valores predeterminados.</p>
                  <button className="btn-danger" onClick={resetConfig}>
                    <ion-icon name="refresh-outline"></ion-icon>
                    Restablecer Configuraciones
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardConfig;