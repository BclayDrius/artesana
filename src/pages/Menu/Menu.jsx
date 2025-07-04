import "./Menu.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";

function Menu() {
  return (
    <>
      <Header />
      <main className="menu-container">
        <div className="canva-embed">
          <iframe
            src="https://www.canva.com/design/DAGDFKVi7k4/embed"
            allow="fullscreen"
            allowFullScreen="true"
            title="Menu Design"
            width="100%"
            height="100%"
          ></iframe>
        </div>
      </main>
      <Footer />
    </>
  );
}
export default Menu;
