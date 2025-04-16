
import React, { useState, useRef, useEffect } from 'react';
import "../../assets/css/configuracion.css"
import { Link } from 'react-router-dom';

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

  const userMenuRef = useRef(null);

  // Funciones para manejar eventos
  const toggleMenu = () => {
    setNavActive(!navActive);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const handleMenuItemHover = (index) => {
    setActiveMenuItem(index);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    // Lógica para cerrar sesión
    console.log("Cerrando sesión...");
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const saveName = () => {
    // Lógica para guardar el nombre
    console.log("Guardando nombre:", userName);
    // Mostrar notificación de éxito
  };

  const handlePasswordChange = (e) => {
    const { id, value } = e.target;
    let key = '';
    
    if (id === 'actual-password') key = 'current';
    else if (id === 'nueva-password') {
      key = 'new';
      // Calcula la fuerza de la contraseña
      let strength = 0;
      let status = 'Débil';
      let color = '#ea4335';
      
      if (value.length > 6) strength += 25;
      if (/[A-Z]/.test(value)) strength += 25;
      if (/[0-9]/.test(value)) strength += 25;
      if (/[^A-Za-z0-9]/.test(value)) strength += 25;
      
      if (strength >= 75) {
        status = 'Fuerte';
        color = '#34a853';
      } else if (strength >= 50) {
        status = 'Medio';
        color = '#fbbc05';
      }
      
      setPasswordStrength({ strength, status, color });
    } 
    else key = 'confirm';
    
    setPasswords(prev => ({ ...prev, [key]: value }));
  };

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const savePassword = () => {
    // Validar que las contraseñas coincidan
    if (passwords.new !== passwords.confirm) {
      alert("Las contraseñas no coinciden");
      return;
    }
    // Lógica para guardar la contraseña
    console.log("Guardando nueva contraseña");
  };

  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    setSelectedTheme(newTheme);
    // Aplicar tema
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleNotificationToggle = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const resetConfig = () => {
    // Lógica para resetear configuraciones
    if (window.confirm("¿Estás seguro de que deseas restablecer todas las configuraciones?")) {
      setSelectedTheme('light');
      setNotifications({
        email: true,
        push: false,
        updates: true
      });
      // Mostrar notificación de éxito
      console.log("Configuraciones restablecidas");
    }
  };

  // Cerrar menú de usuario cuando se hace clic fuera
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
    <section className="dashboard-section">
      {/* MENU LATERAL */}
      <div className={`dashboard-nav ${navActive ? 'active' : ''}`}>
        <ul className="dashboard-menu">
          <li onMouseOver={() => handleMenuItemHover(0)} className={activeMenuItem === 0 ? 'active' : ''}>
            <a href="#" className="dashboard-link">
              <span className="dashboard-icon"><ion-icon name="happy"></ion-icon></span>
              <span className="dashboard-label">Logo</span>
            </a>
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
            <a href="#" onClick={handleLogout} className="dashboard-link">
              <span className="dashboard-icon"><ion-icon name="log-out"></ion-icon></span>
              <span className="dashboard-label"> Cerrar sesión</span>
            </a>
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
            onClick={toggleUserMenu}
            ref={userMenuRef}
          >
            <img src="../../../public/img/user.png" alt="Usuario" className="user-avatar" />
            {/* Menú desplegable */}
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
                      accept="image/*" 
                      onChange={handleFileChange}
                      className="file-input"
                    />
                  </div>
                  <button className="dashboard-btn dashboard-btn-primary">
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
                    />
                  </div>
                  <button className="dashboard-btn dashboard-btn-primary" onClick={saveName}>
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
                  <div className="input-group password-group">
                    <label htmlFor="actual-password" className="input-label">Contraseña Actual:</label>
                    <div className="password-wrapper">
                      <input 
                        type={passwordVisibility.current ? "text" : "password"} 
                        id="actual-password" 
                        placeholder="Ingrese su contraseña actual"
                        value={passwords.current}
                        onChange={handlePasswordChange}
                        className="password-input"
                      />
                      <span 
                        className="toggle-visibility" 
                        onClick={() => togglePasswordVisibility('current')}
                      >
                        <ion-icon name={passwordVisibility.current ? "eye-off-outline" : "eye-outline"}></ion-icon>
                      </span>
                    </div>
                  </div>
                  <div className="input-group password-group">
                    <label htmlFor="nueva-password" className="input-label">Nueva Contraseña:</label>
                    <div className="password-wrapper">
                      <input 
                        type={passwordVisibility.new ? "text" : "password"} 
                        id="nueva-password" 
                        placeholder="Ingrese su nueva contraseña"
                        value={passwords.new}
                        onChange={handlePasswordChange}
                        className="password-input"
                      />
                      <span 
                        className="toggle-visibility" 
                        onClick={() => togglePasswordVisibility('new')}
                      >
                        <ion-icon name={passwordVisibility.new ? "eye-off-outline" : "eye-outline"}></ion-icon>
                      </span>
                    </div>
                  </div>
                  <div className="input-group password-group">
                    <label htmlFor="confirm-password" className="input-label">Confirmar Contraseña:</label>
                    <div className="password-wrapper">
                      <input 
                        type={passwordVisibility.confirm ? "text" : "password"} 
                        id="confirm-password" 
                        placeholder="Confirme su nueva contraseña"
                        value={passwords.confirm}
                        onChange={handlePasswordChange}
                        className="password-input"
                      />
                      <span 
                        className="toggle-visibility" 
                        onClick={() => togglePasswordVisibility('confirm')}
                      >
                        <ion-icon name={passwordVisibility.confirm ? "eye-off-outline" : "eye-outline"}></ion-icon>
                      </span>
                    </div>
                  </div>
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
                  <button className="dashboard-btn dashboard-btn-primary" onClick={savePassword}>
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
                    <div className="theme-choice">
                      <label htmlFor="theme-light" className="theme-option-label">
                        <input 
                          type="radio" 
                          id="theme-light" 
                          name="theme" 
                          value="light" 
                          checked={selectedTheme === 'light'}
                          onChange={handleThemeChange}
                          className="theme-radio"
                        />
                        <div className="theme-preview light">
                          <ion-icon name="sunny-outline"></ion-icon>
                          <span>Claro</span>
                        </div>
                      </label>
                    </div>
                    <div className="theme-choice">
                      <label htmlFor="theme-dark" className="theme-option-label">
                        <input 
                          type="radio" 
                          id="theme-dark" 
                          name="theme" 
                          value="dark"
                          checked={selectedTheme === 'dark'}
                          onChange={handleThemeChange}
                          className="theme-radio"
                        />
                        <div className="theme-preview dark">
                          <ion-icon name="moon-outline"></ion-icon>
                          <span>Oscuro</span>
                        </div>
                      </label>
                    </div>
                    <div className="theme-choice">
                      <label htmlFor="theme-auto" className="theme-option-label">
                        <input 
                          type="radio" 
                          id="theme-auto" 
                          name="theme" 
                          value="auto"
                          checked={selectedTheme === 'auto'}
                          onChange={handleThemeChange}
                          className="theme-radio"
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
            <div className="config-panel">
              <div className="panel-content">
                <div className="panel-icon">
                  <ion-icon name="notifications-outline"></ion-icon>
                </div>
                <div className="panel-details">
                  <h4 className="panel-title">Gestión de Notificaciones</h4>
                  <p className="panel-desc">Configura cómo quieres recibir tus notificaciones</p>
                  <div className="notification-options">
                    <div className="notification-option">
                      <label className="toggle-switch">
                        <input 
                          type="checkbox" 
                          checked={notifications.email}
                          onChange={() => handleNotificationToggle('email')}
                          className="toggle-checkbox"
                        />
                        <span className="toggle-track"></span>
                        <div className="toggle-label-wrapper">
                          <ion-icon name="mail-outline" className="toggle-icon"></ion-icon>
                          <span className="toggle-text">Correo electrónico</span>
                        </div>
                      </label>
                    </div>
                    <div className="notification-option">
                      <label className="toggle-switch">
                        <input 
                          type="checkbox" 
                          checked={notifications.push}
                          onChange={() => handleNotificationToggle('push')}
                          className="toggle-checkbox"
                        />
                        <span className="toggle-track"></span>
                        <div className="toggle-label-wrapper">
                          <ion-icon name="phone-portrait-outline" className="toggle-icon"></ion-icon>
                          <span className="toggle-text">Notificaciones push</span>
                        </div>
                      </label>
                    </div>
                    <div className="notification-option">
                      <label className="toggle-switch">
                        <input 
                          type="checkbox" 
                          checked={notifications.updates}
                          onChange={() => handleNotificationToggle('updates')}
                          className="toggle-checkbox"
                        />
                        <span className="toggle-track"></span>
                        <div className="toggle-label-wrapper">
                          <ion-icon name="refresh-outline" className="toggle-icon"></ion-icon>
                          <span className="toggle-text">Actualizaciones del sistema</span>
                        </div>
                      </label>
                    </div>
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
    </section>
  );
};

export default Dashboard;