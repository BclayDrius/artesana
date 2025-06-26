import "./Cart.scss";
import { Link } from 'react-router-dom';
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";


const cartProducts = [
  {
    name: "Espresso",
    desc: "Shot de 30 ml de café",
    price: 9,
    img: "/assets/ProductIcons/expreso.webp",
    quantity: 1,
  },
  {
    name: "Espresso doble",
    desc: "Doble shot en 60 ml de café",
    price: 9,
    img: "/assets/ProductIcons/expreso.webp",
    quantity: 1,
  },
];

function Cart() {
  const total = cartProducts.reduce((acc, prod) => acc + prod.price * prod.quantity, 0);

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
          {cartProducts.map((prod, idx) => (
            <div className="cart-row" key={idx}>
              <button className="cart-remove-btn" aria-label="Eliminar producto">✖</button>
              <div className="cart-img-col">
                <div className="cart-img-circle">
                  <img src={prod.img} alt={prod.name} />
                </div>
              </div>
              <div className="cart-desc-col">
                <span className="cart-prod-name">{prod.name}</span>
                <span className="cart-prod-price"> • S/{prod.price} - </span>
                <span className="cart-prod-desc">{prod.desc}</span>
              </div>
              <div className="cart-price-col">S/{prod.price}</div>
              <div className="cart-qty-col">{prod.quantity}</div>
              <div className="cart-subtotal-col">S/{prod.price * prod.quantity}</div>
            </div>
          ))}
        </div>
        <div className="cart-bottom-row">
          <Link to="/Catalog/" className="cart-back-btn">Seguir comprando</Link>
          <div className="cart-total-box">
            <div className="cart-total-label">Total:</div>
            <div className="cart-total-value">S/{total}</div>
            <button className="cart-order-btn">Realizar pedido</button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Cart;