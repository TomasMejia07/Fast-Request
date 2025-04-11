import React, { useState, useEffect } from 'react';
import '../assets/css/style.css';
import { Link } from 'react-router-dom';

function Registro() {

    useEffect(() => {
        document.title = 'Registro - Fast Request';
    }, []);


    return (
        <div className="container login-container">
            <h2>Registro</h2>
        </div>
    )

}

export default Registro;
