import React from 'react'
import NavbarPage from '../../components/Home/Navbar'
import FooterPage from '../../components/Home/Footer'
import '../../assets/css/home/contactanos.css'
import { useAos } from '../../hooks/useAos'
import menuHamburguesa from '../../components/Home/Menu_Hamburguer'

const Contactanos = () => {
    useAos()
    return (
        <>
            <div className='contactPage'>
                <NavbarPage />
                {menuHamburguesa()}
                <button className="btn-menu" type="button">
                    <i className="fa-solid fa-bars"></i>
                </button>

                <main>
                    <div className="container-contactPage">
                        <div className="information_txt-contactPage">
                            <h1>¿Necesitas ayuda?  <br /> <span>¡Habla con nuestros expertos al instante!</span></h1>
                            <div className="img-contactPage" data-aos="zoom-in" data-aos-easing="linear" data-aos-duration="1000" data-aos-mirror="true">
                                <img className="img-1-contactPage" src="/img/ayuda.png" alt="" />
                            </div>
                        </div>
                        <form id="formAction" className='form-contactPage' data-aos="fade-left" data-aos-duration="1500">
                            <h2>¡Contáctanos ahora mismo!</h2>

                            <div className="form-group-contactPage">
                                <label htmlFor="name">Nombre del Negocio</label>
                                <input type="text" name="name" className='input-contactPage' id="name" required />
                            </div>

                            <div className="form-group-contactPage">
                                <label htmlFor="email">E-mail de contacto</label>
                                <input type="email" name="email" className='input-contactPage' id="email" required />
                            </div>

                            <div className="form-group-contactPage">
                                <label htmlFor="tel" className='label-contactPage'>Informanos como podemos ayudarte!</label>
                                <textarea name="message" id="message" className='textarea-contactPage' minLength="30" maxLength="500" rows="4" placeholder="escribenos un mensaje..." required></textarea>
                            </div>

                            <button className="enviar-contactPage" id="enviar" type="submit">Enviar</button>
                        </form>
                    </div>
                </main>
                <FooterPage />
            </div>
        </>
    )
}

export default Contactanos
