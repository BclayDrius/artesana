import "./Login.scss";
import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import cofee from "../../assets/cofee.png";
import { AuthContext } from "../../context/AuthContext";

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:8000/api/accounts/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: formData.email, // Django espera username
        password: formData.password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      console.log('🎟️ Token recibido:', data.token);
      localStorage.setItem('token', data.token);

      // Obtener los datos del usuario
      const userRes = await fetch('http://localhost:8000/api/accounts/me/', {
        headers: {
          Authorization: `Token ${data.token}`,
        },
      });

      if (userRes.ok) {
        const userData = await userRes.json();
        setUser(userData); // Guardamos el usuario en contexto
      }

      alert("Inicio de sesión exitoso ✅");
      navigate("/"); // ⬅️ Redirige al home
    } else {
      console.error('❌ Error en login:', data);
      alert("Credenciales inválidas");
    }
  };

  return (
    <>
      <Header />
      <main>
        <section className="login-section">
          <div className="login-form-container">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={loginUser}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <label htmlFor="password">Contraseña:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button type="submit">Iniciar Sesión</button>
            </form>
            <p>¿No tienes cuenta? <Link to="/register">Regístrate</Link></p>
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
