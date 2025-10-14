import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

function MenuDashboard() {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleMouseOver = (index) => {
        setActiveIndex(index);
    };

    return (
        <div className="navdash">
            <ul className='nav-ul'>
                {[
                    { icon: 'paper-plane', title: 'Fast Request' },
                    { to: '/dashboard', icon: 'home', title: 'Inicio' },
                    { to: '/dashboard/hacerPedido', icon: 'create', title: 'Hacer Pedido' },
                    { to: '/dashboard/pedidos', icon: 'receipt', title: 'Pedidos' },
                    { to: '/dashboard/cocina', icon: 'restaurant', title: 'Cocina'},
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
                            <NavLink to={item.to}   end={item.to === '/dashboard'} className='nav-ul-li-a'>
                                <span className="icono"><ion-icon name={item.icon}></ion-icon></span>
                                <span className="nav-titulo">{item.title}</span>
                            </NavLink>
                        ) : (
                            <span className='nav-ul-li-a no-link'>
                                <span className="icono"><ion-icon name={item.icon}></ion-icon></span>
                                <span className="nav-titulo">{item.title}</span>
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MenuDashboard;
