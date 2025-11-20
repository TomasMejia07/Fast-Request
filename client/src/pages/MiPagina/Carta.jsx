import React, { useEffect } from "react";
import "../../assets/css/miPagina.css";
import NavbarMiPag from "../../components/miPagina/Navbar";
import { useMiPagina } from "../../hooks/useMiPagina";

const Carta = () => {
  const { categorias, productos, VisualizarCategoriasMenu, cargarProductos } = useMiPagina();

  useEffect(() => {
    VisualizarCategoriasMenu();
    cargarProductos();
  }, []);

  return (
    <div className="page">
      <NavbarMiPag />

      {/* Navbar fija de categorías */}
      <nav className="navbar-categorias sticky-bar">
        <div className="navbar-categorias-container">
          <div className="icono-busqueda">
            <ion-icon name="search-outline"></ion-icon>
          </div>
            <div className="categorias-menu">
              {categorias.map((cat) => (
              <a href="#" key={cat.Id}>{cat.NombreCategoria}</a>
              ))}
            </div>
          <div className="menu-extra">
            <ion-icon name="ellipsis-vertical-outline"></ion-icon>
          </div>
        </div>
      </nav>

      {/* Contenedor general de productos */}
      <div className="Container-Productos">
        <div className="Categorias-Lista">

          {/* 🔥 Agrupación de productos por categoría */}
          {categorias.map((cat) => {
            const productosDeEstaCategoria = productos.filter(
              (prod) => prod.IdCategoria === cat.Id
            );

            if (productosDeEstaCategoria.length === 0) return null; // si no hay productos, no muestra nada

            return (
              <div className="Productos" key={cat.Id}>
                <h1 className="Titulo-de-categoria">{cat.NombreCategoria}</h1>

                <div className="Lista">
                  {productosDeEstaCategoria.map((produc) => (
                    <div className="Producto" key={produc.Id}>
                      <div className="informacion">
                        <h2>{produc.NombreProducto}</h2>
                        <p>{produc.DescripcionProducto}</p>
                        <p>Precio: ${produc.PrecioProducto}</p>
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
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Carta;
