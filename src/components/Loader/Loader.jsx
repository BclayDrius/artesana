import logo from "../../assets/hada.png"; // Cambia la ruta si tu logo está en otro lugar
import "./Loader.scss";

function Loader({ fadeOut }) {
  return (
    <div className={`loader-overlay${fadeOut ? " fade-out" : ""}`}>
      <img src={logo} alt="Logo" className="loader-logo" />
    </div>
  );
}

export default Loader;
