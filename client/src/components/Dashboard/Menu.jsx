import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function MenuDashboard() {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleMouseOver = (index) => {
        setActiveIndex(index);
    };

    return (
        <div className="navdash">
            <ul className='nav-ul'>
                {[
                    { to: '#', icon: 'paper-plane', title: 'Logo' },
                    { to: '/dashboard', icon: 'home', title: 'Inicio' },
                    { to: '/dashboard/hacerPedido', icon: 'create', title: 'Hacer Pedido' },
                    { to: '/dashboard/pedidos', icon: 'clipboard', title: 'Pedidos' },
                    { to: '/dashboard/categoria', icon: 'list', title: 'Categorías' },
                    { to: '/dashboard/productos', icon: 'fast-food', title: 'Productos' },
                    { to: '/dashboard/roles', icon: 'id-card', title: 'Roles' },
                    { to: '/dashboard/usuarios', icon: 'people', title: 'Usuarios' },
                    { to: '/dashboard/clientes', icon: 'person', title: 'Clientes' },
                    { to: '/dashboard/estadisticas', icon: 'stats-chart', title: 'Estadísticas' },
                ].map((item, index) => (
                    <li
                        key={index}
                        className={`nav-ul-li ${activeIndex === index ? 'active' : ''}`}
                        onMouseOver={() => handleMouseOver(index)}
                    >
                        <Link to={item.to} className='nav-ul-li-a'>
                            <span className="icono"><ion-icon name={item.icon}></ion-icon></span>
                            <span className="nav-titulo">{item.title}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MenuDashboard;
