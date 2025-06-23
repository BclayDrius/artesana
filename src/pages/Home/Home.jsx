import "./Home.scss";
import { Link } from 'react-router-dom';
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import cofee from "../../assets/cofee.png";  


function Home(){
  return (
  <>
  <Header />
  <main>
    <section className="hero">
        <div className="hero-content">
            <img src={cofee} alt="cofee" />
            <div className="hero-text">
              <h2>¡Bienvenido a la cafetería<br />EL HADA ARTESANA!</h2>
              <Link to="../Catalog/">Ver menú</Link>
              <p>Disfruta del mágico gusto del sabor.</p>
            </div>
        </div>
    </section>
  </main>
  <Footer />
  </>
  )
}

export default Home;