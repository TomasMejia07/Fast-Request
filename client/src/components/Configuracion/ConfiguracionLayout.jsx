import React, { useState, useEffect } from "react";
import MenuConfiguracion from "./MenuConfiguracion";
import TopBar from "../Dashboard/TopBar";
import "../../assets/css/configuracion.css";

const ConfiguracionLayout = ({ title = "Configuracion", children }) => {
    const [activeMenu, setActiveMenu] = useState(false);

    const toggleMenu = () => {
            setActiveMenu(!activeMenu);
        };
    
        useEffect(() => {
            document.title = title;
            window.scrollTo(0, 0);
        }, [title]);
    
    return (
        <section className="dashboard-section">
            <div className={`nav ${activeMenu ? 'active' : ''}`}>
                <MenuConfiguracion />
            </div>
            <div className={`dashboard-container ${activeMenu ? 'active' : ''}`}>
                <TopBar onToggleNav={toggleMenu} />
                <main>
                    {children}
                </main>
            </div>
        </section>
    )
}

export default ConfiguracionLayout