import React, { useState, useEffect } from 'react';
import '../../assets/css/style.css';

const PasoContrasena = ({ anterior, siguiente, datos, actualizarDatos, finalizarRegistro }) => {
    useEffect(() => {
        document.title = 'Crea una Contraseña - Fast Request';
    }, []);

    const [password, setPassword] = useState('');
    const [confirmarPassword, setConfirmarPassword] = useState('');
    const [error, setError] = useState('');

    const manejarEnvio = (e) => {
        e.preventDefault();

        if (!password || !confirmarPassword) {
            setError('Por favor ingrese ambas contraseñas.');
        } else if (password !== confirmarPassword) {
            setError('Las contraseñas no coinciden.');
        } else {
            setError('');
            actualizar({ ...datos, password });
            finalizarRegistro();
        }
    };

    return (
        <form className="form-group login-form-group" onSubmit={manejarEnvio}>
            <fieldset>
                <div className="login-img-container">
                    <img className="login-avatar" src="/img/user.png" alt="usuario" />
                </div>

                <h3 className="titulo">Crea una Contraseña</h3>

                <div className="input-container ic1 mb-3">
                    <input
                        type="password"
                        className="login-input"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="input-container ic1 mb-3">
                    <input
                        type="password"
                        className="login-input"
                        placeholder="Repite la Contraseña"
                        value={confirmarPassword}
                        onChange={(e) => setConfirmarPassword(e.target.value)}
                    />
                    {error && <span className="error">{error}</span>}
                </div>

                <div className="d-flex justify-content-between">
                    <button type="button" className="btn btn-outline-light" onClick={anterior}>
                        Atrás
                    </button>
                    <button type="submit" className="btn btn-outline-light">
                        Finalizar
                    </button>
                </div>
            </fieldset>
        </form>
    );
};

export default PasoContrasena;
