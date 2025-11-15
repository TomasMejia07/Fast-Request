import React from 'react'
import NavbarPage from '../../components/Home/Navbar'
import '../../assets/css/home/terminos.css'
import { Link } from 'react-router-dom'
import menuHamburguesa from '../../components/Home/Menu_Hamburguer'


const Terminos = () => {
    return (
        <>
            <div className='terminosPage'>
                <NavbarPage />
                {menuHamburguesa()}
                <div className="header-terminosPage">
                    <h1>Términos de Servicio</h1>
                </div>

                <div className="container-terminosPage">
                    <p>Última actualización: 1/11/25</p>

                    <h2>1. Identificación de las Partes</h2>
                    <p>Estos términos constituyen un acuerdo entre Fast Request y el usuario sobre  el software de pedidos.</p>

                    <h2>2. Descripción del Servicio</h2>
                    <p>La Empresa ofrece un software para realizar pedidos, que permite a los usuarios seleccionar productos, realizar pagos y gestionar sus pedidos.</p>

                    <h2>3. Políticas de Pago</h2>
                    <p>Los pagos se pueden realizar mediante tarjeta de crédito, débito o billeteras. El Usuario se compromete a proporcionar información precisa y actualizada sobre su método de pago.</p>

                    <h2>4. Condiciones de Uso</h2>
                    <p>El Usuario se compromete a utilizar el servicio únicamente para fines legales y no deberá realizar actividades que puedan dañar la reputación o funcionalidad del software.</p>

                    <h2>5. Limitaciones de Responsabilidad</h2>
                    <p>La Empresa no será responsable por daños indirectos, incidentales o consecuentes que surjan del uso del software o la imposibilidad de utilizarlo.</p>

                    <h2>6. Política de Cancelación</h2>
                    <p>El Usuario puede cancelar su pedido dentro de las 2 horas posteriores a la realización del mismo. Para cancelar un pedido, debe enviar un correo electrónico a Fast@Request.com .</p>

                    <h2>7. Modificaciones a los Términos</h2>
                    <p>Nuestra Empresa se reserva el derecho a modificar estos términos en cualquier momento. Cualquier cambio será publicado aquí.</p>

                    <h2>8. Contacto</h2>
                    <p>Cualquier pregunta sobre estos términos puede ser dirigida a +57 (300) 6070311.</p>

                </div>

                <footer className='footer-terminosPage'>
                    <p><Link to="/home/politica">&copy; Política de Privacidad</Link></p>
                </footer>
            </div>
        </>
    )
}

export default Terminos
