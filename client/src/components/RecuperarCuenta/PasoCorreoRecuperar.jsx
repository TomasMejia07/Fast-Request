import React, { useState, useEffect } from 'react'
import '../../assets/css/style.css'
import axios from 'axios'

const PasoCorreo = ({ siguiente, datos, actualizar }) => {
    useEffect(() => {
        document.title = 'Recuperar Cuenta - Fast Request'
    }, []);

    const [correo, setCorreo] = useState(datos.correo || '')
    const [errorEmail, setErrorEmail] = useState('')


    const verificarEmail = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/usuarios/verificarEmail?correo=${correo}`);
            if (res.data.existe) {
                setErrorEmail(res.data.mensaje); 
                return true;
            } else {
                setErrorEmail(''); 
                return false;
            }
        } catch (err) {
            console.error('Error al verificar el correo', err);
            setErrorEmail('Error al verificar el correo.');
            return false;
        }
    };
    

    const handleEmailCode = async () => {
        if (!correo.trim()) {
            setErrorEmail('Por favor ingrese un correo.')
            return
        }

        const existe = await verificarEmail();
        if (existe) {
            setErrorEmail('Este correo ya está registrado.');
            return;
        }

        try {
            const res = await axios.post('http://localhost:5000/api/validarEmail/handle-email', {
                correo
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (res.status === 200 || res.status === 201) {
                console.log('Correo enviado correctamente')
                setErrorEmail('');
                actualizar({ ...datos, correo })
                siguiente()
            }

        } catch (err) {
            if (err.response && err.response.status === 400) {
                setErrorEmail(err.response.data.message); 
            } else {
                setErrorEmail('Ocurrió un error al registrar.');
            }
        }
    }
    
    const manejarEnvio = (e) => {
        e.preventDefault()
        handleEmailCode()
    }


    return (
        <form className="form-group login-form-group" onSubmit={manejarEnvio}>
            <fieldset>
                <h3 className="titulo">Ingresa tu Email</h3>
                <p className="texto-secundario">Te enviaremos un mensaje para restablecer tu contraseña.</p>

                <div className="input-container ic1 mb-3">
                    <input
                        type="email"
                        className="login-input"
                        placeholder="E-mail"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                    />
                    {errorEmail && <div className="error">{errorEmail}</div>}
                </div>

                <button type="submit" className="btn btn-outline-light">Continuar</button>
            </fieldset>
        </form>
    );
};

export default PasoCorreo;
