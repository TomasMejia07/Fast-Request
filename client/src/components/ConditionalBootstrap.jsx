import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const ConditionalBootstrap = () => {
const location = useLocation();

useEffect(() => {
        if (location.pathname === "/" || location.pathname === "/registro", "/recuperar/contrasena") {
            import("bootstrap/dist/css/bootstrap.min.css");
        }
}, [location.pathname]);

  return null; 
};

export default ConditionalBootstrap;
