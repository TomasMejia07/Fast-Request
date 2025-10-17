import React from "react";
import { useCategoriasInactivas } from "../../hooks/useCategoriasInactivas";


const CategoriasInactivas = () => {

    const { categorias, cambiarEstadoCategoria, volverAlInicio } = useCategoriasInactivas();


    return (
        <div className="tabla-contenedor">
            <div className="tabla-header">
                <h2>🚫 Lista De Categorías Inactivas</h2>
            </div>

            {categorias.length === 0 ? (
                <p>No hay categorías inactivas por el momento.</p>
            ) : (
                <table className="tabla">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Estado Actual</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categorias.map((cat) => (
                            <tr key={cat.Id}>
                                <td>{cat.NombreCategoria}</td>
                                <td>{cat.EstadoCategoria}</td>
                                <td className="tabla-acciones">
                                    <button
                                        className="btn-imprimir"
                                        title="Activar categoría"
                                        aria-label={`Activar ${cat.NombreCategoria}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            cambiarEstadoCategoria(cat.Id);
                                        }}
                                    >
                                        <ion-icon name="checkmark-circle-outline"></ion-icon>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <a className="btn-volver" onClick={volverAlInicio}>
                Volver
            </a>
        </div>
    );
};

export default CategoriasInactivas;
