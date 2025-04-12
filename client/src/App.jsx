// client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Registro from './components/Registro';
import InicioDashboard from './pages/Dashboard/InicioDashboard';
import DashboardLayout from './components/Dashboard/DashboardLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/dashboard" element={<InicioDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
