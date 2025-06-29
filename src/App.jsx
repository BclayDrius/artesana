import { Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import Loader from "./components/Loader/Loader.jsx";
import "./styles/style.scss";

const Home = lazy(() => import("./pages/Home/Home.jsx"));
const Catalog = lazy(() => import("./pages/Catalog/Catalog.jsx"));
const Login = lazy(() => import("./pages/Login/Login.jsx"));
const Register = lazy(() => import("./pages/Register/Register.jsx"));
const Cart = lazy(() => import("./pages/Cart/Cart.jsx"));
const Admin = lazy(() => import("./pages/Admin/Admin.jsx"));
const About = lazy(() => import("./pages/About/About.jsx"));

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    setLoading(true);
    setFadeOut(false);
    const timeout = setTimeout(() => setFadeOut(true), 1000); // 1s de carga
    const removeTimeout = setTimeout(() => setLoading(false), 1500); // 1s carga + 0.5s fade
    return () => {
      clearTimeout(timeout);
      clearTimeout(removeTimeout);
    };
  }, [location.pathname]);

  return (
    <>
      {loading && <Loader fadeOut={fadeOut} />}
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Catalog" element={<Catalog />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/About" element={<About />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
