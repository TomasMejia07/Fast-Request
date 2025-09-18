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
    const [cargando, setCargando] = useState(false);

    const navigate = useNavigate();

    const validarPassword = (pass) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return regex.test(pass);
    };

    const manejarEnvio = async (e) => {
        e.preventDefault();
        setError('');
        setCargando(true);

        if (!password || !confirmarPassword) {
            setError('Por favor ingrese ambas contraseñas.');
            setCargando(false);
            return;
        }

        if (!validarPassword(password)) {
            setError('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.');
            setCargando(false);
            return;
        }

        if (password !== confirmarPassword) {
            setError('Las contraseñas no coinciden.');
            setCargando(false);
            return;
        }

        // ✅ Preparar datos en el formato que espera el backend (mayúsculas)
        const datosParaBackend = {
            Correo: datos.correo,
            Nombre: datos.nombre,
            Apellido: datos.apellido,
            Password: password,
            EmpresaId: datos.empresaId, // ✅ 1
            RolId: datos.rolId          // ✅ 1
        };

        actualizar({ ...datos, password });

        try {
            const response = await axios.post(
                'http://localhost:5000/api/auth/registro',
                datosParaBackend, 
                { 
                    headers: { 
                        'Content-Type': 'application/json' 
                    } 
                }
            );

            if (response.status === 201) {
                await Swal.fire({
                    icon: 'success',
                    title: '¡Registro exitoso!',
                    text: 'Tu usuario administrador ha sido creado correctamente.',
                    confirmButtonText: 'Iniciar Sesión'
                });
                navigate('/login'); // ✅ Redirigir a login
            }
        } catch (error) {
            console.error('Error de registro:', error);
            
            let mensajeError = 'Error en el registro. Intenta de nuevo.';
            
            if (error.response?.data?.error === 'El correo ya está registrado') {
                mensajeError = 'Este correo electrónico ya está registrado.';
            } else if (error.response?.data?.error) {
                mensajeError = error.response.data.error;
            }

            Swal.fire({
                icon: 'error',
                title: 'Error en el registro',
                text: mensajeError
            });
        } finally {
            setCargando(false);
        }
    };

    return (
        <form className="form-group login-form-group" onSubmit={manejarEnvio}>
            <fieldset>
                <div className="login-img-container">
                    <img className="login-avatar" src="/img/user.png" alt="usuario" />
                </div>

                <h3 className="titulo">Crea una Contraseña de Administrador</h3>
                <p className="text-muted">Mínimo 8 caracteres, con mayúscula, minúscula y número</p>

                <div className="input-container ic1 mb-3">
                    <input
                        type="password"
                        className="login-input"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={cargando}
                    />
                </div>

                <div className="input-container ic1 mb-3">
                    <input
                        type="password"
                        className="login-input"
                        placeholder="Repite la Contraseña"
                        value={confirmarPassword}
                        onChange={(e) => setConfirmarPassword(e.target.value)}
                        disabled={cargando}
                    />
                    {error && <span className="error text-danger">{error}</span>}
                </div>

                <div className="d-flex justify-content-between">
                    <button 
                        type="button" 
                        className="btn btn-outline-light" 
                        onClick={anterior}
                        disabled={cargando}
                    >
                        Atrás
                    </button>
                    <button 
                        type="submit" 
                        className="btn btn-outline-light"
                        disabled={cargando}
                    >
                        {cargando ? 'Registrando...' : 'Crear Cuenta Admin'}
                    </button>
                </div>
            </fieldset>
        </form>
    );
};

export default PasoContrasena;