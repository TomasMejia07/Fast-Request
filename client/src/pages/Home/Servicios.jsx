import React from 'react'
import NavbarPage from '../../components/Home/Navbar'
import '../../assets/css/home/servicios.css'
import MenuServicios from '../../components/Home/Menu_Servicios'
import menuHamburguesa from '../../components/Home/Menu_Hamburguer'

const Servicios = () => {
    return (
        <>
            <div className='servicesPage'>
                <NavbarPage extraClass='navbar-ServicesPage' />
                {menuHamburguesa()}
                <div className="container-servicesPage">
                    <MenuServicios />

                    <main className="main-content-servicesPage">
                        <section id="introduccion" className="section">
                            <h4>Introduccion</h4>

                            <p>El módulo de Servicios en nuestro software de pedidos proporciona herramientas
                                esenciales para la gestión eficiente de los pedidos, el control de inventario y la experiencia del cliente.</p>
                        </section>
                        <section id="gesPed" className="section-servicesPage">
                            <h4>Gestión de Pedidos</h4>
                            <ul>
                                <h6>Facilidad en la Gestion</h6>

                                <li><p>• Realizar, modificar y cancelar pedidos en tiempo real.</p></li>
                                <li><p>• Control de pedidos pendientes, completados y cancelados.</p></li>
                            </ul>
                            <h6>Seguimiento de Pedidos</h6>
                            <ul>
                                <li><p>• Rastreo en tiempo real del estado de los pedidos.</p></li>
                                <li><p>• Notificaciones automáticas de actualización del estado del pedido.</p></li>
                            </ul>
                            <h6>Pedidos Programados</h6>
                            <ul>
                                <li><p>• Programación de pedidos con fecha y hora específicas.</p></li>
                                <li><p>• Confirmación de programación con alertas previas al despacho.</p></li>
                            </ul>
                        </section>

                        <section id="serNeg" className="section-servicesPage">
                            <h4>Servicios para el negocio</h4>
                            <ul>
                                <h6>Gestión de Menú</h6>

                                <li><p>• Añadir, modificar o eliminar productos del menú.</p></li>
                                <li><p>• Actualización de precios y descripciones</p></li>
                            </ul>
                            <h6>Reportes y Análisis</h6>
                            <ul>
                                <li><p>• Generación de reportes de ventas.</p></li>
                                <li><p>• Análisis de productos más vendidos y horarios de mayor demanda.</p></li>
                            </ul>
                            <h6>Control de Inventario</h6>
                            <ul>
                                <li><p>• Gestión automática de inventario.</p></li>
                                <li><p>• Alertas de productos con bajo stock.</p></li>
                            </ul>
                            <h6>Promociones y Descuentos</h6>
                            <ul>
                                <li><p>• Creación de promociones.</p></li>
                                <li><p>• Gestión de descuentos automáticos en fechas específicas.</p></li>
                            </ul>
                            <h6>Mensajería Interna</h6>
                            <ul>
                                <li><p>• Creación y envío de mensajes entre administrador y usuarios dentro de la plataforma.</p></li>
                                <li><p>• Consulta de mensajes enviados y recibidos.</p></li>
                            </ul>
                        </section>

                        <section id="serCli" className="section-servicesPage">
                            <h4>Servicios parea el cliente</h4>
                            <ul>
                                <h6>Métodos de Pago</h6>
                                <li><p>• Soporte para pagos con tarjeta de crédito/débito, efectivo y billeteras digitales.</p></li>
                            </ul>
                            <h6>Historial de Pedidos</h6>
                            <ul>
                                <li><p>• Acceso al historial completo de pedidos realizados.</p></li>
                            </ul>
                            <h6>Notificaciones</h6>
                            <ul>
                                <li><p>• Confirmaciones de pedido por correo electrónico y notificaciones en la aplicación.</p></li>
                            </ul>
                        </section>

                        <section id="serTec" className="section-servicesPage">
                            <h4>Servicios Técnicos</h4>
                            <ul>
                                <h6>Seguridad y Privacidad</h6>

                                <li><p>• Protección de datos con cifrado.</p></li>
                                <li><p>• Cumplimiento con normativas de privacidad.</p></li>
                            </ul>
                            <h6>Soporte Técnico</h6>
                            <ul>
                                <li><p>• Soporte técnico especializado para resolver incidencias.</p></li>
                            </ul>
                        </section>

                        <section id="serAdm" className="section-servicesPage">
                            <h4>Servicios Administrativos</h4>
                            <ul>
                                <h6>Gestión por el Administrador</h6>

                                <li><p>• Avalar o rechazar el registro de empleados.</p></li>
                                <li><p>• Restablecer contraseñas de los usuarios.</p></li>

                                <li><p>• Asignar, modificar y eliminar roles de usuarios.</p></li>
                                <li><p>• Consultar permisos asociados a los usuarios.</p></li>
                            </ul>
                            <h6>Gestión de Usuarios y Roles</h6>
                            <ul>
                                <h5>Monitoreo en tiempo real:</h5>
                                <li><p>• Ver actividad de usuarios.</p></li>

                                <h5>Configuración de permisos avanzados:</h5>
                                <li><p>• Adaptada a las necesidades específicas del negocio.</p></li>
                            </ul>
                        </section>

                        <section id="proCli" className="section-servicesPage">
                            <h4>Productos y Clientes</h4>
                            <ul>
                                <h6>Modulos de Pago</h6>

                                <h5>Pagos divididos:</h5>
                                <li><p>• Opción para dividir la cuenta entre varios clientes.</p></li>
                            </ul>
                            <h6>Interfaz de Usuario</h6>
                            <ul>
                                <h5>Diseño responsivo:</h5>
                                <li><p>• Accesible desde cualquier dispositivo.</p></li>

                                <h5>Navegación sencilla:</h5>
                                <li><p>• Fácil de usar, reduciendo el tiempo de capacitación.</p></li>
                            </ul>
                            <h6>Funcionalidad de Toma de Pedidos</h6>
                            <ul>
                                <h5>Historial rápido:</h5>
                                <li><p>• Opción para repetir pedidos anteriores de forma sencilla.</p></li>

                                <h5>Sugerencias inteligentes:</h5>
                                <li><p>• Basadas en preferencias de cliente o tendencias..</p></li>
                            </ul>
                            <h6>Integración con Inventario</h6>
                            <ul>
                                <h5>Gestión de productos disponibles:</h5>
                                <li><p>• Solo se mostrarán productos disponibles en el menú activo.</p></li>

                                <h5>Control de disponibilidad:</h5>
                                <li><p>• Actualización manual de productos agotados por parte del administrador con notificaciones al cliente.</p></li>

                                <h5>Adaptación del menú en tiempo real:</h5>
                                <li><p>• Permite al administrador desactivar o activar productos según la disponibilidad.</p></li>
                            </ul>
                            <h6>Gestión de Cocina</h6>
                            <ul>
                                <h5>Prioridad de pedidos:</h5>
                                <li><p>• Destacar los más urgentes o con mayor demora acumulada.</p></li>
                            </ul>
                        </section>

                        <section id="repInd" className="section-servicesPage">
                            <h4>Reportes e Indicadores</h4>
                            <ul>
                                <h6>Reportes e Indicadores Reportes y Análisis</h6>

                                <h5>Reportes en tiempo real:</h5>
                                <li><p>• Paneles con indicadores clave (ventas del día, pedidos pendientes).</p></li>

                                <h5>Análisis de tiempos:</h5>
                                <li><p>• Promedio de preparación y entrega para optimizar procesos.</p></li>

                                <h5>• Segmentación de clientes:</h5>
                                <li><p>• Datos por frecuencia de compra, ubicación o preferencias.</p></li>
                            </ul>
                        </section>

                        <section id="sopt" className="section-servicesPage">
                            <h4>Soporte</h4>
                            <ul>
                                <h6>Soporte para Pedidos en Línea</h6>

                                <h5>Estado del pedido:</h5>
                                <li><p>• Seguimiento en tiempo real para clientes.</p></li>

                                <h5>Personalización de la experiencia online:</h5>
                                <li><p>• Ofrecer sugerencias o combos según el historial del cliente.</p></li>
                            </ul>
                        </section>

                        <section id="segPriv" className="section-servicesPage">
                            <h4>Seguridad y Privacidad</h4>
                            <ul>
                                <h5>Autenticación avanzada:</h5>
                                <li><p>• Uso de autenticación para roles críticos.</p></li>

                                <h5>Monitoreo de accesos:</h5>
                                <li><p>• Registro y alertas de actividades sospechosas</p></li>
                            </ul>
                        </section>

                        <section id="sisEsc" className="section-servicesPage">
                            <h4>Sistema Escalable</h4>
                            <ul>
                                <h6>Mantenimiento y Actualizaciones</h6>

                                <h5>Sistema modular:</h5>
                                <li><p>• Permitir agregar funcionalidades adicionales sin afectar el sistema base.</p></li>

                                <h5>Capacitación:</h5>
                                <li><p>• Incluir tutoriales integrados para usuarios nuevos o después de actualizaciones.</p></li>
                            </ul>
                        </section>
                    </main>
                </div>
            </div>
        </>
    )
}

export default Servicios
