import React, { useEffect, useRef, useState } from 'react';

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
                <img src={`https://unavatar.io/juanjoloq`} alt="Avatar" />
                <div className="menu-perfil">
                    <ul className='menu-perfil-ul'>
                        <li className='menu-perfil-ul-li'>
                            <a href="#" className='menu-perfil-ul-li-a'>
                                <span className="icono-menu-user"><ion-icon name="person-circle"></ion-icon></span>
                                <span className="nav-titulo">Cuenta</span>
                            </a>
                        </li>
                        <li className='menu-perfil-ul-li'>
                            <a href="#" className='menu-perfil-ul-li-a'>
                                <span className="icono-menu-user"><ion-icon name="cog"></ion-icon></span>
                                <span className="nav-titulo">Configuraciones</span>
                            </a>
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
