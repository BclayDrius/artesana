import React, { useRef, useEffect } from "react";
import "./About.scss";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";

const About = () => {
  useEffect(() => {
    document.title = "Sobre Nosotros - El Hada Artesana";
    document
      .querySelector('meta[name="description"]')
      .setAttribute(
        "content",
        "Conoce nuestra historia y pasión por la artesanía. Más de 10 años de experiencia creando piezas únicas con materiales naturales."
      );
    document
      .querySelector('meta[property="og:title"]')
      .setAttribute("content", "Sobre Nosotros - El Hada Artesana");
    document
      .querySelector('meta[property="og:description"]')
      .setAttribute(
        "content",
        "Conoce nuestra historia y pasión por la artesanía. Más de 10 años de experiencia creando piezas únicas con materiales naturales."
      );
  }, []);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-stats");
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  return (
    <>
      <Header />
      <main className="about-main">
        <div className="about-container">
          <section className="hero-section">
            <h1 className="fade-in" id="sobre-nosotros">
              Sobre Nosotros
            </h1>
            <p className="fade-in delay-1">
              Descubre nuestra pasión por la artesanía y el diseño único
            </p>
          </section>

          <section className="mission-section">
            <div className="mission-content">
              <h2 className="slide-up" id="nuestra-mision">
                Nuestra Misión
              </h2>
              <p className="slide-up delay-1">
                En Artesana, nos dedicamos a crear piezas únicas que combinan
                tradición y modernidad. Cada obra es un reflejo de nuestra
                pasión por la artesanía y el diseño contemporáneo.
              </p>
            </div>
          </section>

          <section className="stats-section" ref={statsRef}>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">10+</span>
                <p>Años de experiencia</p>
              </div>
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <p>Piezas únicas</p>
              </div>
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <p>Material natural</p>
              </div>
            </div>
          </section>

          <section className="team-section">
            <h2 className="fade-in" id="nuestro-equipo">
              Nuestro Equipo
            </h2>
            <div className="team-grid">
              <div className="team-member">
                <div className="member-image"></div>
                <h3>María García</h3>
                <p>Diseñadora Principal</p>
              </div>
              <div className="team-member">
                <div className="member-image"></div>
                <h3>Juan Rodríguez</h3>
                <p>Maestro Artesano</p>
              </div>
              <div className="team-member">
                <div className="member-image"></div>
                <h3>Laura Martínez</h3>
                <p>Gerente de Proyectos</p>
              </div>
            </div>
          </section>

          <section className="pickup-section">
            <div className="pickup-content">
              <h2 className="fade-in" id="puntos-de-recojo">
                Puntos de Recojo
              </h2>
              <div className="pickup-info">
                <div className="pickup-description fade-in delay-1">
                  <h3>¿Dónde encontrarnos?</h3>
                  <p>
                    Nuestro punto de recojo principal está ubicado en San
                    Bartolo, un lugar lleno de historia y cultura. El entorno es
                    perfecto para disfrutar de un agradable paseo mientras
                    esperas tu pedido. Cerca puedes encontrar hermosas vistas al
                    mar y una gran variedad de restaurantes tradicionales.
                  </p>
                  <p>
                    Nuestro horario de recojo es de lunes a sábado, de 9:00 a.m.
                    a 6:00 p.m. Siempre puedes contactarnos para coordinar tu
                    recojo con antelación.
                  </p>
                </div>
                <div className="pickup-map fade-in delay-2">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.014387381252!2d-76.7771872!3d-12.3921792!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91059f242ac3350d%3A0x8534c4f7151dfa55!2sEl%20Hada%20Artesana%20-%20San%20Bartolo!5e0!3m2!1ses!2spe!4v1746289321683!5m2!1ses!2spe"
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
              <div className="pickup-info">
                <div className="pickup-description fade-in delay-1">
                 
                </div>
                <div className="pickup-map fade-in delay-2">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3900.80991069552!2d-77.02576499999999!3d-12.125155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTLCsDA3JzMwLjYiUyA3N8KwMDEnMzIuOCJX!5e0!3m2!1ses-419!2spe!4v1751603790681!5m2!1ses-419!2spe"
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default About;
