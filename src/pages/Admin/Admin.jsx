import { useState, useEffect } from "react";
import "./Admin.scss";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";

const categorias = ["Cafés", "Panes", "Quesos", "Helados"];


function Admin() {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    imagen: null,
    categoria: categorias[0],
  });
  const [showForm, setShowForm] = useState(false);

  // Cargar productos al iniciar
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/catalogo/productos/");
        if (response.ok) {
          const data = await response.json();
          setProductos(data);
        }
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProductos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setNuevoProducto((prev) => ({ ...prev, imagen: e.target.files[0] }));
  };

  const agregarProducto = async () => {
    if (!nuevoProducto.nombre || !nuevoProducto.precio) return;

    const formData = new FormData();
    formData.append("nombre", nuevoProducto.nombre);
    formData.append("precio", nuevoProducto.precio);
    formData.append("descripcion", nuevoProducto.descripcion);
    formData.append("categoria", nuevoProducto.categoria);
    if (nuevoProducto.imagen) {
      formData.append("imagen", nuevoProducto.imagen);
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8000/api/catalogo/productos/", {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setProductos((prev) => [...prev, data]);
        setNuevoProducto({
          nombre: "",
          precio: "",
          descripcion: "",
          imagen: null,
          categoria: categorias[0],
        });
        setShowForm(false);
      } else {
        const err = await response.json();
        console.error("❌ Error al crear producto:", err);
      }
    } catch (error) {
      console.error("🚨 Error de red:", error);
    }
  };

  const eliminarProducto = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:8000/api/catalogo/productos/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (response.ok) {
        setProductos((prev) => prev.filter((p) => p.id !== id));
      } else {
        console.error("❌ Error al eliminar producto");
      }
    } catch (error) {
      console.error("🚨 Error de red al eliminar:", error);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
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
                <label htmlFor="imagen">Imagen:</label>
                <input
                  type="file"
                  id="imagen"
                  name="imagen"
                  accept="image/*"
                  onChange={handleFileChange}
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

