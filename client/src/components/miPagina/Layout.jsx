import React from "react";
import { Outlet } from "react-router-dom";
import NavbarMiPag from "./Navbar";

const MiPaginaLayout = () => {
    return (
        <>
            <NavbarMiPag />
            <Outlet />
        </>
    );
};

export default MiPaginaLayout;