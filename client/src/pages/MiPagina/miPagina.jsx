import React, { useState, useEffect } from "react";
import "../../assets/css/miPagina.css";


const MiPagina = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderImages = [
    { id: 1, src: "https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Oferta+Especial+1", alt: "Oferta 1" },
    { id: 2, src: "https://via.placeholder.com/800x400/7C3AED/FFFFFF?text=Nuevos+Productos", alt: "Oferta 2" },
    { id: 3, src: "https://via.placeholder.com/800x400/EF4444/FFFFFF?text=Descuentos+Increíbles", alt: "Oferta 3" },
    { id: 4, src: "https://via.placeholder.com/800x400/10B981/FFFFFF?text=Productos+Premium", alt: "Oferta 4" },
  ];

  const topProducts = [
    { id: 1, name: "Producto Premium 1", price: "$125.000", image: "https://via.placeholder.com/250x200/6366F1/FFFFFF?text=Producto+1" },
    { id: 2, name: "Producto Estrella 2", price: "$89.900", image: "https://via.placeholder.com/250x200/8B5CF6/FFFFFF?text=Producto+2" },
    { id: 3, name: "Producto Popular 3", price: "$156.000", image: "https://via.placeholder.com/250x200/F59E0B/FFFFFF?text=Producto+3" },
    { id: 4, name: "Producto Favorito 4", price: "$78.500", image: "https://via.placeholder.com/250x200/EF4444/FFFFFF?text=Producto+4" },
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
            <a href="#">Inicio</a>
            <a href="#">Productos o Carta</a>
            <a href="#">Sobre Nosotros</a>
            <a href="#">Contáctanos</a>
          </div>
          <div className="nav-buttons">
            <button><ion-icon name="cart-outline"></ion-icon></button>
            <button><ion-icon name="log-in-outline"></ion-icon></button>
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
              <li><a href="#">Sobre Nosotros</a></li>
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
