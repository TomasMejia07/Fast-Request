import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useConfiguracionPerfilUsuario from '../../hooks/useConfiguracionPerfilUsuario';

function TopBar({ onToggleNav }) {
    const perfilRef = useRef(null);
    const [perfilActive, setPerfilActive] = useState(false);

    const togglePerfil = (e) => {
        e.stopPropagation();
        setPerfilActive(!perfilActive);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (perfilRef.current && !perfilRef.current.contains(e.target)) {
                setPerfilActive(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const initial = {
        Imagen_De_Perfil: "http://localhost:5000/uploads/perfiles/user.png"
    }

    const { userData, API_GET } = useConfiguracionPerfilUsuario(initial)

    useEffect(() => {
        const handleProfileUpdate = () => {
            API_GET(); 
        };

        window.addEventListener('userProfileUpdated', handleProfileUpdate);
        return () => window.removeEventListener('userProfileUpdated', handleProfileUpdate);
    }, [API_GET]);

    return (
        <div className="topbar">
            <div className="toggle" onClick={onToggleNav}>
                <ion-icon name="menu"></ion-icon>
            </div>
            <div className="buscar">
                <label className='label-buscar'>
                    <input type="text" placeholder="Buscar" className='label-input-buscar' />
                    <ion-icon name="search"></ion-icon>
                </label>
            </div>
            <div className={`perfil-usuario ${perfilActive ? 'active' : ''}`} onClick={togglePerfil} ref={perfilRef}>
                <img src={
                    userData.Imagen_De_Perfil
                        ? (userData.Imagen_De_Perfil instanceof File
                            ? URL.createObjectURL(userData.Imagen_De_Perfil)
                            : userData.Imagen_De_Perfil)
                        : "https://res.cloudinary.com/dp9jbvpwl/image/upload/v1757260230/user_izbzpi.png"
                } alt="Avatar" />
                <div className="menu-perfil">
                    <ul className='menu-perfil-ul'>
                        <li className='menu-perfil-ul-li'>
                            <Link to="/dashboard/perfil" className='menu-perfil-ul-li-a'>
                                <span className="icono-menu-user"><ion-icon name="person-circle"></ion-icon></span>
                                <span className="nav-titulo">Perfil</span>
                            </Link>
                        </li>
                        <li className='menu-perfil-ul-li'>
                            <Link to="/dashboard/configuracion" className='menu-perfil-ul-li-a'>
                                <span className="icono-menu-user"><ion-icon name="cog"></ion-icon></span>
                                <span className="nav-titulo">configuracion</span>
                            </Link>
                        </li>
                        <li className='menu-perfil-ul-li'>
                            <a href="#" className='menu-perfil-ul-li-a'>
                                <span className="icono-menu-user"><ion-icon name="log-out"></ion-icon></span>
                                <span className="nav-titulo">Cerrar sesión</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}


export default TopBar;
