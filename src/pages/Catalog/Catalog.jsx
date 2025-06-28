import "./Catalog.scss";
import { useEffect, useState } from "react";
import axios from "axios";
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

  // 👉 Obtener el ID del carrito actual
  const fetchCarritoId = async () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const res = await axios.get("http://localhost:8000/api/ordenes/carritos/mi-carrito/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return res.data.id;
    } catch (error) {
      console.error("Error al obtener carrito:", error);
      return null;
    }
  };

  // 👉 Agregar producto al carrito
  const agregarAlCarrito = async (carritoId, productoId, cantidad) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await axios.post(
        `http://localhost:8000/api/ordenes/carritos/${carritoId}/agregar_item/`,
        {
          producto: productoId,
          cantidad: cantidad,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      alert("Producto agregado al carrito 🛒");
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
      alert("No se pudo agregar al carrito");
    }
  };

  // 👉 Obtener productos según categoría
  const fetchProducts = async (categoria = null) => {
    setLoading(true);
    const url = categoria
      ? `http://localhost:8000/api/catalogo/productos/?categoria=${encodeURIComponent(categoria)}`
      : "http://localhost:8000/api/catalogo/productos/";

    try {
      const res = await axios.get(url);
      setProducts(res.data);

      const initialQuantities = {};
      res.data.forEach((prod) => {
        initialQuantities[prod.id] = 0;
      });
      setQuantities(initialQuantities);

      setLoading(false);
    } catch (err) {
      console.error("Error al cargar productos:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCategoryClick = (categoria) => {
    setSelectedCategory(categoria);
    fetchProducts(categoria);
  };

  const handleIncrement = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.min(prev[id] + 1, 25),
    }));
  };

  const handleDecrement = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(prev[id] - 1, 0),
    }));
  };

  const handleAddToCart = async (prodId) => {
    const cantidad = quantities[prodId];
    if (cantidad > 0) {
      const carritoId = await fetchCarritoId();
      if (!carritoId) {
        alert("Debes iniciar sesión para usar el carrito.");
        return;
      }

      await agregarAlCarrito(carritoId, prodId, cantidad);
    } else {
      alert("Selecciona al menos una unidad.");
    }
  };

  return (
    <>
      <Header />
      <main className="catalog-main">
        <nav className="catalog-nav">
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

        {loading ? (
          <p style={{ padding: "1rem" }}>Cargando productos...</p>
        ) : (
          <section className="catalog-grid">
            {products.map((prod) => (
              <div className="catalog-item" key={prod.id}>
                {prod.imagen ? (
                  <img
                    className="catalog-img-placeholder"
                    src={
                      prod.imagen.startsWith("http")
                        ? prod.imagen
                        : `http://localhost:8000${prod.imagen}`
                    }
                    alt={prod.nombre}
                  />
                ) : (
                  <div className="catalog-img-placeholder" />
                )}

                <div className="catalog-info">
                  <h3>
                    {prod.nombre}
                    <span className="catalog-price">S/{prod.precio}</span>
                  </h3>
                  <p>{prod.descripcion}</p>

                  <div className="catalog-actions">
                    <button
                      className="catalog-cart-btn"
                      onClick={() => handleAddToCart(prod.id)}
                    >
                      Agregar
                    </button>

                    <div className="catalog-quantity">
                      <button onClick={() => handleDecrement(prod.id)}>-</button>
                      <span>{quantities[prod.id]}</span>
                      <button onClick={() => handleIncrement(prod.id)}>+</button>
                    </div>
                  </div>
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

