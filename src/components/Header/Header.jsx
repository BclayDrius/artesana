import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'; // 👈 Asegúrate que existe
import "./Header.module.scss";

function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <header>
        <div>
          <h1><Link to="/">El Hada Artesana</Link></h1>
          <nav>
            <ul>
              <li><Link to="/Catalog/">Ver menú</Link></li>

              {!user ? (
                <>
                  <li><Link to="/Login/">Iniciar Sesión</Link></li>
                  <li><Link to="/Register/">Registrarse</Link></li>
                </>
              ) : (
                <>
                  <li><span>Hola, {user.first_name || user.username}</span></li>
                  <li><button onClick={logout} style={{
                    background: 'none',
                    border: 'none',
                    color: '#c00',
                    cursor: 'pointer'
                  }}>Cerrar sesión</button></li>
                </>
              )}
            </ul>
          </nav>
        </div>
        <hr className="header-divider" />
      </header>
    </>
  );
}

export default Header;
