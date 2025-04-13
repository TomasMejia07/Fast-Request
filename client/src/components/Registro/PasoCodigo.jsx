import React, { useState, useEffect } from 'react';
import '../../assets/css/style.css';

const PasoCodigo = ({ siguiente, anterior, datos, actualizar }) => {
    useEffect(() => {
        document.title = 'Código de Verificación - Fast Request';
    }, []);

    const [codigo, setCodigo] = useState(datos.codigo || '');
    const [error, setError] = useState('');

    const manejarEnvio = (e) => {
        e.preventDefault();
        if (!codigo.trim()) {
            setError('Por favor ingrese el código de verificación.');
        } else {
            setError('');
            actualizar({ ...datos, codigo });
            siguiente(); 
        }
    };

    return (
            <form className="form-group login-form-group" onSubmit={manejarEnvio}>
                <fieldset>
                    <div className="login-img-container">
                        <img className="login-avatar" src="/img/user.png" alt="usuario" />
                    </div>

                    <h3 className="titulo">Verifica tu Correo</h3>
                    <p className="texto-secundario">Te hemos enviado un código por correo para validarlo.</p>
                    <p>Con este podrás iniciar sesión en tu cuenta.</p>

                    <div className="input-container ic1 mb-3">
                        <input
                            type="text"
                            className="login-input"
                            placeholder="Código"
                            value={codigo}
                            onChange={(e) => setCodigo(e.target.value)}
                        />
                        {error && <span className="error">{error}</span>}
                    </div>

                    <div className="d-flex justify-content-between">
                        <button type="button" className="btn btn-outline-light" onClick={anterior}>
                            Atrás
                        </button>
                        <button type="submit" className="btn btn-outline-light">
                            Verificar
                        </button>
                    </div>
                </fieldset>
            </form>
    );
};

export default PasoCodigo;
