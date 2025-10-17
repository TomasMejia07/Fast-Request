import React from "react";
import { useRolInactivos } from "../../hooks/useRolInactivos";



const RolesInactivos = () => {

    const {
        roles,
        cambiarEstadoRol,
        volverAlInicio
    } = useRolInactivos();

    return (
        <div className="tabla-contenedor">
            <div className="tabla-header">
                <h2>🚫 Lista De Roles Inactivos</h2>
            </div>

            {roles.length === 0 ? (
                <p>No hay roles inactivas por el momento.</p>
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
                        {roles.map((rol) => (
                            <tr key={rol.Id}>
                                <td>{rol.NombreRol}</td>
                                <td>{rol.EstadoRol}</td>
                                <td className="tabla-acciones">
                                    <button
                                        className="btn-imprimir"
                                        title="Activar Roles"
                                        aria-label={`Activar ${rol.NombreRol}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            cambiarEstadoRol(rol.Id);
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

export default RolesInactivos;
