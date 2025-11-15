import React from 'react';
import { Link } from 'react-router-dom'
import '../../assets/css/home/Components/menu.css'
import { useMenu } from '../../hooks/useMenu';

const Menu_Hamburguer = () => {

    const { isMobileMin, toggleMenu, isMenuOpen } = useMenu(620);

    if(!isMobileMin) return null
        
    return (
        <>
            <div className='menuHamburguesaPage'>

                <button className="menu-toggle-x" onClick={toggleMenu}>
                    <ion-icon name="menu-outline" className="menu-outline"></ion-icon>
                </button>



                <nav className={`sidebar-x ${isMenuOpen ? "active" : ""}`}>

                    <div className="menu-header-x">
                        <h2>Fast Request</h2>

                        <button className="menu-close" onClick={toggleMenu}>
                            <ion-icon name="close-outline" className="menu-close-icon"></ion-icon>
                        </button>
                    </div>


                    <div className="highlighted-section-x">
                        <Link to="#" className="highlighted-button login-btn-x">
                            <ion-icon name="log-in-outline" className="login-icon"></ion-icon> Iniciar Sesión
                        </Link>
                        <Link to="#" className="highlighted-button register-btn-x">
                            <ion-icon name="person-add-outline" className="register-icon"></ion-icon> Registrarse
                        </Link>
                    </div>


                    <div className="menu-content-x">

                        <ul className="menu-xx">

                            <li className="menu-item-xx">
                                <Link to="/home" className="menu-link-x ">
                                    <ion-icon name="home-outline" className='menu-icon-x'></ion-icon> Inicio
                                </Link>
                            </li>

                            <li className="menu-item-xx">
                                <Link to="/home/servicios" className="menu-link-x">
                                    <ion-icon name="construct-outline" className='menu-icon-x'></ion-icon> Servicios
                                </Link>
                            </li>

                            <li className="menu-item-xx">
                                <Link to="/home/nosotros" className="menu-link-x">
                                    <ion-icon name="people-circle-outline" className='menu-icon-x'></ion-icon> Nosotros
                                </Link>
                            </li>

                            <li className="menu-item-xx">
                                <Link to="/home/contactanos" className="menu-link-x">
                                    <ion-icon name="call-outline" className='menu-icon-x'></ion-icon> Contáctanos
                                </Link>
                            </li>
                        </ul>


                        <div className="menu-footer-x">
                            <div className="legal-links-x">
                                <Link to="/home/terminos" className="legal-link-x">
                                    <ion-icon name="document-text-outline" className='icons-legal'></ion-icon>
                                </Link>

                                <Link to="/home/politica" className="legal-link-x">
                                    <ion-icon name="shield-checkmark-outline" className='icons-legal' ></ion-icon> 
                                </Link>

                            </div>

                            <div className="copyright">
                                © 2025 Fast Request. Todos los derechos reservados.
                            </div>
                        </div>

                    </div>
                </nav>
            </div>
        </>
    );
};

export default Menu_Hamburguer;
