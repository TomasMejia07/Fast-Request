// components/ConditionalBootstrap.jsx
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const ConditionalBootstrap = () => {
const location = useLocation();

useEffect(() => {
    // Si estamos en /login o /registro, cargamos Bootstrap
        if (location.pathname === "/" || location.pathname === "/registro") {
            import("bootstrap/dist/css/bootstrap.min.css");
        }
}, [location.pathname]);

  return null; // No renderiza nada
};

export default ConditionalBootstrap;
