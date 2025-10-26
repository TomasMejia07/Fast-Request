import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import useConfiguracionEmpresa from '../../hooks/useConfiguracionEmpresa';

function MenuDashboard() {
    const [activeIndex, setActiveIndex] = useState(null);
    const location = useLocation();

    const handleMouseOver = (index) => {
        setActiveIndex(index);
    };

    const initial = {
        NombreEmpresa: '',
        Imagen_De_Perfil: "http://localhost:5000/uploads/perfiles/user.png",
    }

    const { userData, cargarEmpresa, API_GET } = useConfiguracionEmpresa(initial)

    const { NombreEmpresa } = userData;

    useEffect(() => {

        const handleCompanyDates = () => {
            cargarEmpresa();
        }

        window.addEventListener("companyDatesUpdated", handleCompanyDates);
        return () =>
            window.removeEventListener("companyDatesUpdated", handleCompanyDates);
    }, [cargarEmpresa])


  useEffect(() => {
    const handleProfileUpdate = () => {
      API_GET();
    };

    window.addEventListener("userProfileUpdated", handleProfileUpdate);
    return () =>
      window.removeEventListener("userProfileUpdated", handleProfileUpdate);
  }, [API_GET]);


    return (
        <div className="navdash">
            <ul className='nav-ul'>
                {[
                    { 
                        imageProfile: userData.Imagen_De_Perfil instanceof File
                            ? URL.createObjectURL(userData.Imagen_De_Perfil)
                            : userData.Imagen_De_Perfil || "https://res.cloudinary.com/dp9jbvpwl/image/upload/v1757260230/user_izbzpi.png",
                        title: NombreEmpresa.toUpperCase() 
                    },
                    { to: '/dashboard', icon: 'home', title: 'Inicio' },
                    { to: '/dashboard/hacerPedido', icon: 'create', title: 'Hacer Pedido' },
                    { to: '/dashboard/pedidos', icon: 'receipt', title: 'Pedidos' },
                    { to: '/dashboard/cocina', icon: 'restaurant', title: 'Cocina' },
                    { to: '/dashboard/categoria', icon: 'list', title: 'Categorías' },
                    { to: '/dashboard/productos', icon: 'fast-food', title: 'Productos' },
                    { to: '/dashboard/complementos', icon: 'basket', title: 'Complementos' },
                    { to: '/dashboard/roles', icon: 'id-card', title: 'Roles' },
                    { to: '/dashboard/usuarios', icon: 'people', title: 'Usuarios' },
                    { to: '/dashboard/clientes', icon: 'person', title: 'Clientes' },
                    { to: '/dashboard/estadisticas', icon: 'stats-chart', title: 'Estadísticas' },
                ].map((item, index) => (
                    <li
                        key={index}
                        className={`nav-ul-li ${item.to && location.pathname === item.to ? 'active' : ''}`}
                        onMouseOver={() => handleMouseOver(index)}
                    >
                        {item.to ? (
                            <NavLink to={item.to} end={item.to === '/dashboard'} className='nav-ul-li-a'>
                                <span className="icono"><ion-icon name={item.icon}></ion-icon></span>
                                <span className="nav-titulo">{item.title}</span>
                            </NavLink>
                        ) : (
                            <span className='nav-ul-li-a no-link'>
                                {item.imageProfile ? (
                                    <span className="icono">
                                        <img 
                                            src={item.imageProfile} 
                                            alt="Avatar" 
                                            className="nav-avatar object-cover" 
                                            style={{ width: '50px', height: '50px' }}
                                        />
                                    </span>
                                ) : (
                                    <span className="icono">
                                        <ion-icon name={item.icon}></ion-icon>
                                    </span>
                                )}
                                <span className="nav-titulo-name">{item.title}</span>
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MenuDashboard;
