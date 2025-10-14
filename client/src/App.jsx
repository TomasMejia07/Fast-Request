// client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './components/Configuracion/Them';

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
import VisualizarInactividadDeClientes from './pages/Dashboard/visualizarClientesInactivos';
import PedidoCompleto from './pages/Dashboard/PedidoCompleto';
import MiPagina from './pages/MiPagina/miPagina';
import CocinaDashboard from './pages/Dashboard/CocinaDashboard';
import Complementos from './pages/Dashboard/complementos';
import ComplementosCompletos from './pages/Dashboard/complementosCompletos';

const AppContent = () => {

  const location = useLocation(); 
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <>
      <ConditionalBootstrap />

      {isDashboard ? (
        <ThemeProvider>
          <Routes>
            <Route path="/dashboard" element={<InicioDashboard />} />
            <Route path="/dashboard/categoria" element={<CategoriaDashboard />} />
            <Route path="/dashboard/productos" element={<ProductosDashboard />} />
            <Route path="/dashboard/roles" element={<RolesDashboard />} />
            <Route path="/dashboard/usuarios" element={<UsuariosDashboard />} />
            <Route path="/dashboard/clientes" element={<ClientesDashboard />} />
            <Route path="/dashboard/estadisticas" element={<EstadisticasDashboard />} />
            <Route path="/dashboard/pedidos" element={<PedidosDashboard />} />
            <Route path="/dashboard/complementos" element={<Complementos />} />
            <Route path="/dashboard/complementos-inactivos" element={<ComplementosCompletos />} />
            <Route path="/dashboard/pedido-full/:id" element={<PedidoCompleto />} />
            <Route path="/dashboard/hacerPedido" element={<HacerPedidoDashboard />} />
            <Route path="/dashboard/pedidosPorCliente/:clienteId" element={<PedidosPorCliente />} />
            <Route path="/dashboard/clientesInactivos" element={<VisualizarInactividadDeClientes />} />
            <Route path="/dashboard/configuracion" element={<Configuracion />} />
            <Route path="/dashboard/perfil" element={<Perfil />} />
            <Route path="/dashboard/cocina" element={<CocinaDashboard />} /> 
          </Routes>
        </ThemeProvider>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/recuperarContrasena" element={<RecuperarContrasena />} />
          <Route path='/miPagina' element={<MiPagina />} /> 
        </Routes>
      )}
    </>
  );
}

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
