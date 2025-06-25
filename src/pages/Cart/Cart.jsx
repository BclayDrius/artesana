import "./Cart.scss";
import { Link } from 'react-router-dom';
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import cofee from "../../assets/cofee.png";  

function Cart() {
  return (
    <>
      <Header />
      <main>
        <section>
          <p>carrito</p>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Cart;
