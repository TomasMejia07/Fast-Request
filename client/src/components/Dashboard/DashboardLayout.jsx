import React, { useState } from 'react';
import MenuDashboard from './Menu';
import TopBar from './TopBar';
import '../../assets/css/dashboard.css';



const DashboardLayout = ({ title = "Dashboard", children }) => {
    const [activeMenu, setActiveMenu] = useState(false);

    const toggleMenu = () => {
        setActiveMenu(!activeMenu);
    };

    document.title = title;

    return (
        <section className='SectionDashboard'>
            <div className={`nav ${activeMenu ? 'active' : ''}`}>
                <MenuDashboard />
            </div>
            <div className={`containerDashboard container ${activeMenu ? 'active' : ''}`}>
                <TopBar onToggleNav={toggleMenu} />
                <main>
                    {children}
                </main>
            </div>
        </section>
    );
};

export default DashboardLayout;
