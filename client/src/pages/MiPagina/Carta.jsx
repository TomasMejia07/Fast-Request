import React from "react";
import "../../assets/css/miPagina.css";
import { useNavigate } from "react-router-dom";

const Carta = () => {
  const navigate = useNavigate();
  return (
    <div className="page">
      {/* Navbar principal (se desplaza con el scroll) */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="logo">LOGO</div>
          <div className="menu">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/miPagina");
              }}
            >
              Inicio
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/miPagina/carta");
              }}
            >
              Carta
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("");
              }}
            >
              Contáctanos
            </a>
          </div>
          <div className="nav-buttons">
            <button>
              <ion-icon name="cart-outline"></ion-icon>
            </button>
            <button>
              <ion-icon name="log-in-outline"></ion-icon>
            </button>
          </div>
        </div>
      </nav>

      {/* Navbar fija de categorías */}
      <nav className="navbar-categorias sticky-bar">
        <div className="navbar-categorias-container">
          <div className="icono-busqueda">
            <ion-icon name="search-outline"></ion-icon>
          </div>

          <div className="categorias-menu">
            <a href="#">Hamburguesa</a>
            <a href="#">Acompañantes</a>
            <a href="#">Adiciones</a>
            <a href="#">Bebidas</a>
          </div>

          <div className="menu-extra">
            <ion-icon name="ellipsis-vertical-outline"></ion-icon>
          </div>
        </div>
      </nav>

      {/* Contenedor principal de productos */}

      {/* Categoría 1 */}
      <div className="Productos">
        <h1 className="Titulo-de-categoria">Hamburguesas</h1>
        <div className="Lista">
          <div className="Producto">
            <div className="informacion">
              <h2>Hamburguesa Clásica</h2>
              <p>Deliciosa carne de res con queso, lechuga y tomate.</p>
              <p>Precio: $10.00</p>
            </div>
            <div className="imagen-prod">
              <img src="https://placehold.co/250x200?text=Clásica" alt="" />
              <ion-icon name="add-outline"></ion-icon>
            </div>
          </div>

          <div className="Producto">
            <div className="informacion">
              <h2>Hamburguesa BBQ</h2>
              <p>Carne a la parrilla con salsa BBQ y cebolla caramelizada.</p>
              <p>Precio: $12.00</p>
            </div>
            <div className="imagen-prod">
              <img src="https://placehold.co/250x200?text=BBQ" alt="" />
              <ion-icon name="add-outline"></ion-icon>
            </div>
          </div>

          <div className="Producto">
            <div className="informacion">
              <h2>Hamburguesa Doble</h2>
              <p>Doble carne, queso cheddar, tocineta y salsas de la casa.</p>
              <p>Precio: $15.00</p>
            </div>
            <div className="imagen-prod">
              <img src="https://placehold.co/250x200?text=Doble" alt="" />
              <ion-icon name="add-outline"></ion-icon>
            </div>
          </div>
          {/* Fin Categoria 1 */}
          {/* Categoría 2 */}
          <div className="Productos">
            <h1 className="Titulo-de-categoria">Bebidas</h1>
            <div className="Lista">
              <div className="Producto">
                <div className="informacion">
                  <h2>Gaseosa</h2>
                  <p>
                    Refrescante bebida carbonatada disponible en varios sabores.
                  </p>
                  <p>Precio: $4.00</p>
                </div>
                <div className="imagen-prod">
                  <img
                    src="https://placehold.co/250x200?text=Gaseosa"
                    alt="Gaseosa"
                  />
                  <ion-icon name="add-outline"></ion-icon>
                </div>
              </div>

              <div className="Producto">
                <div className="informacion">
                  <h2>Jugo Natural</h2>
                  <p>
                    Jugo 100% natural preparado al momento, con frutas frescas.
                  </p>
                  <p>Precio: $5.50</p>
                </div>
                <div className="imagen-prod">
                  <img
                    src="https://placehold.co/250x200?text=Jugo+Natural"
                    alt="Jugo Natural"
                  />
                  <ion-icon name="add-outline"></ion-icon>
                </div>
              </div>

              <div className="Producto">
                <div className="informacion">
                  <h2>Agua Mineral</h2>
                  <p>
                    Agua pura y ligera, perfecta para acompañar tus comidas.
                  </p>
                  <p>Precio: $3.00</p>
                </div>
                <div className="imagen-prod">
                  <img
                    src="https://placehold.co/250x200?text=Agua+Mineral"
                    alt="Agua Mineral"
                  />
                  <ion-icon name="add-outline"></ion-icon>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carta;
