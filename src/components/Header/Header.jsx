import { Link } from 'react-router-dom';
import "./Header.scss";

function Header() {
    return (
        <header>
            <nav className="navbar navbar-expand-lg fixed-top custom-navbar">
                <div className="container-fluid custom-navbar-container">
                    <h2 className="navbar-brand custom-logo">
                        <Link to="/">El Hada Artesana</Link>
                    </h2>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon">
                            
                        </span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav align-items-center">
                            <li className="nav-item">
                                <Link className="nav-link" to="/Catalog/">Ver menú</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Login/">Iniciar Sesión</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Register/">Registrarse</Link>
                            </li>
                            <li className="nav-item cart-icon">
                                <Link className="nav-link" to="/Cart/">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                                    </svg>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <hr className="header-divider" />
        </header>
    );
}

export default Header;
