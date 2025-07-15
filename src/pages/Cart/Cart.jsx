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
  const [usuario, setUsuario] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [telefono, setTelefono] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return setLoading(false);

    axios
      .get(`http://localhost:8000/api/ordenes/carritos/mi-carrito/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        setCarrito(res.data);
        localStorage.setItem("carritoId", res.data.id);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    axios
      .get(`http://localhost:8000/api/accounts/me/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => setUsuario(res.data))
      .catch((err) => console.error("Error al cargar usuario", err));
  }, [token]);

  const updateCantidad = (productoId, nuevaCantidad) => {
    const carritoId = carrito?.id;
    if (!carritoId || nuevaCantidad < 1 || !Number.isInteger(nuevaCantidad)) return;

    axios
      .post(
        `http://localhost:8000/api/ordenes/carritos/${carritoId}/agregar_item/`,
        { producto: productoId, cantidad: nuevaCantidad },
        { headers: { Authorization: `Token ${token}` } }
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
      .catch(() => alert("Error al actualizar cantidad."));
  };

  const handleRemoveItem = (productoId) => {
    const carritoId = carrito?.id;
    if (!carritoId) return;

    axios
      .post(
        `http://localhost:8000/api/ordenes/carritos/${carritoId}/eliminar_item/`,
        { producto: productoId },
        { headers: { Authorization: `Token ${token}` } }
      )
      .then(() => {
        setCarrito((prev) => ({
          ...prev,
          items: prev.items.filter((item) => item.producto.id !== productoId),
        }));
      })
      .catch(() => alert("Error al eliminar el producto."));
  };

  const handleWhatsAppConfirm = () => {
    if (!carrito || !usuario || !nombreCompleto || !telefono) {
      alert("Completa todos los campos antes de continuar.");
      return;
    }

    const total = carrito.items.reduce(
      (acc, item) => acc + item.producto.precio * item.cantidad,
      0
    );

    const mensaje = `
👋 ¡Hola! Soy *${nombreCompleto}* 📞 (${telefono})

🛒 Quiero hacer un pedido con los siguientes productos:
${carrito.items
  .map((item) => `• ${item.producto.nombre} x${item.cantidad}`)
  .join("\n")}

💰 *Total aproximado:* S/${total.toFixed(2)}
📍 *Punto de entrega:* ${
      puntoEntrega === "punto1" ? "San Bartolo" : "Miraflores"
    }
✉️ *Correo:* ${usuario.email || "no especificado"}

✅ Quedo atento/a a la confirmación. ¡Muchas gracias! 🙌
    `.trim();

    const numero = "51988490319";
    const url = `https://api.whatsapp.com/send?phone=${numero}&text=${encodeURIComponent(
      mensaje
    )}`;

    if (window.confirm("¿Deseas confirmar y enviar este pedido por WhatsApp?")) {
      window.location.href = url;
    }
  };

  if (loading) return <p>Cargando carrito...</p>;

  if (!carrito || !carrito.items.length) {
    return (
      <>
        <Header />
        <main className="cart-main">
          <h2 className="cart-title">Tu carrito está vacío.</h2>
          <Link to="/Catalog/" className="cart-back-btn">Seguir comprando</Link>
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
                <span className="cart-prod-price"> • S/{item.producto.precio}</span>
                <span className="cart-prod-desc">{item.producto.descripcion}</span>
              </div>
              <div className="cart-price-col">S/{item.producto.precio}</div>
              <div className="cart-qty-col">
                <button
                  onClick={() => updateCantidad(item.producto.id, item.cantidad - 1)}
                  disabled={item.cantidad <= 1}
                >
                  −
                </button>
                <span>{item.cantidad}</span>
                <button
                  onClick={() => updateCantidad(item.producto.id, item.cantidad + 1)}
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
              San Bartolo
            </label>
            <label>
              <input
                type="radio"
                name="punto-entrega"
                value="punto2"
                checked={puntoEntrega === "punto2"}
                onChange={() => setPuntoEntrega("punto2")}
              />
              Miraflores
            </label>
          </div>

          {/* Mapa */}
          <div className="cart-punto-entrega-mapa">
            <iframe
              src={
                puntoEntrega === "punto1"
                  ? "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.014387381252!2d-76.7771872!3d-12.3921792!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91059f242ac3350d%3A0x8534c4f7151dfa55!2sEl%20Hada%20Artesana%20-%20San%20Bartolo!5e0!3m2!1ses!2spe!4v1746289321683!5m2!1ses!2spe"
                  : "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3900.80991069552!2d-77.02576499999999!3d-12.125155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTLCsDA3JzMwLjYiUyA3N8KwMDEnMzIuOCJX!5e0!3m2!1ses-419!2pe!4v1751603790681!5m2!1ses-419!2pe"
              }
              width="100%"
              height="300"
              style={{ border: 0, borderRadius: "12px", marginTop: "1rem" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa punto de entrega"
            ></iframe>
          </div>
        </div>

        <div className="cart-bottom-row">
          <Link to="/Catalog/" className="cart-back-btn">Seguir comprando</Link>
          <div className="cart-total-box">
            <div className="cart-total-label">Total:</div>
            <div className="cart-total-value">S/{total.toFixed(2)}</div>
            <button
              type="button"
              className="cart-whatsapp-btn"
              onClick={() => setShowModal(true)}
            >
              Enviar mensaje por WhatsApp
            </button>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="cart-modal-overlay">
            <div className="cart-modal">
              <h3>Completa tus datos</h3>
              <input
                type="text"
                placeholder="Nombre completo"
                value={nombreCompleto}
                onChange={(e) => setNombreCompleto(e.target.value)}
              />
              <input
                type="tel"
                placeholder="Número de contacto"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
              <div className="modal-buttons">
                <button onClick={handleWhatsAppConfirm}>Confirmar</button>
                <button onClick={() => setShowModal(false)}>Cancelar</button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

export default Cart;
