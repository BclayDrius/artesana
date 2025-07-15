import "./Catalog.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";

const categories = ["Cafés", "Panes", "Quesos", "Helados"];

function Catalog() {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartId, setCartId] = useState(null);

  // Obtener el carrito actual (o crearlo si no existe)
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(
          "http://127.0.0.1:8000/api/ordenes/carritos/mi-carrito/",
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );
        setCartId(res.data.id);
        console.log("🛒 Carrito cargado con ID:", res.data.id);
      } catch (err) {
        console.error(
          "❌ Error al obtener el carrito:",
          err.response?.data || err.message
        );
      }
    };
    fetchCart();
  }, []);

  // Obtener productos por categoría
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = "http://127.0.0.1:8000/api/catalogo/productos/";
        if (selectedCategory) {
          url += `?categoria=${encodeURIComponent(selectedCategory)}`;
        }
        const response = await axios.get(url);
        // --- Producto de ejemplo ---
        const demoProduct = {
          id: "demo-1",
          nombre: "Producto de Ejemplo",
          descripcion: "Este es un producto de ejemplo para pruebas.",
          precio: 9.99,
          imagen: "", // Puedes poner una URL de imagen si quieres
        };
        setProducts([demoProduct, ...response.data]);
      } catch (error) {
        console.error(
          "❌ Error al cargar productos:",
          error.response?.data || error.message
        );
        // Si hay error, igual muestra el producto de ejemplo
        setProducts([
          {
            id: "demo-1",
            nombre: "Producto de Ejemplo",
            descripcion: "Este es un producto de ejemplo para pruebas.",
            precio: 9.99,
            imagen: "",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory]);

  const handleCategoryClick = (categoria) => {
    setSelectedCategory(categoria);
    setMenuOpen(false);
  };

  const updateQuantity = (productId, delta) => {
    setQuantities((prev) => {
      const current = prev[productId] || 0;
      const updated = Math.max(0, Math.min(25, current + delta));
      return { ...prev, [productId]: updated };
    });
  };

  const handleAddToCart = async (productId) => {
    const quantity = quantities[productId] || 0;
    if (quantity > 0 && cartId) {
      try {
        const url = `http://127.0.0.1:8000/api/ordenes/carritos/${cartId}/agregar_item/`;
        const res = await axios.post(
          url,
          {
            producto: productId,
            cantidad: quantity,
          },
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("✅ Producto agregado al carrito:", res.data);

        // Mostrar notificación
        alert("Producto agregado al carrito");

        // Reset cantidad
        setQuantities((prev) => ({
          ...prev,
          [productId]: 0,
        }));
      } catch (error) {
        console.error(
          "❌ Error al agregar al carrito:",
          error.response?.data || error.message
        );
        alert("Error al agregar al carrito");
      }
    } else {
      console.warn("⚠️ Cantidad inválida o carrito no cargado");
    }
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

        {/* Overlay móvil */}
        {menuOpen && (
          <div
            className="catalog-menu-overlay"
            onClick={() => setMenuOpen(false)}
            aria-label="Cerrar menú"
          />
        )}

        {/* Productos */}
        {loading ? (
          <p style={{ padding: "1rem" }}>Cargando productos...</p>
        ) : products.length === 0 ? (
          <p style={{ padding: "1rem" }}>No hay productos disponibles.</p>
        ) : (
          <section className="catalog-grid">
            {products.map((prod) => (
              <div className="catalog-item" key={prod.id}>
                {prod.imagen ? (
                  <img
                    src={prod.imagen}
                    alt={prod.nombre}
                    className="catalog-img"
                  />
                ) : (
                  <div className="catalog-img-placeholder" />
                )}
                <div className="catalog-info">
                  <h3>
                    {prod.nombre}
                    <span className="catalog-price">S/ {prod.precio}</span>
                  </h3>
                  <p>{prod.descripcion}</p>
                </div>

                {/* Controles de cantidad */}
                <div className="catalog-controls">
                  <div className="catalog-quantity">
                    <button onClick={() => updateQuantity(prod.id, -1)}>
                      -
                    </button>
                    <span>{quantities[prod.id] || 0}</span>
                    <button onClick={() => updateQuantity(prod.id, 1)}>
                      +
                    </button>
                  </div>
                  <button
                    className="catalog-add-button"
                    onClick={() => handleAddToCart(prod.id)}
                  >
                    Agregar
                  </button>
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
