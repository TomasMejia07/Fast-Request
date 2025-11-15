import React from 'react'
import NavbarPage from '../../components/Home/Navbar'
import FooterPage from '../../components/Home/Footer'
import '../../assets/css/home/vermas.css'
import { useWhatsApp } from '../../hooks/useWhatsApp'
import menuHamburguesa from '../../components/Home/Menu_Hamburguer'


const VerMas = () => {

    const { contactWhatsApp } = useWhatsApp();

    return (
        <>
            <div className='vermasPage'>
                <NavbarPage />
                {menuHamburguesa()}
                <section className="ventajas-vermasPage">
                    <h2>¿Por qué elegirnos?</h2>
                    <div className="ventajas-grid-vermasPage">
                        <div className="ventaja-vermasPage">✔️ Optimización en tiempo real</div>
                        <div className="ventaja-vermasPage">✔️ Integración con múltiples plataformas</div>
                        <div className="ventaja-vermasPage">✔️ Reportes detallados y análisis exacto</div>
                        <div className="ventaja-vermasPage">✔️ Soporte técnico experimentado</div>
                        <div className="ventaja-vermasPage">✔️ Seguridad avanzada y protección de datos</div>
                        <div className="ventaja-vermasPage">✔️ Interfaz intuitiva y fácil de usar</div>
                        <div className="ventaja-vermasPage">✔️ Automatización de procesos clave</div>
                        <div className="ventaja-vermasPage">✔️ Personalización según las necesidades del negocio</div>
                        <div className="ventaja-vermasPage">✔️ Escalabilidad para grandes volúmenes de pedidos</div>
                    </div>
                </section>

                <section className="cta-vermasPage">
                    <h2>Descubre cómo funciona nuestro software</h2>
                    <p>Conoce de primera mano cómo optimizamos la gestión de pedidos y mejoramos tu negocio.</p>

                    <div className="video-container-vermasPage">
                        <iframe width="560" height="315" src="" frameBorder="0" allowFullScreen></iframe>
                    </div>

                    <button className="btn-x-vermasPage" onClick={contactWhatsApp}>Comunicate Ahora!</button>
                </section>
                <FooterPage />
            </div>
        </>
    )
}

export default VerMas
