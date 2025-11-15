import React, { use } from 'react'
import { useLocation  } from 'react-router-dom';

const Menu_Servicios = () => {

    const location = useLocation();
    const currentHash = location.hash;

    return (
        <>
            <aside className="sidebar-servicesPage">
                <nav>
                    <ul className="sidebar-nav-servicesPage">
                        <li><a href="#introduccion" className={currentHash === '#introduccion' ? 'active' : ''}>introduccion</a></li>
                        <li><a href="#gesPed" className={currentHash === '#gesPed' ? 'active' : ''}>Gestión de Pedidos</a></li>
                        <li><a href="#serNeg" className={currentHash === '#serNeg' ? 'active' : ''}>Servicios para el negocio</a></li>
                        <li><a href="#serCli" className={currentHash === '#serCli' ? 'active' : ''}>Servicios para el cliente</a></li>
                        <li><a href="#serTec" className={currentHash === '#serTec' ? 'active' : ''}>Servicios Técnicos</a></li>
                        <li><a href="#serAdm" className={currentHash === '#serAdm' ? 'active' : ''}>Servicios Administrativos</a></li>
                        <li><a href="#proCli" className={currentHash === '#proCli' ? 'active' : ''}>Productos y Clientes</a></li>
                        <li><a href="#repInd" className={currentHash === '#repInd' ? 'active' : ''}>Reportes e Indicadores</a></li>
                        <li><a href="#sopt" className={currentHash === '#sopt' ? 'active' : ''}>Soporte</a></li>
                        <li><a href="#segPriv" className={currentHash === '#segPriv' ? 'active' : ''}>Seguridad y Privacidad</a></li>
                        <li><a href="#sisEsc" className={currentHash === '#sisEsc' ? 'active' : ''}>Sistema Escalable</a></li>
                    </ul>
                </nav>
            </aside>
        </>
    )
}

export default Menu_Servicios
