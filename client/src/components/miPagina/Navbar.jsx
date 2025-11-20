import React from "react";
import { useNavigate } from "react-router-dom";

const NavbarMiPag = ( ) => {
    const navigate = useNavigate();
    
    return ( 
    <nav className="navbar">
        <div className="navbar-container">
          <div className="logo">LOGO</div>
          <div className="menu">
            <a href="#" onClick={(e) => { e.preventDefault(); navigate("/miPagina")}} >Inicio</a>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate("/miPagina/carta")}} >Carta</a>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate("/miPagina/contacto")}} >Contáctanos</a>
          </div>
          <div className="nav-buttons">
            <button onClick={(e) => { e.preventDefault(); navigate("/miPagina")}}><ion-icon name="cart-outline"></ion-icon></button>
            <button onClick={(e) => { e.preventDefault(); navigate("/miPagina/Login")}} ><ion-icon name="log-in-outline"></ion-icon></button>
          </div>
        </div>
      </nav>
    )
}


export default NavbarMiPag