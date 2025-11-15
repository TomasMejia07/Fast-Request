import React, { useEffect } from 'react'
import NavbarPage from '../../components/Home/Navbar'
import FooterPage from '../../components/Home/Footer'
import { Link } from 'react-router-dom'
import { useWhatsApp } from '../../hooks/useWhatsApp'
import '../../assets/css/home/homePage.css'
import { useAos } from '../../hooks/useAos'
import menuHamburguesa from '../../components/Home/Menu_Hamburguer'

const HomePage = () => {

    const { contactWhatsApp } = useWhatsApp()

    useAos()

    return (
        <>
            <div className='HomePage'>
                <NavbarPage />
                {menuHamburguesa()}
                <div className="fondo-homePage">
                    <div className="desaing-homePage">
                    </div>
                </div>

                <main className="main-homePage">
                    <div className="container-cover-homePage">
                        <div className="cover-homePage">
                            <div className="text-homePage">
                                <h1 className='title-homePage'>Transforma y Optimiza la Gestión de tus Pedidos.</h1>

                                <p className='parrafo-homePage'>Simplificamos y optimizamos la gestión de pedidos con soluciones eficientes que mejoran el control, la organización y potencian el crecimiento empresarial.</p>
                                <div className="linea1-homePage"></div>
                                <Link to="/home/verMas" className='verMas-homePage'>
                                    Ver Mas!
                                </Link>
                                <div className="linea2-homePage"></div>
                            </div>

                            <div className="svg-homePage" data-aos="fade-left" data-aos-duration="2000" data-aos-mirror="true">
                                <img src="/img/image.png" className='first-img-homePage' alt="" />
                            </div>
                        </div>
                    </div>
                </main>


                <section className='section-homePage'>
                    <div className="container-information-homePage">
                        <div className="information-homePage">
                            <img className="img-i-homePage" src="/img/prueba.png" alt="" data-aos="fade-right" data-aos-duration="2000" data-aos-mirror="true" />
                            <div className="text-content-homePage">

                                <h2 className='title-section-homePage'>Ventas Online</h2>
                                <img className="camino-homePage" src="/img/camino.png" alt="" />
                                <h1 className='title-principal-section-homePage'>impulsa tu empresa y<br /> <span className='separador-homePage'>simplifica tus costos</span></h1>

                                <p className='txt-parr-homePage'>Administra tu empresa de manera eficiente a través de nuestros software.</p>

                                <nav className='list-nav-homePage'>
                                    <ul className='ul-list-homePage'>
                                        <li className='li-list-homePage'><span className='like-list-homePage'>✔</span> Administra tus pedidos desde un solo lugar de manera sencilla.</li>
                                        <li className='li-list-homePage'><span className='like-list-homePage'>✔</span> Ofrece una experiencia óptima y sin complicaciones a tus clientes.</li>
                                        <li className='li-list-homePage'><span className='like-list-homePage'>✔</span> Accede a análisis detallados de todas tus ventas para tomar decisiones informadas.</li>
                                        <li className='li-list-homePage'><span className='like-list-homePage'>✔</span> Disfruta de una solución personalizada que se adapta a tu negocio.</li>
                                    </ul>
                                </nav>

                                <img className="arrow-homePage" src="/img/arrow.png" alt="" />

                                <button type="button" className='btn-content-homePage' onClick={contactWhatsApp}>Comunicate Ahora!</button>

                            </div>
                        </div>
                    </div>
                </section>


                <section className="content-homePage">
                    <img className="linea-homePage" src="/img/linea.png" alt="" />
                    <div className="container-informacion-homePage">
                        <div className="card-homePage">
                            <ion-icon name="analytics-outline" className="icon-homePage"></ion-icon>
                            <h2 className='title-card-homePage'>Impulsa</h2>
                            <p className='parr-card-homePage'>Administra, organiza, impulsa y potencia la gestión de tus pedidos.</p>
                        </div>

                        <div className="card-homePage">
                            <ion-icon name="sync-outline" className="icon-homePage"></ion-icon>
                            <h2 className='title-card-homePage'>Transforma</h2>
                            <p className='parr-card-homePage'>Convierte tu sistema de pedidos en un proceso ágil y eficiente.</p>
                        </div>

                        <div className="card-homePage">
                            <ion-icon name="construct-outline" className="icon-homePage"></ion-icon>
                            <h2 className='title-card-homePage'>Optimiza</h2>
                            <p className='parr-card-homePage'>Mejora la eficiencia de tu negocio con procesos automatizados.</p>
                        </div>
                    </div>
                </section>


                <section className="funciones-homePage">
                    <div className="funciones-content-homePage">
                        <div className="funciones-text-homePage">
                            <h2 className='title2-funciones-homePage'>¿Qué puedo <br /> <span className='span2-funciones-homePage'>Hacer con Fast Request</span>?</h2>
                            <p className='parr-funciones-homePage'>Un software simple pero potente, <br /> Conoce todo lo que tenemos para ofrecerte.</p>
                        </div>

                        <div className="funciones-list-homePage">
                            <h1 className='title1-funciones-homePage'>Algunas de nuestras Funcionalidades:</h1>
                            <nav className='navv-funciones-homePage'>
                                <ul className='ulll-funciones-homePage'>
                                    <li className='liii-funciones-homePage'><span className='spannn1-funciones-homePage'>✔</span> Aumenta la eficiencia operativa con procesos automatizados.</li>
                                    <li className='liii-funciones-homePage'><span className='spannn1-funciones-homePage'>✔</span> Facilita la colaboración entre equipos para alcanzar objetivos comunes.</li>
                                    <li className='liii-funciones-homePage'><span className='spannn1-funciones-homePage'>✔</span> Reduce el tiempo de respuesta y mejora la satisfacción del cliente.</li>
                                    <li className='liii-funciones-homePage'><span className='spannn1-funciones-homePage'>✔</span> Fomenta la innovación con cada análisis.</li>
                                    <li className='liii-funciones-homePage'><span className='spannn1-funciones-homePage'>✔</span> Simplifica la toma de decisiones con datos claros y accesibles.</li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </section>


                <section className="content-txt-homePage">
                    <div className="container-txt-homePage">
                        <div className="txt-container-homePage">
                            <h2 className='title-contentTxt-homePage'>Administra tu empresa, <br /> <span className='span-contentTxt-homePage'>a través de nuestros software de pedidos.</span></h2>
                            <p className='parr-contentTxt-homePage'>Administra, organiza, impulsa y potencia la gestion de tus pedidos.</p>
                        </div>
                        <div className="img-homePage-content" data-aos="fade-left" data-aos-duration="2000" data-aos-mirror="true">
                            <img src="/img/planos.png" className='img-contentTxt-homePage' alt="" />
                        </div>
                    </div>
                </section>


                <img className="line-homePage" src="/img/linea.png" alt="" />
                <section className="testimonios-homePage">

                    <h2 className='title-testimonios-homePage'>Lo que Dicen Nuestros Clientes</h2>
                    <div className="container-testimonios-homePage">
                        <div className="testimonio-homePage" data-aos="fade-right" data-aos-duration="2000" data-aos-mirror="true">
                            <p className='parr-testimonios-homePage'>"Este software ha optimizado nuestra gestión de pedidos de una forma increíble. ¡Altamente recomendado!"</p>
                            <h4 className='author-testimonios-homePage'>- Juan Pérez, CEO de TechCorp</h4>
                        </div>
                        <div className="testimonio-homePage" data-aos="fade-left" data-aos-duration="2000" data-aos-mirror="true">
                            <p className='parr-testimonios-homePage'>"Desde que implementamos este sistema, nuestras ventas han aumentado significativamente."</p>
                            <h4 className='author-testimonios-homePage'> - Ana García, Fundadora de HealthyFoods</h4>
                        </div>
                    </div>
                </section>

                <FooterPage />
            </div>
        </>
    )
}

export default HomePage
