import React from 'react';

function TopBar (){
    return (
        <div className="topbar">
    <div className="toggle">
        <ion-icon className="menu"></ion-icon>
    </div>
    <div className="buscar">
        <label for="">
            <input type="text" placeholder="Buscar" />
            <ion-icon className="search"></ion-icon>
        </label>
    </div>
    <div className="perfil-usuario">
        <img src={`https://unavatar.io/juanjoloq`} alt="Avatar" />
        <div className="menu-perfil">
            <ul>
                <li>
                    <a href="#">
                        <span className="icono-menu-user"><ion-icon name="person-circle"></ion-icon></span>
                        <span className="titulo">Cuenta</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span className="icono-menu-user"><ion-icon name="cog"></ion-icon></span>
                        <span className="titulo">Configuraciones</span>
                    </a>
                </li>
                <li>
                    
                    <a href="#">
                        <span className="icono-menu-user"><ion-icon name="log-out"></ion-icon></span>
                        <span className="titulo">Cerrar sesión</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</div>

    )
}

export default TopBar