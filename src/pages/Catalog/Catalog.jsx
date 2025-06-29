import "./Catalog.scss";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";

const categories = [
  "Café",
  "Endulzantes",
  "Salados",
  "Bebidas",
  "Pan o Wrap",
  "Hamburguesas",
  "Al Plato",
  "Desayunos",
];

function Catalog() {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Simulación de fetch
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setProducts([
        // ...pon aquí tus productos de prueba...
      ]);
      setLoading(false);
    }, 800);
  }, [selectedCategory]);

  const handleCategoryClick = (categoria) => {
    setSelectedCategory(categoria);
    // fetchProducts(categoria); // Si tienes fetch real, descomenta esto
    setMenuOpen(false); // Cierra el menú al seleccionar
  };

  return (
    <>
      <Header />
      <main className={`catalog-main${menuOpen ? " menu-open" : ""}`}>
        {/* Botón hamburguesa */}
        <button
          className="catalog-menu-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Abrir menú de categorías"
        >
          ☰ Categorías
        </button>

        {/* Menú lateral */}
        <nav className={`catalog-nav${menuOpen ? " open" : ""}`}>
          <h2>Categorías:</h2>
          <ul>
            <li
              onClick={() => handleCategoryClick(null)}
              className={selectedCategory === null ? "active" : ""}
            >
              Todas
            </li>
            {categories.map((cat) => (
              <li
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={selectedCategory === cat ? "active" : ""}
              >
                {cat}
              </li>
            ))}
          </ul>
        </nav>

        {/* Overlay para cerrar el menú tocando fuera */}
        {menuOpen && (
          <div
            className="catalog-menu-overlay"
            onClick={() => setMenuOpen(false)}
            aria-label="Cerrar menú"
          />
        )}

        {loading ? (
          <p style={{ padding: "1rem" }}>Cargando productos...</p>
        ) : (
          <section className="catalog-grid">
            {products.map((prod) => (
              <div className="catalog-item" key={prod.id}>
                {/* ...tu contenido de producto aquí... */}
                <div className="catalog-img-placeholder" />
                <div className="catalog-info">
                  <h3>
                    {prod.nombre}
                    <span className="catalog-price">{prod.precio}</span>
                  </h3>
                  <p>{prod.desc}</p>
                </div>
              </div>
            ))}
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

export default Catalog;
