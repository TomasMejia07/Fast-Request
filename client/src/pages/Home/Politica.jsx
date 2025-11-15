import React from 'react'
import NavbarPage from '../../components/Home/Navbar'
import '../../assets/css/home/privacidad.css'
import { Link } from 'react-router-dom'
import menuHamburguesa from '../../components/Home/Menu_Hamburguer'

const Politica = () => {
    return (
        <>
            <div className="privacidadPage">
                <NavbarPage />
                {menuHamburguesa()}
                <div className="header-privacidadPage">
                    <h1>Política de Privacidad</h1>
                </div>

                <div className="container-privacidadPage">
                    <p>Última actualización: 1/11/25</p>

                    <h2>1. Datos del Responsable</h2>
                    <p>Fast Request, con domicilio en calle 35A  56-78, es responsable del tratamiento de los datos personales que recopilamos a través de nuestro software de pedidos.</p>

                    <h2>2. Uso de Datos Personales</h2>
                    <p>Recopilamos los siguientes datos personales:</p>
                    <ul>
                        <li>Nombre</li>
                        <li>Dirección</li>
                        <li>Correo electrónico</li>
                        <li>Número de teléfono</li>
                        <li>Información de pago</li>
                    </ul>
                    <p>Utilizamos estos datos para:</p>
                    <ul>
                        <li>Procesar y gestionar tus pedidos.</li>
                        <li>Enviar confirmaciones y actualizaciones sobre el estado de tu pedido.</li>
                        <li>Mejorar nuestros servicios y personalizar la experiencia del usuario.</li>
                    </ul>

                    <h2>3. Derechos del Usuario</h2>
                    <p>Tienes derecho a acceder, rectificar, cancelar o oponerte al tratamiento de tus datos personales. Puedes ejercer estos derechos enviando un correo electrónico a Fast@Request.com .</p>

                    <h2>4. Medidas de Seguridad</h2>
                    <p>Implementamos medidas técnicas y organizativas adecuadas para proteger tus datos personales contra el acceso no autorizado, la alteración, divulgación o destrucción.</p>

                    <h2>5. Plazo de Conservación</h2>
                    <p>Conservaremos tus datos personales durante el tiempo necesario para cumplir con los fines para los cuales fueron recopilados, así como para cumplir con nuestras obligaciones legales.</p>

                    <h2>6. Consentimiento</h2>
                    <p>Al utilizar nuestro software, das tu consentimiento para el tratamiento de tus datos personales según lo descrito en esta política.</p>

                    <h2>7. Cambios en la Política</h2>
                    <p>Nos reservamos el derecho a modificar esta política en cualquier momento. Cualquier cambio será publicado en esta página.</p>

                    <h2>8. Contacto</h2>
                    <p>Si tienes preguntas sobre esta política, puedes contactarnos en +57 (300) 6070311.</p>
                </div>

                <footer className='footer-privacidadPage'>
                    <p><Link to="/home/terminos">&copy;  Términos de Servicio</Link></p>
                </footer>
            </div>

        </>
    )
}

export default Politica
