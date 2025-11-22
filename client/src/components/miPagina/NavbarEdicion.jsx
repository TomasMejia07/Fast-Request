import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const NavbarMiPageEdit = () => {
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <div className="navbar-container">
                
                {/* Boton para regresar despues de editar la pagina */}
                <button className="back-button-style"  onClick={(e) => { e.preventDefault(); navigate("/dashboard") }}><ion-icon name="arrow-back-outline"></ion-icon></button>

                <div className="logo">LOGO</div>
                <div className="menu">
                    <Link to="/miPagina/edit" >Inicio</Link>
                    <Link to="/miPagina/carta/edit" >Carta</Link>
                    <Link to="/miPagina/contacto/edit" >Contáctanos</Link>
                </div>
                <div className="nav-buttons">
                    <button onClick={(e) => { e.preventDefault(); navigate("/miPagina") }}><ion-icon name="cart-outline"></ion-icon></button>
                    <button onClick={(e) => { e.preventDefault(); navigate("/miPagina/Login") }} ><ion-icon name="log-in-outline"></ion-icon></button>
                </div>
            </div>
        </nav>
    )
}


export default NavbarMiPageEdit