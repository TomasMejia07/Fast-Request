import React from 'react'
import NavbarPage from '../../components/Home/Navbar'
import FooterPage from '../../components/Home/Footer'
import '../../assets/css/home/nosotros.css'
import { useAos } from '../../hooks/useAos'
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import menuHamburguesa from '../../components/Home/Menu_Hamburguer'


const Nosotros = () => {

    const [ref1, inView1] = useInView({ triggerOnce: true });
    const [ref2, inView2] = useInView({ triggerOnce: true });
    const [ref3, inView3] = useInView({ triggerOnce: true });
    const [ref4, inView4] = useInView({ triggerOnce: true });

    useAos()

    return (
        <>
            <div className='aboutPage'>
                <NavbarPage />
                {menuHamburguesa()}
                <section className="hero-section">
                    <h1>Bienvenidos a Fast Request</h1>
                    <p>Transformando la manera en que gestionas tus pedidos con tecnología innovadora y soluciones eficientes</p>
                </section>

                <div className="about-container">
                    <section className="mission-section" data-aos="fade-left" data-aos-duration="2000" data-aos-mirror="true">
                        <h2 className="section-title-about">Nuestra Misión</h2>
                        <p>En Fast Request, nos dedicamos a simplificar y optimizar el proceso de gestión de pedidos para empresas de todos los tamaños. Nuestra plataforma combina facilidad de uso con tecnología avanzada para ofrecer la mejor experiencia.</p>
                    </section>

                    <section className="features-section">
                        <h2 className="section-title-about">¿Por qué elegirnos?</h2>
                        <div className="features-grid">
                            <div className="feature-card" data-aos="fade-down" data-aos-duration="2000" data-aos-mirror="true">
                                <div className="feature-icon">🚀</div>
                                <h3>Eficiencia Garantizada</h3>
                                <p>Optimizamos sus procesos de pedidos, reduciendo errores y ahorrando tiempo valioso.</p>
                            </div>
                            <div className="feature-card" data-aos="fade-up" data-aos-duration="2000" data-aos-mirror="true">
                                <div className="feature-icon">💡</div>
                                <h3>Innovación Constante</h3>
                                <p>Actualizaciones y nuevas funcionalidades basadas en las necesidades del mercado.</p>
                            </div>
                            <div className="feature-card" data-aos="fade-down" data-aos-duration="2000" data-aos-mirror="true">
                                <div className="feature-icon">🤝</div>
                                <h3>Soporte Premium</h3>
                                <p>Equipo de soporte dedicado para resolver cualquier duda o incidencia.</p>
                            </div>
                        </div>
                    </section>

                    <section className="team-section">
                        <h2 className="section-title-about">Nuestro Equipo</h2>
                        <div className="team-grid">
                            <div className="team-member">
                                <h3>Stiven Gomez</h3>
                            </div>
                            <div className="team-member">
                                <h3>Juan José Duque</h3>
                            </div>
                            <div className="team-member">
                                <h3>Tomas Mejía</h3>
                            </div>
                            <div className="team-member">
                                <h3>Luis Angel Suarez </h3>
                            </div>
                        </div>
                    </section>

                    <section className="statistics-section" data-aos="fade-right" data-aos-duration="2000" data-aos-mirror="true">
                        <h2 className="section-title-about">Nuestro Impacto en Números</h2>
                        <div className="stats-grid">
                            <div className="stat-item" ref={ref1}>
                                {inView1 && <CountUp
                                    end={1000}
                                    duration={10}
                                    separator='.'
                                    className='stat-number'
                                    suffix='+'
                                />}
                                <p>Clientes Satisfechos</p>
                            </div>
                            <div className="stat-item" ref={ref2}>
                                {inView2 && <CountUp
                                    end={50000}
                                    duration={10}
                                    separator='.'
                                    className='stat-number'
                                    suffix='K'
                                    prefix="+"
                                />}
                                <p>Pedidos Procesados</p>
                            </div>
                            <div className="stat-item" ref={ref3}>
                                {inView3 && <CountUp
                                    end={99}
                                    duration={10}
                                    separator='.'
                                    className='stat-number'
                                    suffix='%'
                                />}
                                <p>Tiempo Activo</p>
                            </div>
                            <div className="stat-item" ref={ref4}>
                                {inView4 && <CountUp
                                    end={98}
                                    duration={10}
                                    separator='.'
                                    className='stat-number'
                                    suffix='%'
                                />}
                                <p>Satisfaccion de el aplicativo</p>
                            </div>
                        </div>
                    </section>

                    <section className="values-section">
                        <h2 className="section-title-about">Nuestros Valores</h2>
                        <div className="values-grid">
                            <div className="value-card">
                                <div className="value-icon">⭐</div>
                                <h3>Excelencia</h3>
                                <p>Buscamos la perfección en cada aspecto de nuestro servicio</p>
                            </div>
                            <div className="value-card">
                                <div className="value-icon">🤝</div>
                                <h3>Compromiso</h3>
                                <p>Dedicados al éxito de nuestros clientes</p>
                            </div>
                            <div className="value-card">
                                <div className="value-icon">💡</div>
                                <h3>Innovación</h3>
                                <p>Siempre buscando nuevas formas de mejorar</p>
                            </div>
                            <div className="value-card">
                                <div className="value-icon">🎯</div>
                                <h3>Integridad</h3>
                                <p>Transparencia y honestidad en todo lo que hacemos</p>
                            </div>
                        </div>
                    </section>

                    <section className="timeline-section">
                        <h2 className="section-title-about">Nuestra Historia</h2>
                        <div className="timeline">
                            <div className="timeline-item" data-aos="fade-left" data-aos-duration="2000" data-aos-mirror="true">
                                <h3>2022 - Los Inicios</h3>
                                <p>Fundación de Fast Request con la visión de revolucionar la gestión de pedidos</p>
                            </div>
                            <div className="timeline-item" data-aos="fade-right" data-aos-duration="2000" data-aos-mirror="true">
                                <h3>2023 - Crecimiento</h3>
                                <p>Expansión a nuevos mercados y desarrollo de características innovadoras</p>
                            </div>
                            <div className="timeline-item" data-aos="fade-left" data-aos-duration="2000" data-aos-mirror="true">
                                <h3>2024 - Innovación</h3>
                                <p> mejoras en la experiencia de usuario</p>
                            </div>
                            <div className="timeline-item" data-aos="fade-right" data-aos-duration="2000" data-aos-mirror="true">
                                <h3>2025 - Presente</h3>
                                <p>Consolidación como líderes en el mercado de gestión de pedidos</p>
                            </div>
                        </div>
                    </section>

                    <section className="testimonials-section">
                        <h2 className="section-title-about">Lo que dicen nuestros clientes</h2>
                        <div className="testimonials-grid">
                            <div className="testimonial-card" data-aos="flip-up" data-aos-duration="2000" data-aos-mirror="true">
                                <img src="/img/user.png" alt="Cliente 1" />
                                <h3>John Rockefeller</h3>
                                <p>"Fast Request ha transformado completamente la manera en que manejamos nuestros pedidos. ¡Increíble servicio!"</p>
                            </div>
                            <div className="testimonial-card" data-aos="flip-up" data-aos-duration="2000" data-aos-mirror="true">
                                <img src="/img/user.png" alt="Cliente 2" />
                                <h3>John Morgan</h3>
                                <p>"La mejor inversión que hemos hecho para nuestro negocio. El soporte al cliente es excepcional."</p>
                            </div>
                            <div className="testimonial-card" data-aos="flip-up" data-aos-duration="2000" data-aos-mirror="true">
                                <img src="/img/user.png" alt="Cliente 3" />
                                <h3>Jacob Rothschild</h3>
                                <p>"Eficiente, intuitivo y con excelente soporte técnico. ¡Totalmente recomendado!"</p>
                            </div>
                        </div>
                    </section>
                </div>
                <FooterPage />
            </div>
        </>
    )
}

export default Nosotros
