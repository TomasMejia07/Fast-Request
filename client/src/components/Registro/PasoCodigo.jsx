import React, { useState, useEffect } from 'react';
import '../../assets/css/style.css';
import axios from 'axios';

const PasoCodigo = ({ siguiente, anterior, datos, actualizar }) => {

    useEffect(() => {
        document.title = 'Código de Verificación - Fast Request';
    }, []);

    const [codigo, setCodigo] = useState(datos.codigo || '');
    const [error, setError] = useState('');


    const handleVerificar = async () => {

        if (!codigo.trim()) {
            setError('Por favor ingrese el código de verificación.');
            return
        }

        try {
            const res = await axios.post('http://localhost:5000/api/validarEmail/verify-code', {
                correo: datos.correo,
                codigo
            }, {
                headers: { 'Content-Type': 'application/json' }
            })

            if (res.data.verified) {
                console.log("Código verificado correctamente");
                setError('');
                actualizar({ ...datos, codigo });
                siguiente();
            } else {
                setError("Código incorrecto");
            }


        } catch (err) {
            console.error("Error al verificar el código", err);
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("Error al verificar el código.");
            }
        }
    };

    const manejarEnvio = (e) => {
        e.preventDefault();
        handleVerificar();
    };

    return (
        <form className="form-group login-form-group" onSubmit={manejarEnvio}>
            <fieldset>
                <div className="login-img-container">
                    <img className="login-avatar" src="/img/user.png" alt="usuario" />
                </div>

                <h3 className="titulo">Verifica tu Correo</h3>
                <p className="texto-secundario">Te hemos enviado un código por correo. Por el momento te llegara al spam revisalo!😉</p>

                <div className="input-container ic1 mb-3">
                    <input
                        type="text"
                        className="login-input"
                        placeholder="Código"
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
                    />
                    {error && <div className="error">{error}</div>}
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
