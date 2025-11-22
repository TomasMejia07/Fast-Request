import React from "react";
import "../../assets/css/miPagina.css";
import { useMiPagina } from "../../hooks/useMiPagina.js";
import { Link } from "react-router-dom";

const Carta = () => {
  const {
    categorias,
    productos,
    setCategoriaSeleccionada,
    categoriaSeleccionada,
    loading,
    error,
  } = useMiPagina();

  if (loading) {
    return (
      <div className="loading-container">
        <p>Cargando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="page">

      <nav className="navbar-categorias sticky-bar">
        <div className="navbar-categorias-container">
          <div className="icono-busqueda">
            <ion-icon name="search-outline"></ion-icon>
          </div>

          <div className="categorias-menu">
            {categorias.map((cat) => (
              <Link
                key={cat.id}
                onClick={() => setCategoriaSeleccionada(cat.id)}
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
                  categorias.find(cat => cat.id === categoriaSeleccionada)?.NombreCategoria.toUpperCase()
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

export default Carta;
