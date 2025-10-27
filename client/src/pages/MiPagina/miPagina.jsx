import React, { useState, useEffect } from "react";
import "../../assets/css/miPagina.css";
import { useNavigate } from "react-router-dom";
const MiPagina = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate()
  const sliderImages = [
    { id: 1, src: "https://placehold.co/800x400?text=Oferta+1", alt: "Oferta 1" },
    { id: 2, src: "https://placehold.co/800x400?text=Oferta+2", alt: "Oferta 2" },
    { id: 3, src: "https://placehold.co/800x400?text=Oferta+3", alt: "Oferta 3" },
    { id: 4, src: "https://placehold.co/800x400?text=Oferta+4", alt: "Oferta 4" },
  ];

  const topProducts = [
    { id: 1, name: "Producto Premium 1", price: "$125.000", image: "https://placehold.co/250x200?text=Producto+1" },
    { id: 2, name: "Producto Estrella 2", price: "$89.900", image: "https://placehold.co/250x200?text=Producto+2" },
    { id: 3, name: "Producto Popular 3", price: "$156.000", image: "https://placehold.co/250x200?text=Producto+3" },
    { id: 4, name: "Producto Favorito 4", price: "$78.500", image: "https://placehold.co/250x200?text=Producto+4" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);

  return (
    <div className="page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="logo">LOGO</div>
          <div className="menu">
            <a href="#" onClick={(e) => { e.preventDefault(); navigate("/miPagina")}} >Inicio</a>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate("/miPagina/carta")}} >Carta</a>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate("/miPagina/contacto")}} >Contáctanos</a>
          </div>
          <div className="nav-buttons">
            <button onClick={(e) => { e.preventDefault(); navigate("/miPagina")}}><ion-icon name="cart-outline"></ion-icon></button>
            <button onClick={(e) => { e.preventDefault(); navigate("/miPagina/Login")}} ><ion-icon name="log-in-outline"></ion-icon></button>
          </div>
        </div>
      </nav>

      {/* Slider */}
      <div className="slider">
        {sliderImages.map((image, index) => (
          <div key={image.id} className={`slide ${index === currentSlide ? "active" : ""}`}>
            <img src={image.src} alt={image.alt} />
          </div>
        ))}
        <button onClick={prevSlide} className="slide-btn left">
          <ion-icon name="chevron-back-outline"></ion-icon>
        </button>
        <button onClick={nextSlide} className="slide-btn right">
          <ion-icon name="chevron-forward-outline"></ion-icon>
        </button>
        <div className="indicators">
          {sliderImages.map((_, index) => (
            <button key={index} onClick={() => setCurrentSlide(index)} className={index === currentSlide ? "active" : ""}></button>
          ))}
        </div>
      </div>

      {/* Productos */}
      <div className="products">
        <h2>Productos Más Comprados</h2>
        <div className="products-grid">
          {topProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <div className="product-info">
                <h3>{product.name}</h3>
                <div className="price-action">
                  <span>{product.price}</span>
                  <button><ion-icon name="add-outline"></ion-icon></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Sobre Nosotros */}
      <div className="about-us">
          <h2>Sobre Nosostros</h2>
          <div className="about-us-container">
              <p>Contenido sobre nuestra empresa, misión, visión y valores.</p>
              <img src="https://placehold.co/400x300" alt="Imagen de la Empresa" />
          </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div>
            <div className="logo">LOGO</div>
            <p>Tu tienda de confianza con los mejores productos y precios increíbles.</p>
          </div>
          <div>
            <h3>Enlaces Rápidos</h3>
            <ul>
              <li><a href="#">Inicio</a></li>
              <li><a href="#">Productos</a></li>
              <li><a href="#">Contacto</a></li>
            </ul>
          </div>
          <div>
            <h3>Contacto</h3>
            <p><ion-icon name="location-outline"></ion-icon> Medellín, Colombia</p>
            <p><ion-icon name="call-outline"></ion-icon> +57 300 123 4567</p>
            <p><ion-icon name="mail-outline"></ion-icon> info@empresa.com</p>
          </div>
          <div>
            <h3>Síguenos</h3>
            <div className="socials">
              <a href="#"><ion-icon name="logo-facebook"></ion-icon></a>
              <a href="#"><ion-icon name="logo-twitter"></ion-icon></a>
              <a href="#"><ion-icon name="logo-instagram"></ion-icon></a>
            </div>
          </div>
        </div>
        <div className="copy">© 2025 Tu Empresa. Todos los derechos reservados.</div>
      </footer>
    </div>
  );
};

export default MiPagina;
