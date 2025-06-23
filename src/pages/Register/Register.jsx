import "./Register.scss";
import { Link } from 'react-router-dom';
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import cofee from "../../assets/cofee.png";  

function Register() {
  return (
    <>
      <Header />
      <main>
        <section className="register-section">
          <div className="register-form-container">
            <h2>Registrarse</h2>
            <form>
              <label htmlFor="name">Nombre:</label>
              <input type="text" id="name" name="name" required />
              
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />

              <label htmlFor="password">Contraseña:</label>
              <input type="password" id="password" name="password" required />

              <button type="submit">Registrarse</button>
            </form>
          </div>
          <div className="register-image-container">
            <img src={cofee} alt="cofee" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Register;
