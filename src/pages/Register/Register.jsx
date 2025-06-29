// src/pages/Register/Register.jsx
import "./Register.scss";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import cofee from "../../assets/cofee.png";

function Register() {
  const [formData, setFormData] = useState({
    name: '',
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
      const response = await fetch('/api/accounts/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.email,
          email: formData.email,
          password: formData.password,
          first_name: formData.name,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('✅ Registro exitoso. Ahora inicia sesión.');
        setTimeout(() => navigate('/Login'), 2000); // opcional: redirige al login
      } else {
        setMessage(`❌ Error: ${JSON.stringify(data)}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('❌ Error de red');
    }
  };

  return (
    <>
      <Header />
      <main>
        <section className="register-section">
          <div className="register-form-container">
            <h2>Registrarse</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Nombre:</label>
              <input type="text" id="name" name="name" required onChange={handleChange} />

              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required onChange={handleChange} />

              <label htmlFor="password">Contraseña:</label>
              <input type="password" id="password" name="password" required onChange={handleChange} />

              <button type="submit" className="login-register-a">Registrarse</button>
            </form>

            {message && <p>{message}</p>}
            <p>¿Ya tienes una cuenta? <Link to="/Login" className="login-register-a">Inicia sesión</Link></p>
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
