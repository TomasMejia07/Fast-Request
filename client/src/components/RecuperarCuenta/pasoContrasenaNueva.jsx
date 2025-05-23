import React, { useState, useEffect } from 'react';
import '../../assets/css/style.css';

const PasoContrasenaNueva = ({ siguiente, datos, actualizar }) => {
    useEffect(() => {
        document.title = 'Recuperar Cuenta - Fast Request';
    }, []);

    const [email, setEmail] = useState(datos.email || '');
    const [errorEmail, setErrorEmail] = useState('');

    const manejarEnvio = (e) => {
        e.preventDefault();

        if (!email.trim()) {
            setErrorEmail('Por favor ingrese un correo.');
        } else {
            setErrorEmail('');
            actualizar({ ...datos, email });
            siguiente(); 
        }
    };

    return (
            <form className="form-group login-form-group" onSubmit={manejarEnvio}>
                <fieldset>
                    <div className="login-img-container">
                        <img className="login-avatar" src="/img/user.png" alt="usuario" />
                    </div>

                    <h3 className="titulo">Ingresa tu Email</h3>
                    <p className="texto-secundario">Te enviaremos un mensaje para confirmarlo.</p>

                    <div className="input-container ic1 mb-3">
                        <input
                            type="email"
                            className="login-input"
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errorEmail && <span className="error">{errorEmail}</span>}
                    </div>

                    <button type="submit" className="btn btn-outline-light">Continuar</button>
                </fieldset>
            </form>
    );
};

export default PasoContrasenaNueva;
