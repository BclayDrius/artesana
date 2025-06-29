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
  };

  const eliminarProducto = (id) => {
    setProductos((prev) => prev.filter((p) => p.id !== id));
  };

  const editarProducto = (id, campo, valor) => {
    setProductos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [campo]: valor } : p))
    );
  };

  return (
    <>
      <Header />
      <main className="admin-main">

        <h1>Panel de Administración</h1>

        <section className="add-product">
          <h2>Agregar producto</h2>
          <input
            type="text"
            placeholder="Nombre"
            name="nombre"
            value={nuevoProducto.nombre}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Precio"
            name="precio"
            value={nuevoProducto.precio}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Descripción"
            name="descripcion"
            value={nuevoProducto.descripcion}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="URL de la imagen"
            name="imagen"
            value={nuevoProducto.imagen}
            onChange={handleChange}
          />
          <select
            name="categoria"
            value={nuevoProducto.categoria}
            onChange={handleChange}
          >
            {categorias.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button onClick={agregarProducto}>Agregar</button>
        </section>

        <section className="admin-listado">
          <h2>Productos</h2>
          {productos.length === 0 && <p>No hay productos aún.</p>}

          {productos.map((producto) => (
            <div className="producto" key={producto.id}>
              <input
                type="text"
                value={producto.nombre}
                onChange={(e) =>
                  editarProducto(producto.id, "nombre", e.target.value)
                }
              />
              <input
                type="number"
                value={producto.precio}
                onChange={(e) =>
                  editarProducto(producto.id, "precio", e.target.value)
                }
              />
              <input
                type="text"
                value={producto.descripcion}
                onChange={(e) =>
                  editarProducto(producto.id, "descripcion", e.target.value)
                }
              />
              <input
                type="text"
                value={producto.imagen}
                onChange={(e) =>
                  editarProducto(producto.id, "imagen", e.target.value)
                }
              />
              <select
                value={producto.categoria}
                onChange={(e) =>
                  editarProducto(producto.id, "categoria", e.target.value)
                }
              >
                {categorias.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <button onClick={() => eliminarProducto(producto.id)}>🗑️</button>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Admin;
