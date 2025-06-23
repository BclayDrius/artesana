import "./Register.scss";
import { Link } from 'react-router-dom';
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import cofee from "../../assets/cofee.png";  
import { useState } from 'react';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:8000/api/accounts/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: formData.email, // puedes cambiar esto si decides tener username aparte
        email: formData.email,
        password: formData.password,
        first_name: formData.name,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      console.log('Token recibido:', data.token);
      localStorage.setItem('token', data.token);
      alert("¡Registro exitoso!");
      // Redireccionar si deseas, por ejemplo:
      // navigate('/dashboard');
    } else {
      console.error('Error en el registro:', data);
      alert("Error al registrarse. Revisa los datos.");
    }
  };

  return (
    <>
      <Header />
      <main>
        <section className="register-section">
          <div className="register-form-container">
            <h2>Registrarse</h2>
            <form onSubmit={registerUser}>
              <label htmlFor="name">Nombre:</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
              />
              
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

              <button type="submit">Registrarse</button>
            </form>
            <p>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link></p>
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
