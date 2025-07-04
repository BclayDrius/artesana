import "./Menu.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";

function Menu() {
  return (
    <>
      <>
        <Header />
        <main className="menu-container">
          <div className="canva-embed">
            <iframe
              className="canva-embed-wrapper"
              loading="lazy"
              src="https://www.canva.com/design/DAGsK8VW_-A/TggSb_DkVBJBHMMeteQoNg/view?embed"
              allowFullScreen
              allow="fullscreen"
              width="900"
              height="1273"
              style={{ border: "none", background: "none" }}
              title="Menú"
            ></iframe>
          </div>
        </main>
        <Footer />
      </>
    </>
  );
}
export default Menu;
