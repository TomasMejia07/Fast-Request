import React from "react";
import { useNavigate } from "react-router-dom";
import { Link, useParams  } from "react-router-dom";

const NavbarMiPag = ( ) => {
    const navigate = useNavigate();
    const { empresaSlug } = useParams()
    
    return ( 
    <nav className="navbar">
        <div className="navbar-container">
          <div className="logo">LOGO</div>
          <div className="menu">
            <Link to={`/miPagina/${empresaSlug}`} >Inicio</Link>
            <Link to={`/miPagina/${empresaSlug}/carta`} >Carta</Link>
            <Link to={`/miPagina/${empresaSlug}/contacto`} >Contáctanos</Link>
          </div>
          <div className="nav-buttons">
            <button onClick={(e) => { e.preventDefault(); navigate(`/miPagina/${empresaSlug}`)}}><ion-icon name="cart-outline"></ion-icon></button>
            <button onClick={(e) => { e.preventDefault(); navigate(`/miPagina/${empresaSlug}/Login`)}} ><ion-icon name="log-in-outline"></ion-icon></button>
          </div>
        </div>
      </nav>
    )
}


export default NavbarMiPag