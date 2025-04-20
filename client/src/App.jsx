// client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Registro from './components/Registro/Registro';
import InicioDashboard from './pages/Dashboard/InicioDashboard';
import CategoriaDashboard from './pages/Dashboard/CategoriaDashboard';
import ProductosDashboard from './pages/Dashboard/ProductosDashboard';
import RolesDashboard from './pages/Dashboard/RolesDashboard';
import UsuariosDashboard from './pages/Dashboard/UsuariosDashboard';
import EstadisticasDashboard from './pages/Dashboard/EstadisticasDashboard';
import PedidosDashboard from './pages/Dashboard/PedidosDashboard';
import HacerPedidoDashboard from './pages/Dashboard/HacerPedidoDashboard';
import ConditionalBootstrap from './components/ConditionalBootstrap';
import Configuracion from './pages/Configuracion/Configuracion';
import Perfil from './pages/Perfil/Perfil';

function App() {
  return (
    <Router>
      <ConditionalBootstrap /> 
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        <Route path="/dashboard" element={<InicioDashboard />} />
        <Route path="/dashboard/categoria" element={<CategoriaDashboard />} />
        <Route path="/dashboard/productos" element={<ProductosDashboard />} />
        <Route path="/dashboard/roles" element={<RolesDashboard />} />
        <Route path="/dashboard/usuarios" element={<UsuariosDashboard />} />
        <Route path="/dashboard/estadisticas" element={<EstadisticasDashboard />} />
        <Route path="/dashboard/pedidos" element={<PedidosDashboard />} />
        <Route path="/dashboard/hacerPedido" element={<HacerPedidoDashboard />} />

        <Route path="/configuracion" element={<Configuracion />}/>
        <Route path="/perfil" element={<Perfil />} />
        
      </Routes>
    </Router>
  );
}

export default App;
