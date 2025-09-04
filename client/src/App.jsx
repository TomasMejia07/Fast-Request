// client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';

import Registro from './components/Registro/Registro';
import RecuperarContrasena from './components/RecuperarCuenta/Rcontraseña';

import InicioDashboard from './pages/Dashboard/InicioDashboard';
import CategoriaDashboard from './pages/Dashboard/CategoriaDashboard';
import ProductosDashboard from './pages/Dashboard/ProductosDashboard';
import RolesDashboard from './pages/Dashboard/RolesDashboard';
import UsuariosDashboard from './pages/Dashboard/UsuariosDashboard';
import EstadisticasDashboard from './pages/Dashboard/EstadisticasDashboard';
import PedidosDashboard from './pages/Dashboard/PedidosDashboard';
import HacerPedidoDashboard from './pages/Dashboard/HacerPedidoDashboard';
import ConditionalBootstrap from './components/ConditionalBootstrap';
import Configuracion from './pages/Configuracion/configuracion';
import Perfil from './pages/Configuracion/perfil';
import ClientesDashboard from './pages/Dashboard/ClientesDashboard';
import PedidosPorCliente from './pages/Dashboard/pedidosPorCliente';


function App() {
  return (
    <Router>
      <ConditionalBootstrap /> 
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/recuperarContrasena" element={<RecuperarContrasena />} />

        <Route path="/dashboard" element={<InicioDashboard />} />
        <Route path="/dashboard/categoria" element={<CategoriaDashboard />} />
        <Route path="/dashboard/productos" element={<ProductosDashboard />} />
        <Route path="/dashboard/roles" element={<RolesDashboard />} />
        <Route path="/dashboard/usuarios" element={<UsuariosDashboard />} />
        <Route path="/dashboard/clientes" element={<ClientesDashboard />} />
        <Route path="/dashboard/estadisticas" element={<EstadisticasDashboard />} />
        <Route path="/dashboard/pedidos" element={<PedidosDashboard />} />
        <Route path="/dashboard/hacerPedido" element={<HacerPedidoDashboard />} />
        <Route path="/dashboard/pedidosPorCliente/:clienteId" element={<PedidosPorCliente />} />

        <Route path="/dashboard/configuracion" element={<Configuracion />}/>
        <Route path="/dashboard/perfil" element={<Perfil />} />
        
      </Routes>
    </Router>
  );
}

export default App;