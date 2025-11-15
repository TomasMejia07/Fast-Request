
import React from 'react'
import { Link } from 'react-router-dom'
import '../../assets/css/home/Components/footer.css'

const Footer = () => {
    
    return (
        <footer className="footer-homePage">
            <div className="footer-container-homePage">
                <div className="footer-section-homePage">
                    <h4 className='title-footer-homePage'>Sobre Fast</h4>
                    <Link to="/home/servicios" className='a-link-footer-homePage'>Servicios</Link>
                    <Link to="/home/nosotros" className='a-link-footer-homePage'>Nosotros</Link>
                </div>
                <div className="footer-section-homePage">
                    <h4 className='title-footer-homePage'>Contacto</h4>
                    <p className='prr-footer-homePage'>Teléfono: +57 (322) 6070311</p>
                    <p className='prr-footer-homePage'>Lunes a sábados de 07:00 a.m. a 11:00 p.m.</p>
                    <p className='prr-footer-homePage'>Domingos de 08:00 a.m. a 10:00 p.m.</p>
                </div>
                <div className="footer-section-homePage">
                    <h4 className='title-footer-homePage'>Información</h4>
                    <p className='prr-footer-homePage'><Link to="/home/politica" className='a-link-footer-homePage'>Política de Privacidad</Link></p>
                    <p className='prr-footer-homePage'><Link to="/home/terminos" className='a-link-footer-homePage'>Términos de Servicio</Link></p>
                </div>
            </div>
            <div className="footer-bottom-homePage">
                <p className='bottom-footer-homePage'>&copy; 2025 Fast Request. Todos los derechos reservados.</p>
            </div>
        </footer>
    )
}

export default Footer
