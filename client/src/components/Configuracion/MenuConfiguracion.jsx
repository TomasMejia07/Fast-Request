import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../../assets/css/dashboard.css';
import useConfiguracionEmpresa from '../../hooks/useConfiguracionEmpresa';

function MenuConfiguracion() {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleMouseOver = (index) => {
        setActiveIndex(index);
    };

    const initial = {
        NombreEmpresa: ''
    }

    const { userData, cargarEmpresa } = useConfiguracionEmpresa(initial)

    const { NombreEmpresa } = userData;

    useEffect(() => {

        const handleCompanyDates = () => {
            cargarEmpresa();
        }

        window.addEventListener("companyDatesUpdated", handleCompanyDates);
        return () =>
            window.removeEventListener("companyDatesUpdated", handleCompanyDates);
    }, [cargarEmpresa])


    return (
        <div className="navdash">
            <ul className='nav-ul'>
                {[
                    { icon: 'paper-plane', title: NombreEmpresa.toUpperCase() },
                    { to: '/dashboard', icon: 'home', title: 'Inicio' },
                    { to: '/dashboard/perfil', icon: 'person-circle', title: 'Perfil' },
                    { to: '/dashboard/configuracion', icon: 'cog', title: 'Configuración' },
                    { to: '/dashboard/empresa', icon: 'business', title: 'Empresa' }
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
                                <span className="icono"><ion-icon name={item.icon}></ion-icon></span>
                                <span className="nav-titulo-name">{item.title}</span>
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MenuConfiguracion;
