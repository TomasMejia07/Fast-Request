import React from 'react';
import MenuDashboard from './Menu';
import TopBar from './TopBar';
import '../../assets/css/dashboard.css';



const DashboardLayout = ({ title = "Dashboard", children }) => {
    document.title = title;

    return (
        <section>
        <MenuDashboard />
        <div className="container">
        <TopBar />
            <main>
                {children}
            </main>
        </div>
        </section>
    );
};

export default DashboardLayout;
