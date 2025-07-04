import "./Home.scss";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import cofee from "../../assets/cofee.png";
import espressoImg from "/assets/ProductIcons/expreso.webp";
import cafe1 from "/assets/ProductIcons/cafe1.png";
import cafe2 from "/assets/ProductIcons/cafe2.png";
import croissant from "/assets/ProductIcons/croissant.png";
import { useRef, useState, useEffect } from "react";

const destacados = [
  {
    nombre: "Espresso",
    img: cofee,
    desc: "Shot intenso de café",
    precio: "S/9",
  },
  {
    nombre: "Cappuccino",
    img: cofee,
    desc: "Espuma y arte latte",
    precio: "S/12",
  },
  {
    nombre: "Croissant",
    img: cofee,
    desc: "Pan artesanal recién horneado",
    precio: "S/7",
  },
  {
    nombre: "Wrap Veggie",
    img: cofee,
    desc: "Fresco y saludable",
    precio: "S/14",
  },
];

const reseñas = [
  {
    autor: "Ana",
    texto: "¡El mejor lugar para disfrutar en San Bartolo!",
    honor: "Mención destacada",
  },
  {
    autor: "Ana",
    texto: "¡El mejor café de la zona y la atención es increíble!",
  },
  { autor: "Luis", texto: "El pan artesanal es delicioso, siempre fresco." },
  { autor: "María", texto: "Ambiente acogedor y productos de calidad." },
];

function Home() {
  const [showContent, setShowContent] = useState(false);
  const heroRef = useRef(null);

  // Escucha scroll y muestra/oculta el hero según la posición
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 100) {
        setShowContent(true);
      } else {
        setShowContent(false);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Animación al hacer click en la flecha
  const handleArrowClick = () => {
    setShowContent(true);
    setTimeout(() => {
      window.scrollTo({
        top: heroRef.current.offsetHeight,
        behavior: "smooth",
      });
    }, 400);
  };

  const carouselItems = [
    {
      img: espressoImg,
      title: "Espresso",
      desc: "El clásico shot de café intenso.",
      interval: 2000,
    },
    {
      img: cafe1,
      title: "Cappuccino",
      desc: "Espuma cremosa y arte latte.",
      interval: 3000,
    },
    {
      img: croissant,
      title: "Croissant",
      desc: "Pan artesanal recién horneado.",
      interval: 2500,
    },
  ];

  return (
    <>
      <Header />
      <main>
        <section
          className={`hero${showContent ? " hero-hide" : ""}`}
          ref={heroRef}
        >
          <div className="hero-content">
            <img src={cofee} alt="cofee" />
            <div className="hero-text">
              <h1>
                ¡Bienvenido a la cafetería
                <br />
                EL HADA ARTESANA!
              </h1>
              <div className="hero-links">
                <Link to="../Menu/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-cup-hot"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M.5 6a.5.5 0 0 0-.488.608l1.652 7.434A2.5 2.5 0 0 0 4.104 16h5.792a2.5 2.5 0 0 0 2.44-1.958l.131-.59a3 3 0 0 0 1.3-5.854l.221-.99A.5.5 0 0 0 13.5 6zM13 12.5a2 2 0 0 1-.316-.025l.867-3.898A2.001 2.001 0 0 1 13 12.5M2.64 13.825 1.123 7h11.754l-1.517 6.825A1.5 1.5 0 0 1 9.896 15H4.104a1.5 1.5 0 0 1-1.464-1.175"
                    />
                    <path d="m4.4.8-.003.004-.014.019a4 4 0 0 0-.204.31 2 2 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.6.6 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3 3 0 0 1-.202.388 5 5 0 0 1-.253.382l-.018.025-.005.008-.002.002A.5.5 0 0 1 3.6 4.2l.003-.004.014-.019a4 4 0 0 0 .204-.31 2 2 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.6.6 0 0 0-.09-.252A4 4 0 0 0 3.6 2.8l-.01-.012a5 5 0 0 1-.37-.543A1.53 1.53 0 0 1 3 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a6 6 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 4.4.8m3 0-.003.004-.014.019a4 4 0 0 0-.204.31 2 2 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.6.6 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3 3 0 0 1-.202.388 5 5 0 0 1-.253.382l-.018.025-.005.008-.002.002A.5.5 0 0 1 6.6 4.2l.003-.004.014-.019a4 4 0 0 0 .204-.31 2 2 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.6.6 0 0 0-.09-.252A4 4 0 0 0 6.6 2.8l-.01-.012a5 5 0 0 1-.37-.543A1.53 1.53 0 0 1 6 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a6 6 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 7.4.8m3 0-.003.004-.014.019a4 4 0 0 0-.204.31 2 2 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.6.6 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3 3 0 0 1-.202.388 5 5 0 0 1-.252.382l-.019.025-.005.008-.002.002A.5.5 0 0 1 9.6 4.2l.003-.004.014-.019a4 4 0 0 0 .204-.31 2 2 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.6.6 0 0 0-.09-.252A4 4 0 0 0 9.6 2.8l-.01-.012a5 5 0 0 1-.37-.543A1.53 1.53 0 0 1 9 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a6 6 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 10.4.8" />
                  </svg>
                  Ver menú
                </Link>
                <Link id="about-link" to="../About/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-info-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                  </svg>
                  Sobre nosotros
                </Link>
              </div>
              <p>
                El mejor café de San Bartolo, tostado al tiempo y pan artesanal
                hecho con alma. ☕
              </p>
            </div>
          </div>
          <button
            className="hero-arrow"
            onClick={handleArrowClick}
            aria-label="Ver más"
          >
            <span className="arrow-bar"></span>
          </button>
        </section>

        <section className={`destacados-section${showContent ? " show" : ""}`}>
          <h2 className="destacados-title">Productos destacados</h2>
          <div className="destacados-grid">
            {destacados.map((prod, i) => (
              <div className="destacado-card" key={i}>
                <img src={prod.img} alt={prod.nombre} />
                <div className="destacado-info">
                  <h3>{prod.nombre}</h3>
                  <p>{prod.desc}</p>
                  <span>{prod.precio}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="reseñas-box">
            <h2>Reseñas</h2>
            <div className="reseñas-list">
              {reseñas.map((r, i) => (
                <div className="reseña" key={i}>
                  <p>“{r.texto}”</p>
                  <span>- {r.autor}</span>
                  {r.honor && <span className="honor">{r.honor}</span>}
                </div>
              ))}
            </div>
          </div>
          <div className="more">
            <h2>¿Quieres ver más?</h2>
            <p>
              Somos reconocidos como la mejor cafetería de San Bartolo por
              nuestros clientes.
            </p>
          </div>

          <div
            id="carouselExampleInterval"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              {carouselItems.map((item, idx) => (
                <div
                  className={`carousel-item${idx === 0 ? " active" : ""}`}
                  data-bs-interval={item.interval}
                  key={idx}
                >
                  <img
                    src={item.img}
                    className="d-block w-100"
                    alt={item.title}
                  />
                  <div className="carousel-caption">
                    <h5>{item.title}</h5>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleInterval"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleInterval"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
          <Link to="../Catalog/" className="btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-cup-hot"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M.5 6a.5.5 0 0 0-.488.608l1.652 7.434A2.5 2.5 0 0 0 4.104 16h5.792a2.5 2.5 0 0 0 2.44-1.958l.131-.59a3 3 0 0 0 1.3-5.854l.221-.99A.5.5 0 0 0 13.5 6zM13 12.5a2 2 0 0 1-.316-.025l.867-3.898A2.001 2.001 0 0 1 13 12.5M2.64 13.825 1.123 7h11.754l-1.517 6.825A1.5 1.5 0 0 1 9.896 15H4.104a1.5 1.5 0 0 1-1.464-1.175"
              />
              <path d="m4.4.8-.003.004-.014.019a4 4 0 0 0-.204.31 2 2 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.6.6 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3 3 0 0 1-.202.388 5 5 0 0 1-.253.382l-.018.025-.005.008-.002.002A.5.5 0 0 1 3.6 4.2l.003-.004.014-.019a4 4 0 0 0 .204-.31 2 2 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.6.6 0 0 0-.09-.252A4 4 0 0 0 3.6 2.8l-.01-.012a5 5 0 0 1-.37-.543A1.53 1.53 0 0 1 3 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a6 6 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 4.4.8m3 0-.003.004-.014.019a4 4 0 0 0-.204.31 2 2 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.6.6 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3 3 0 0 1-.202.388 5 5 0 0 1-.253.382l-.018.025-.005.008-.002.002A.5.5 0 0 1 6.6 4.2l.003-.004.014-.019a4 4 0 0 0 .204-.31 2 2 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.6.6 0 0 0-.09-.252A4 4 0 0 0 6.6 2.8l-.01-.012a5 5 0 0 1-.37-.543A1.53 1.53 0 0 1 6 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a6 6 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 7.4.8m3 0-.003.004-.014.019a4 4 0 0 0-.204.31 2 2 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.6.6 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3 3 0 0 1-.202.388 5 5 0 0 1-.252.382l-.019.025-.005.008-.002.002A.5.5 0 0 1 9.6 4.2l.003-.004.014-.019a4 4 0 0 0 .204-.31 2 2 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.6.6 0 0 0-.09-.252A4 4 0 0 0 9.6 2.8l-.01-.012a5 5 0 0 1-.37-.543A1.53 1.53 0 0 1 9 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a6 6 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 10.4.8" />
            </svg>
            Ver menú
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Home;
