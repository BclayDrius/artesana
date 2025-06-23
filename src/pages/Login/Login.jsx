import "./Login.scss";
import { Link } from 'react-router-dom';
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import cofee from "../../assets/cofee.png";  

function Login() {
  return (
    <>
      <Header />
      <main>
        <section className="login-section">
          <div className="login-form-container">
            <h2>Iniciar Sesión</h2>
            <form>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />

              <label htmlFor="password">Contraseña:</label>
              <input type="password" id="password" name="password" required />

              <button type="submit">Iniciar Sesión</button>
            </form>
          </div>
          <div className="login-image-container">
            <img src={cofee} alt="cofee" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Login;
