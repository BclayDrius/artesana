import "../../pages/Catalog/Catalog.jsx";
import { Link } from 'react-router-dom';
import "./Header.scss";

function Header() {
    return (
        <>
            <header>
                <div>
                    <h1><Link to="/">El Hada Artesana</Link></h1>
                    <nav>
                        <ul>
                            <li><Link to="/Catalog/">Ver menú</Link></li>
                            <li><Link to="/Login/">Iniciar Sesión</Link></li>
                            <li><Link to="/Register/">Registrarse</Link></li>
                            <li><Link to="/Cart/" className="cart-link">Carrito</Link></li>
                        </ul>
                    </nav>
                </div>
                <hr className="header-divider" />
            </header>

        </>
    );
}

export default Header;
