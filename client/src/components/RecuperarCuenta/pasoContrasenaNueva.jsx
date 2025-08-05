import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../assets/css/style.css';
import axios from 'axios';

const PasoContrasenaNueva = ({ datos, actualizar }) => {
    useEffect(() => {
        document.title = 'Crea una nueva contraseña - Fast Request';
    }, []);

    const { usuario, password, OnChangeInput, errores, setErrores } = useLogin(initial)

    const [nuevaContrasena, setPassword] = useState('');
    const [confirmarNuevaContrasena, setConfirmarPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const manejarEnvio = async (e) => {
        e.preventDefault();

        if (!nuevaContrasena || !confirmarNuevaContrasena) {
            setError('Por favor ingrese ambas contraseñas.');
            return;
        }

        if (nuevaContrasena !== confirmarNuevaContrasena) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        const datosActualizados = { ...datos, nuevaContrasena };
        actualizar(datosActualizados);

        try {
            const response = await axios.put(
                'http://localhost:5000/api/recuperarCuenta/recuperar/cambiar-contrasena',
                datosActualizados,
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Cambio Exitoso!',
                    text: 'Tu Contraseña ha sido cambiada exitosamente.',
                    confirmButtonText: 'Continuar'
                }).then(() => {
                    navigate('/');
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error en la operación',
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
                <h3 className="titulo">Crea una nueva contraseña</h3>

                <div className="input-container ic1 mb-3">
                    <input
                        type="password"
                        className="login-input"
                        placeholder="Contraseña"
                        value={nuevaContrasena}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="input-container ic1 mb-3">
                    <input
                        type="password"
                        className="login-input"
                        placeholder="Repite la Contraseña"
                        value={confirmarNuevaContrasena}
                        onChange={(e) => setConfirmarPassword(e.target.value)}
                    />
                    {error && <span className="error">{error}</span>}
                </div>

                <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-outline-light">
                        Recuperar Cuenta
                    </button>
                </div>
            </fieldset>
        </form>
    );
};

export default PasoContrasenaNueva;
