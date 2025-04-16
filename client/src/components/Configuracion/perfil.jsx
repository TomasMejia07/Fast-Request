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
    const liElements = document.querySelectorAll('.nav li');
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
      window.location.href = "CerrarSesion.html";
    } else {
      console.log("El usuario decidió no cerrar sesión.");
    }
  };
  
  return (
    <section>
      {/* MENU */}
      <div className={`nav ${navActive ? 'active' : ''}`}>
        <ul>
          <li onMouseOver={handleMenuHover}>
            <a href="">
              <span className="icono">
                <ion-icon name="happy"></ion-icon>
              </span>
              <span className="titulo">Logo</span>
            </a>
          </li>
          <li onMouseOver={handleMenuHover}>
            <a href="index.html">
              <span className="icono">
                <ion-icon name="home"></ion-icon>
              </span>
              <span className="titulo">Inicio</span>
            </a>
          </li>
          <li onMouseOver={handleMenuHover}>
            <Link to="/perfil">
                <span className="icono">
                    <ion-icon name="person-circle"></ion-icon>
                </span>
                <span className="titulo">Perfil</span>
            </Link>
        </li>
          <li onMouseOver={handleMenuHover}>
            <Link to="/configuracion">
                <span className="icono">
                    <ion-icon name="cog"></ion-icon>
                </span>
                <span className="titulo">Configuraciones</span>
            </Link>
            </li>
          <li onMouseOver={handleMenuHover}>
            <a href="#" id="logout-link" onClick={handleLogout}>
              <span className="icono">
                <ion-icon name="log-out"></ion-icon>
              </span>
              <span className="titulo">Cerrar sesion</span>
            </a>
          </li>
        </ul>
      </div>
      {/* FIN MENU */}
      
      {/* DASHBOARD */}
      <div className={`container ${navActive ? 'active' : ''}`}>
        {/* BARRA SUPERIOR (TOPBAR) */}
        <div className="topbar">
          <div className="toggle" onClick={toggleNav}>
            <ion-icon name="menu"></ion-icon>
          </div>
          <div className="buscar">
            <label>
              <input type="text" placeholder="Buscar" />
              <ion-icon name="search"></ion-icon>
            </label>
          </div>
          <div 
            className={`perfil-usuario ${profileMenuActive ? 'active' : ''}`} 
            onClick={toggleProfileMenu}
            ref={profileMenuRef}
          >
            <img src={userData.profileImage} alt="Foto de perfil" />
            {/* Menú desplegable */}
            <div className="menu-perfil">
              <ul>
              <li>
                <Link to="/perfil">
                    <span className="icono-menu-user">
                        <ion-icon name="person-circle"></ion-icon>
                    </span>
                    <span className="titulo">Cuenta</span>
                </Link>
            </li>
            <li>
                <Link to="/configuracion">
                    <span className="icono-menu-user">
                        <ion-icon name="cog"></ion-icon>
                    </span>
                    <span className="titulo">Configuraciones</span>
                </Link>
            </li>
                <li>
                  <a href="#" onClick={handleLogout}>
                    <span className="icono-menu-user">
                      <ion-icon name="log-out"></ion-icon>
                    </span>
                    <span className="titulo">Cerrar sesión</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* FIN DE LA TOPBAR */}
        
        <div className="perfil-container1">
          <div className="perfil-header">
            <div className="perfil-title">
              <h2>Perfil de Usuario</h2>
              <p className="subtitle">Información personal</p>
            </div>
            
            <div className="perfil-foto">
              <div className="foto-container">
                <img 
                  id="profile-picture" 
                  src={userData.profileImage} 
                  alt="Foto de Perfil"
                />
                <div className="overlay">
                  <label htmlFor="file-input" className="edit-icon" title="Cambiar foto">
                    <i className="fas fa-camera"></i>
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
                    <div className="info-icon"><i className="fas fa-user"></i></div>
                    <div className="info-text">
                      <label>Nombre</label>
                      <p id="user-first-name">{userData.firstName}</p>
                    </div>
                  </div>
                  
                  <div className="info-group">
                    <div className="info-icon"><i className="fas fa-user-tag"></i></div>
                    <div className="info-text">
                      <label>Apellido</label>
                      <p id="user-last-name">{userData.lastName}</p>
                    </div>
                  </div>
                </div>
                
                <div className="info-section">
                  <div className="info-group">
                    <div className="info-icon"><i className="fas fa-envelope"></i></div>
                    <div className="info-text">
                      <label>Correo</label>
                      <p id="user-email">{userData.email}</p>
                    </div>
                  </div>
                  
                  <div className="info-group">
                    <div className="info-icon"><i className="fas fa-phone"></i></div>
                    <div className="info-text">
                      <label>Teléfono</label>
                      <p id="user-phone">{userData.phone}</p>
                    </div>
                  </div>
                </div>
                
                <div className="info-section">
                  <div className="info-group">
                    <div className="info-icon"><i className="fas fa-map-marker-alt"></i></div>
                    <div className="info-text">
                      <label>Dirección</label>
                      <p id="user-address">{userData.address}</p>
                    </div>
                  </div>
                  
                  <div className="info-group">
                    <div className="info-icon"><i className="fas fa-birthday-cake"></i></div>
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
                  <i className="fas fa-pen"></i> Editar Perfil
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