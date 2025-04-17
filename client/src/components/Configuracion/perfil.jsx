import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/configuracion.css';


const UserProfile = () => {
  // State for menu and toggle
  const [navActive, setNavActive] = useState(false);
  const [profileMenuActive, setProfileMenuActive] = useState(false);
  
  // State for user data
  const [userData, setUserData] = useState({
    firstName: 'Luis',
    lastName: 'Angel',
    email: 'luisangel@ejemplo.com',
    phone: '+52 123 456 7890',
    address: 'Calle Ejemplo #123, Ciudad, País',
    dob: '01/01/1990',
    profileImage: 'Pepe.jfif'
  });
  
  // State for edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  
  // Refs
  const profileMenuRef = useRef(null);
  const fileInputRef = useRef(null);
  
  // Initialize form data when editing mode is activated
  useEffect(() => {
    if (isEditing) {
      // Convert DD/MM/YYYY to YYYY-MM-DD for date input
      const dobParts = userData.dob.split('/');
      const formattedDob = dobParts.length === 3 ? 
        `${dobParts[2]}-${dobParts[1]}-${dobParts[0]}` : '';
      
      setEditFormData({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        dob: formattedDob
      });
    }
  }, [isEditing, userData]);
  
  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileMenuActive(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Handle menu item hover
  const handleMenuHover = (e) => {
    const liElements = document.querySelectorAll('.dashboard-menu li');
    liElements.forEach(item => item.classList.remove('active'));
    e.currentTarget.classList.add('active');
  };
  
  // Toggle navigation menu
  const toggleNav = () => {
    setNavActive(!navActive);
  };
  
  // Toggle profile dropdown menu
  const toggleProfileMenu = (e) => {
    e.stopPropagation();
    setProfileMenuActive(!profileMenuActive);
  };
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };
  
  // Save profile changes
  const saveChanges = (e) => {
    e.preventDefault();
    
    // Convert YYYY-MM-DD to DD/MM/YYYY for display
    const dobDate = new Date(editFormData.dob);
    const formattedDob = `${String(dobDate.getDate()).padStart(2, '0')}/${String(dobDate.getMonth() + 1).padStart(2, '0')}/${dobDate.getFullYear()}`;
    
    // Update user data
    setUserData({
      ...userData,
      firstName: editFormData.firstName,
      lastName: editFormData.lastName,
      email: editFormData.email,
      phone: editFormData.phone,
      address: editFormData.address,
      dob: formattedDob
    });
    
    // Exit edit mode
    setIsEditing(false);
    
    // Show notification
    showNotification('Perfil actualizado con éxito', 'success');
  };
  
  // Handle profile picture change
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        showNotification('Por favor, selecciona un archivo de imagen válido', 'error');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserData({
          ...userData,
          profileImage: e.target.result
        });
        showNotification('Foto de perfil actualizada', 'success');
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Show notification
  const showNotification = (message, type) => {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icon = type === 'success' 
        ? '<i class="fas fa-check-circle"></i>' 
        : '<i class="fas fa-exclamation-circle"></i>';
        
    notification.innerHTML = `
        ${icon}
        <span>${message}</span>
    `;
    
    // Añadir al DOM
    document.body.appendChild(notification);
    
    // Mostrar con animación
    setTimeout(() => {
        notification.style.transform = 'translateY(0)';
        notification.style.opacity = '1';
    }, 10);
    
    // Eliminar después de 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateY(100px)';
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
  };
  
  // Handle logout
  const handleLogout = (e) => {
    e.preventDefault();
    
    // Show confirmation dialog
    if (window.confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      window.location.href = "/";
    } else {
      console.log("El usuario decidió no cerrar sesión.");
    }
  };
  
  return (
    <section className="dashboard-section">
      {/* MENU - Actualizado con el nuevo diseño */}
      <div className={`dashboard-nav ${navActive ? 'active' : ''}`}>
        <ul className="dashboard-menu">
          <li onMouseOver={handleMenuHover}>
            <a href="" className="dashboard-link">
              <span className="dashboard-icon">
                <ion-icon name="happy"></ion-icon>
              </span>
              <span className="dashboard-label">Logo</span>
            </a>
          </li>
          <li onMouseOver={handleMenuHover}>
            <a href="/dashboard" className="dashboard-link">
              <span className="dashboard-icon">
                <ion-icon name="home"></ion-icon>
              </span>
              <span className="dashboard-label">Inicio</span>
            </a>
          </li>
          <li onMouseOver={handleMenuHover}>
            <Link to="/perfil" className="dashboard-link">
              <span className="dashboard-icon">
                <ion-icon name="person-circle"></ion-icon>
              </span>
              <span className="dashboard-label">Perfil</span>
            </Link>
          </li>
          <li onMouseOver={handleMenuHover}>
            <Link to="/configuracion" className="dashboard-link">
              <span className="dashboard-icon">
                <ion-icon name="cog"></ion-icon>
              </span>
              <span className="dashboard-label">Configuraciones</span>
            </Link>
          </li>
          <li onMouseOver={handleMenuHover}>
            <Link to="/registro" className="dashboard-link" onClick={handleLogout}>
              <span className="dashboard-icon">
              <ion-icon name="log-out"></ion-icon>
              </span>
              <span className="dashboard-label">Cerrar sesión</span>
            </Link>
          </li>
        </ul>
      </div>
      {/* FIN MENU */}
      
      {/* DASHBOARD CONTAINER - Actualizado con el nuevo diseño */}
      <div className={`dashboard-container ${navActive ? 'active' : ''}`}>
        {/* TOPBAR - Actualizado con el nuevo diseño */}
        <div className="dashboard-topbar">
          <div className="dashboard-toggle" onClick={toggleNav}>
            <ion-icon name="menu"></ion-icon>
          </div>
          <div className="dashboard-search">
            <label className="search-label">
              <input type="text" placeholder="Buscar" className="search-input" />
              <ion-icon name="search" className="search-icon"></ion-icon>
            </label>
          </div>
          <div 
            className={`dashboard-user-profile ${profileMenuActive ? 'active' : ''}`} 
            onClick={toggleProfileMenu}
            ref={profileMenuRef}
          >
            <img src="../../../public/img/user.png" alt="Foto de perfil" className="user-avatar" />
            {/* Menú desplegable */}
            <div className="user-menu">
              <ul className="user-menu-list">
                <li className="user-menu-item">
                  <Link to="/perfil" className="user-menu-link">
                    <span className="user-menu-icon">
                      <ion-icon name="person-circle"></ion-icon>
                    </span>
                    <span className="user-menu-text">Cuenta</span>
                  </Link>
                </li>
                <li className="user-menu-item">
                  <Link to="/configuracion" className="user-menu-link">
                    <span className="user-menu-icon">
                      <ion-icon name="cog"></ion-icon>
                    </span>
                    <span className="user-menu-text">Configuraciones</span>
                  </Link>
                </li>
                  <li className="user-menu-item">
                    <Link to="/" onClick={handleLogout} className="user-menu-link">
                      <span className="user-menu-icon">
                      <ion-icon name="log-out"></ion-icon>
                      </span>
                      <span className="user-menu-text">Cerrar sesión</span>
                    </Link>
                  </li>
              </ul>
            </div>
          </div>
        </div>
        {/* FIN DE LA TOPBAR */}
        
        {/* Contenido del perfil - Mantenemos el mismo diseño pero con ajustes para que coincida con los nuevos estilos */}
        <div className="perfil-container1">
          <div className="perfil-header">
            <div className="perfil-title">
              <h2>Perfil de Usuario</h2>
              <p className="subtitle">Información personal</p>
            </div>
            
            <div className="perfil-foto">
              <div className="foto-container">
                <img src="../../../public/img/user.png" alt="Foto de perfil"/>
                <div className="overlay">
                  <label htmlFor="file-input" className="edit-icon" title="Cambiar foto">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20" fill="currentColor">
                      <path d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"/>
                    </svg>
                  </label>
                </div>
              </div>
              <input 
                type="file" 
                id="file-input" 
                ref={fileInputRef}
                onChange={handleProfilePictureChange}
                accept="image/*"
              />
            </div>
          </div>
          
          <div className="perfil-content">
            {!isEditing ? (
              <div className="perfil-info">
                <div className="info-section">
                  <div className="info-group">
                    <div className="info-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="16" height="16" fill="currentColor">
                        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
                      </svg>
                    </div>
                    <div className="info-text">
                      <label>Nombre</label>
                      <p id="user-first-name">{userData.firstName}</p>
                    </div>
                  </div>
                  
                  <div className="info-group">
                    <div className="info-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width="16" height="16" fill="currentColor">
                        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H392.6c-5.4-9.4-8.6-20.3-8.6-32V352c0-2.1 .1-4.2 .3-6.3c-31-26-71-41.7-114.6-41.7H178.3zM528 240c17.7 0 32 14.3 32 32v48H496V272c0-17.7 14.3-32 32-32zm-80 32v48c-17.7 0-32 14.3-32 32V480c0 17.7 14.3 32 32 32H608c17.7 0 32-14.3 32-32V352c0-17.7-14.3-32-32-32V272c0-44.2-35.8-80-80-80s-80 35.8-80 80z"/>
                      </svg>
                    </div>
                    <div className="info-text">
                      <label>Apellido</label>
                      <p id="user-last-name">{userData.lastName}</p>
                    </div>
                  </div>
                </div>
                
                <div className="info-section">
                  <div className="info-group">
                    <div className="info-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16" height="16" fill="currentColor">
                        <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/>
                      </svg>
                    </div>
                    <div className="info-text">
                      <label>Correo</label>
                      <p id="user-email">{userData.email}</p>
                    </div>
                  </div>
                  
                  <div className="info-group">
                    <div className="info-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16" height="16" fill="currentColor">
                        <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/>
                      </svg>
                    </div>
                    <div className="info-text">
                      <label>Teléfono</label>
                      <p id="user-phone">{userData.phone}</p>
                    </div>
                  </div>
                </div>
                
                <div className="info-section">
                  <div className="info-group">
                    <div className="info-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="16" height="16" fill="currentColor">
                        <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>
                      </svg>
                    </div>
                    <div className="info-text">
                      <label>Dirección</label>
                      <p id="user-address">{userData.address}</p>
                    </div>
                  </div>
                  
                  <div className="info-group">
                    <div className="info-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="16" height="16" fill="currentColor">
                        <path d="M86.4 5.5L61.8 47.6C58 54.1 56 61.6 56 69.2V72c0 22.1 17.9 40 40 40s40-17.9 40-40V69.2c0-7.6-2-15-5.8-21.6L105.6 5.5C103.6 2.1 100 0 96 0s-7.6 2.1-9.6 5.5zm128 0L189.8 47.6c-3.8 6.5-5.8 14-5.8 21.6V72c0 22.1 17.9 40 40 40s40-17.9 40-40V69.2c0-7.6-2-15-5.8-21.6L233.6 5.5C231.6 2.1 228 0 224 0s-7.6 2.1-9.6 5.5zM317.8 47.6c-3.8 6.5-5.8 14-5.8 21.6V72c0 22.1 17.9 40 40 40s40-17.9 40-40V69.2c0-7.6-2-15-5.8-21.6L361.6 5.5C359.6 2.1 356 0 352 0s-7.6 2.1-9.6 5.5L317.8 47.6zM128 176c0-17.7-14.3-32-32-32s-32 14.3-32 32v48c-35.3 0-64 28.7-64 64v64c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V288c0-35.3-28.7-64-64-64V176c0-17.7-14.3-32-32-32s-32 14.3-32 32v48H256V176c0-17.7-14.3-32-32-32s-32 14.3-32 32v48H128V176z"/>
                      </svg>
                    </div>
                    <div className="info-text">
                      <label>Fecha de Nacimiento</label>
                      <p id="user-dob">{userData.dob}</p>
                    </div>
                  </div>
                </div>
                
                <button 
                  id="edit-profile"
                  className="btn-edit"
                  onClick={() => setIsEditing(true)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16" height="16" fill="currentColor" style={{marginRight: '8px'}}>
                    <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/>
                  </svg>
                  Editar Perfil
                </button>
              </div>
            ) : (
              <div className="perfil-editar active">
                <h3>Editar información</h3>
                <form id="edit-form" onSubmit={saveChanges}>
                  <div className="form-group">
                    <label htmlFor="edit-first-name">Nombre</label>
                    <input 
                      type="text" 
                      id="edit-first-name"
                      name="firstName"
                      value={editFormData.firstName || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="edit-last-name">Apellido</label>
                    <input 
                      type="text" 
                      id="edit-last-name"
                      name="lastName"
                      value={editFormData.lastName || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="edit-email">Correo</label>
                    <input 
                      type="email" 
                      id="edit-email"
                      name="email"
                      value={editFormData.email || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="edit-phone">Teléfono</label>
                    <input 
                      type="tel" 
                      id="edit-phone"
                      name="phone"
                      value={editFormData.phone || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="edit-address">Dirección</label>
                    <input 
                      type="text" 
                      id="edit-address"
                      name="address"
                      value={editFormData.address || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="edit-dob">Fecha de Nacimiento</label>
                    <input 
                      type="date" 
                      id="edit-dob"
                      name="dob"
                      value={editFormData.dob || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="actions">
                    <button type="submit" id="save-changes" className="btn-save">
                      <i className="fas fa-save"></i> Guardar
                    </button>
                    <button 
                      type="button" 
                      id="cancel-edit"
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
      </div>
    </section>
  );
};

export default UserProfile;