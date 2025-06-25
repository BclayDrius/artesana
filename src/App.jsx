import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Catalog from "./pages/Catalog/Catalog.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import Cart from "./pages/Cart/Cart.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Catalog" element={<Catalog />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Cart" element={<Cart />} />

    </Routes>
  );
}

export default App;
