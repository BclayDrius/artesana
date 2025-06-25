import "./Catalog.scss";
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

const products = [
  { name: "Espresso", desc: "Shot de 30 ml de café", price: "S/9", img: "../../assets/ProductIcons/expreso.webp" },
  { name: "Espresso doble", desc: "Doble shot en 60 ml de café", price: "S/11", img: "../../assets/ProductIcons/espresso-doble.webp" },
  { name: "Lungo", desc: "Shot de espresso en 90 ml", price: "S/9", img: "../../assets/ProductIcons/lungo.webp" },
  { name: "Americano", desc: "Shot de espresso y agua en 150 ml - 300 ml", price: "S/8 - S/11", img: "../../assets/ProductIcons/americano.webp" },
  { name: "Cortado", desc: "Espresso doble y leche espumada en 90 ml", price: "S/10.50", img: "../../assets/ProductIcons/cortado.webp" },
  { name: "spungei", desc: "Espresso doble y leche espumada en 90 ml", price: "S/10.50", img: "../../assets/ProductIcons/cortado.webp" },
  // Agrega más productos aquí, cada uno con su propiedad img
];

function Catalog() {
  return (
    <>
      <Header />
      <main className="catalog-main">
        <nav className="catalog-nav">
          <h2>Categorías:</h2>
          <ul>
            {categories.map((cat) => (
              <li key={cat}>{cat}</li>
            ))}
          </ul>
        </nav>
        <section className="catalog-grid">
          {products.map((prod, idx) => (
            <div className="catalog-item" key={idx}>
              {prod.img ? (
                <img className="catalog-img-placeholder" src={prod.img} alt={prod.name} />
              ) : (
                <div className="catalog-img-placeholder" />
              )}
              <div className="catalog-info">
                <h3>{prod.name} <span className="catalog-price">{prod.price}</span></h3>
                <p>{prod.desc}</p>
              </div>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Catalog;