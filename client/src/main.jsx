// client/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
