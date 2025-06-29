import React, { useRef, useEffect } from "react";
import "./About.scss";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";

const About = () => {
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
            <h1 className="fade-in">Sobre Nosotros</h1>
            <p className="fade-in delay-1">
              Descubre nuestra pasión por la artesanía y el diseño único
            </p>
          </section>

          <section className="mission-section">
            <div className="mission-content">
              <h2 className="slide-up">Nuestra Misión</h2>
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
            <h2 className="fade-in">Nuestro Equipo</h2>
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
        </div>
      </main>
      <Footer />
    </>
  );
};

export default About;
