import React, { useEffect } from "react";
import "../../assets/css/miPagina.css";
import NavbarMiPageEdit from "../../components/miPagina/NavbarEdicion";
import { useMiPaginaEdit } from "../../hooks/useMiPaginaEdit";
import { Link } from "react-router-dom";

const CartaPageEdit = () => {
    const {
        categorias,
        productos,
        setCategoriaSeleccionada,
        categoriaSeleccionada
    } = useMiPaginaEdit();


    return (
        <div className="page">
            <NavbarMiPageEdit />

            <nav className="navbar-categorias sticky-bar">
                <div className="navbar-categorias-container">
                    <div className="icono-busqueda">
                        <ion-icon name="search-outline"></ion-icon>
                    </div>

                    <div className="categorias-menu">
                        {categorias.map((cat) => (
                            <Link
                                key={cat.Id}
                                onClick={() => setCategoriaSeleccionada(cat.Id)}
                            >
                                {cat.NombreCategoria.toUpperCase()}
                            </Link>
                        ))}
                    </div>

                    <div className="menu-extra">
                        <ion-icon name="ellipsis-vertical-outline"></ion-icon>
                    </div>
                </div>
            </nav>


            <div className="Container-Productos">
                <div className="Categorias-Lista">

                    {categoriaSeleccionada && (
                        <div className="Productos">

                            <h1 className="Titulo-de-categoria">
                                {
                                    categorias.find(cat => cat.Id === categoriaSeleccionada)?.NombreCategoria.toUpperCase()
                                }
                            </h1>

                            <div className="Lista">
                                {productos
                                    .filter(prod => prod.IdCategoria === categoriaSeleccionada)
                                    .map(produc => (
                                        <div className="Producto" key={produc.id}>
                                            <div className="informacion">
                                                <h2>{produc.NombreProducto.toUpperCase()}</h2>
                                                <p>{produc.DescripcionProducto}</p>
                                                <p>Precio: <strong>${produc.PrecioProducto}</strong></p>
                                            </div>

                                            <div className="imagen-prod">
                                                <img
                                                    src="https://placehold.co/250x200?text=Sin+Imagen"
                                                    alt={produc.NombreProducto}
                                                />
                                                <ion-icon name="add-outline"></ion-icon>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartaPageEdit;
