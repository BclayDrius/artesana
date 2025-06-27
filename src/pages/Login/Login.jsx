// src/pages/Login/Login.jsx
import "./Login.scss";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import cofee from "../../assets/cofee.png";

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/accounts/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setMessage('✅ Inicio de sesión exitoso');
        navigate('/');
      } else {
        setMessage('❌ Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error de red:', error);
      setMessage('❌ Error de red');
    }
  };

  return (
    <>
      <Header />
      <main>
        <section className="login-section">
          <div className="login-form-container">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required onChange={handleChange} />

              <label htmlFor="password">Contraseña:</label>
              <input type="password" id="password" name="password" required onChange={handleChange} />

              <button type="submit">Iniciar Sesión</button>
            </form>
            {message && <p>{message}</p>}
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
