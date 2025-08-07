import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../assets/css/style.css';
import axios from 'axios';

const PasoContrasena = ({ anterior, datos, actualizar }) => {
    useEffect(() => {
        document.title = 'Crea una nueva contraseña - Fast Request';
    }, []);

    const [password, setPassword] = useState('');
    const [confirmarPassword, setConfirmarPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const manejarEnvio = async (e) => {
        e.preventDefault();

        if (!password || !confirmarPassword) {
            setError('Por favor ingrese ambas contraseñas.');
            return;
        }

        if (password !== confirmarPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        const datosActualizados = { ...datos, password };
        actualizar(datosActualizados);

        try {
            const response = await axios.post(
                'http://localhost:5000/api/usuarios/registro',
                datosActualizados,
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.status === 200 || response.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Registro exitoso!',
                    text: 'Tu usuario ha sido creado correctamente.',
                    confirmButtonText: 'Continuar'
                }).then(() => {
                    navigate('/');
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error en el registro',
                    text: response.data.error || 'Intenta de nuevo más tarde.'
                });
            }
        } catch (error) {
            console.error('Error de conexión:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error de conexión',
                text: error.response?.data?.error || 'No se pudo conectar con el servidor.'
            });
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
