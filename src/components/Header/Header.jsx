import "../../pages/Catalog/Catalog.jsx";
import { Link } from 'react-router-dom';
import "./Header.module.scss";

function Header() {
    return (
        <>
        <header>
        <h1>El Hada Artesana</h1>
        <nav>
            <ul>
            <li><Link to="./Catalog/">Ver menú</Link></li>
            <li><Link to="./Login/">Iniciar Sesión</Link></li>
            <li><Link to="./Register/">Registrarse</Link></li>
            </ul>
        </nav>
        </header>
        <hr />
        </>
    );
}

export default Header;
