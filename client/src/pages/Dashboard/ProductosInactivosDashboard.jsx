import React from "react";
import { useProductosInactivos } from "../../hooks/useProductosInactivos";



const ProductosInactivos = () => {

const {
        productos,
        cambiarEstadoProducto,
        volverAlInicio
    } = useProductosInactivos();


    return (
        <div className="tabla-contenedor">
            <div className="tabla-header">
                <h2>🚫 Lista De Productos Inactivos</h2>
            </div>

            {productos.length === 0 ? (
                <p>No hay productos inactivos por el momento.</p>
            ) : (
                <table className="tabla">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Categoría</th>
                            <th>Precio</th>
                            <th>Descripcion</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((prod) => (
                            <tr key={prod.Id}>
                                <td>{prod.NombreProducto}</td>
                                <td>{prod.categorium?.NombreCategoria}</td>
                                <td>{prod.PrecioProducto}</td>
                                <td>{prod.DescripcionProducto}</td>
                                <td>{prod.EstadoProducto}</td>
                                <td>
                                    <button
                                        className="btn-imprimir"
                                        title="Activar producto"
                                        aria-label={`Activar ${prod.NombreProducto}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            cambiarEstadoProducto(prod.Id);
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

export default ProductosInactivos;
