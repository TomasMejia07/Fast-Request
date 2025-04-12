import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/dashboard.css';


function MenuDashboard (){
    return (
        <div className="nav">
    <ul>
        <li>
            <a href="#">
                <span className="icono"><ion-icon name="logo-playstation"></ion-icon></span>
                <span className="titulo">Logo</span>
            </a>
        </li>
        <li>
            <Link to="/dashboard" className="Inicio">
                <span className="icono"><ion-icon name="home"></ion-icon></span>
                <span className="titulo">Inicio</span>
            </Link>
        </li>
        <li>
            <a href="/hacerPedido">
                <span className="icono"><ion-icon name="create"></ion-icon></span>
                <span className="titulo">Hacer Pedido</span>
            </a>
        </li>
        <li>
            <a href="/pedidos">
                <span className="icono"><ion-icon name="clipboard"></ion-icon></span>
                <span className="titulo">Pedidos</span>
            </a>
        </li>
        <li>
            <a href="/categoria">
                <span className="icono"><ion-icon name="list"></ion-icon></span>
                <span className="titulo">Categoría</span>
            </a>
        </li>
        <li>
            <a href="/productos">
                <span className="icono"><ion-icon name="fast-food"></ion-icon></span>
                <span className="titulo">Productos</span>
            </a>
        </li>
        <li>
            <a href="/rol">
                <span className="icono"><ion-icon name="id-card"></ion-icon></span>
                <span className="titulo">Roles</span>
            </a>
        </li>
        <li>
            <a href="/usuarios">
                <span className="icono"><ion-icon name="people"></ion-icon></span>
                <span className="titulo">Usuarios</span>
            </a>
        </li>
        <li>
            <a href="/estadisticas">
                <span className="icono"><ion-icon name="stats-chart"></ion-icon></span>
                <span className="titulo">Estadisticas</span>
            </a>
        </li>
    </ul>
</div>
    )
}

export default MenuDashboard