import React from 'react'
import { Link } from 'react-router-dom'
import '../../assets/css/home/Components/navbar.css'
import { useNavbar } from '../../hooks/useNavbar'

const Navbar = ({ extraClass }) => {
    const { scrollActive } = useNavbar();

    return (
        <>
            <header className={`navbar-homePage  ${extraClass ? extraClass : ''} ${scrollActive ? 'active-scroll' : ''}`}>
                <div className="container-menu-homePage">
                    <div className="logo-homePage">
                        <img src="/img/logo.png"  className='logo-navbarHome-homePage' alt="logo" />
                    </div>

                    <div className="menu-homePage">
                        <nav id="nav" className=''>
                            <ul id="menu-act" className="menu-act">
                                <li className='li-navbarHome-homePage'><Link to="/home" className='link-a-navbarHome-homePage'>Inicio</Link></li>
                                <li className='li-navbarHome-homePage'><Link to="/home/servicios" className='link-a-navbarHome-homePage'>Servicios</Link></li>
                                <li className='li-navbarHome-homePage'><Link to="/home/nosotros" className='link-a-navbarHome-homePage'>Nosotros</Link></li>
                                <li className='li-navbarHome-homePage'><Link to="/home/contactanos" className='link-a-navbarHome-homePage'>Contactanos</Link></li>
                            </ul>
                        </nav>

                        <Link to="#" className="btn-homePage">
                            Ingresar
                        </Link>
                        
                        <Link to="#" className="btn-homePage">
                            Registrarse
                        </Link>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Navbar
