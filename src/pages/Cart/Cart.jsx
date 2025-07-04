import "./Cart.scss";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

function Cart() {
  const [carrito, setCarrito] = useState(null);
  const [loading, setLoading] = useState(true);
  const [puntoEntrega, setPuntoEntrega] = useState("punto1");
  const token = localStorage.getItem("token");

  const fetchCarrito = () => {
    if (!token) {
      setLoading(false);
      return;
    }

    setLoading(true);
    axios
      .get(`http://localhost:8000/api/ordenes/carritos/mi-carrito/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        setCarrito(res.data);
        localStorage.setItem("carritoId", res.data.id);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar el carrito:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCarrito();
  }, [token]);

  const updateCantidad = (productoId, nuevaCantidad) => {
    const carritoId = carrito?.id;
    if (!carritoId || nuevaCantidad < 1 || !Number.isInteger(nuevaCantidad))
      return;

    axios
      .post(
        `http://localhost:8000/api/ordenes/carritos/${carritoId}/agregar_item/`,
        {
          producto: productoId,
          cantidad: nuevaCantidad,
        },
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      .then(() => {
        setCarrito((prev) => ({
          ...prev,
          items: prev.items.map((item) =>
            item.producto.id === productoId
              ? { ...item, cantidad: nuevaCantidad }
              : item
          ),
        }));
      })
      .catch((err) => {
        console.error("Error al actualizar cantidad:", err);
        alert("Error al actualizar cantidad.");
      });
  };

  const handleRemoveItem = (productoId) => {
    const carritoId = carrito?.id;
    if (!carritoId) return;

    axios
      .post(
        `http://localhost:8000/api/ordenes/carritos/${carritoId}/eliminar_item/`,
        { producto: productoId },
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      .then(() => {
        setCarrito((prev) => ({
          ...prev,
          items: prev.items.filter((item) => item.producto.id !== productoId),
        }));
      })
      .catch((err) => {
        console.error("Error al eliminar el producto:", err);
        alert("Error al eliminar el producto del carrito.");
      });
  };

  if (loading) return <p>Cargando carrito...</p>;

  if (!carrito || !carrito.items.length) {
    return (
      <>
        <Header />
        <main className="cart-main">
          <h2 className="cart-title">Tu carrito está vacío.</h2>
          <Link to="/Catalog/" className="cart-back-btn">
            Seguir comprando
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const total = carrito.items.reduce(
    (acc, item) => acc + item.producto.precio * item.cantidad,
    0
  );

  return (
    <>
      <Header />
      <main className="cart-main">
        <h2 className="cart-title">Carrito</h2>
        <div className="cart-table">
          <div className="cart-header-row">
            <div></div>
            <div className="cart-header">Producto</div>
            <div className="cart-header">Precio</div>
            <div className="cart-header">Cantidad</div>
            <div className="cart-header">Subtotal</div>
          </div>

          {carrito.items.map((item, idx) => (
            <div className="cart-row" key={idx}>
              <button
                type="button"
                className="cart-remove-btn"
                onClick={() => handleRemoveItem(item.producto.id)}
              >
                ✖
              </button>

              <div className="cart-img-col">
                <div className="cart-img-circle">
                  <img
                    src={item.producto.imagen || "/assets/placeholder.png"}
                    alt={item.producto.nombre}
                  />
                </div>
              </div>

              <div className="cart-desc-col">
                <span className="cart-prod-name">{item.producto.nombre}</span>
                <span className="cart-prod-price">
                  {" "}
                  • S/{item.producto.precio} -{" "}
                </span>
                <span className="cart-prod-desc">
                  {item.producto.descripcion}
                </span>
              </div>

              <div className="cart-price-col">S/{item.producto.precio}</div>

              <div className="cart-qty-col">
                <button
                  type="button"
                  onClick={() =>
                    updateCantidad(item.producto.id, item.cantidad - 1)
                  }
                  disabled={item.cantidad <= 1}
                >
                  −
                </button>
                <span>{item.cantidad}</span>
                <button
                  type="button"
                  onClick={() =>
                    updateCantidad(item.producto.id, item.cantidad + 1)
                  }
                >
                  +
                </button>
              </div>

              <div className="cart-subtotal-col">
                S/{(item.producto.precio * item.cantidad).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* Punto de entrega */}
        <div className="cart-punto-entrega-box">
          <div className="cart-punto-entrega-title">Punto de entrega</div>
          <div className="cart-punto-entrega-selectores">
            <label>
              <input
                type="radio"
                name="punto-entrega"
                value="punto1"
                checked={puntoEntrega === "punto1"}
                onChange={() => setPuntoEntrega("punto1")}
              />
              Punto 1
            </label>
            <label>
              <input
                type="radio"
                name="punto-entrega"
                value="punto2"
                checked={puntoEntrega === "punto2"}
                onChange={() => setPuntoEntrega("punto2")}
              />
              Punto 2
            </label>
          </div>
        </div>

        <div className="cart-bottom-row">
          <Link to="/Catalog/" className="cart-back-btn">
            Seguir comprando
          </Link>
          <div className="cart-total-box">
            <div className="cart-total-label">Total:</div>
            <div className="cart-total-value">S/{total.toFixed(2)}</div>
            <button type="button" className="cart-order-btn">
              Realizar pedido
            </button>
            <button
              type="button"
              className="cart-whatsapp-btn"
              style={{ marginTop: "10px" }}
            >
              Enviar mensaje por WhatsApp
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Cart;
