import { useState } from "react";
import "./Admin.scss";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";

const categorias = [
  "Café",
  "Endulzantes",
  "Salados",
  "Bebidas",
  "Pan o Wrap",
  "Hamburguesas",
  "Al Plato",
  "Desayunos",
];

function Admin() {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    imagen: "",
    categoria: categorias[0],
  });
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto((prev) => ({ ...prev, [name]: value }));
  };

  const agregarProducto = () => {
    if (!nuevoProducto.nombre || !nuevoProducto.precio) return;
    setProductos((prev) => [...prev, { ...nuevoProducto, id: Date.now() }]);
    setNuevoProducto({
      nombre: "",
      precio: "",
      descripcion: "",
      imagen: "",
      categoria: categorias[0],
    });
    setShowForm(false);
  };

  const eliminarProducto = (id) => {
    setProductos((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const editarProducto = (id, campo, valor) => {
    setProductos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [campo]: valor } : p))
    );
  };

  return (
    <div className="admin-container">
      <Header />
      <main className="admin-main">
        <div className="admin-content">
          <h1>Panel de Administración</h1>

          <div className="admin-actions">
            <button className="admin-button" onClick={toggleForm}>
              {showForm ? "Cancelar" : "Agregar Producto"}
            </button>
          </div>

          {showForm && (
            <div className="product-form">
              <h2>Agregar Nuevo Producto</h2>
              <div className="form-group">
                <label htmlFor="nombre">Nombre:</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={nuevoProducto.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="precio">Precio:</label>
                <input
                  type="number"
                  id="precio"
                  name="precio"
                  value={nuevoProducto.precio}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="descripcion">Descripción:</label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={nuevoProducto.descripcion}
                  onChange={handleChange}
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label htmlFor="imagen">Imagen URL:</label>
                <input
                  type="url"
                  id="imagen"
                  name="imagen"
                  value={nuevoProducto.imagen}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="categoria">Categoría:</label>
                <select
                  id="categoria"
                  name="categoria"
                  value={nuevoProducto.categoria}
                  onChange={handleChange}
                >
                  {categorias.map((categoria, index) => (
                    <option key={index} value={categoria}>
                      {categoria}
                    </option>
                  ))}
                </select>
              </div>
              <button className="submit-button" onClick={agregarProducto}>
                Agregar Producto
              </button>
            </div>
          )}

          <div className="products-list">
            <h2>Productos</h2>
            <div className="products-grid">
              {productos.map((producto) => (
                <div key={producto.id} className="product-card">
                  <div className="product-image">
                    {producto.imagen && (
                      <img src={producto.imagen} alt={producto.nombre} />
                    )}
                  </div>
                  <div className="product-info">
                    <h3>{producto.nombre}</h3>
                    <p className="price">${producto.precio}</p>
                    <p className="category">{producto.categoria}</p>
                    <p className="description">{producto.descripcion}</p>
                    <button
                      className="delete-button"
                      onClick={() => eliminarProducto(producto.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Admin;
