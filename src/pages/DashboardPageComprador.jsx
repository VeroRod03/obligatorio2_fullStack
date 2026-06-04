import { useState } from "react";
import Sidebar from "../components/dashboard/sidebar/Sidebar.jsx";
import "../../materials/dashboard.css";
import Topbar from "../components/dashboard/topbar/Topbar.jsx";
import PanelGeneralComprador from "../components/dashboard/vistas/PanelGeneralComprador.jsx";
import MisOfertas from "../components/dashboard/vistas/MisOfertas.jsx";
import Perfil from "../components/dashboard/vistas/Perfil.jsx";

const titulosComprador = {
  "panel-general": "Panel General",
  "mis-ofertas": "Mis ofertas",
  "perfil": "Mi perfil",
};

const DashboardPageComprador = () => {
  const [vista, setVista] = useState("panel-general");

  return (
    <div className="dashboard-layout">
      <div className="sidebar-overlay" id="sidebarOverlay" />
      <Sidebar setVista={setVista} vistaActual={vista} />
      <div className="main-content">
        <div className="topbar">
          <Topbar titulo={titulosComprador[vista] || "Panel General"} />
        </div>
        {vista === "panel-general" && <PanelGeneralComprador />}
        {vista === "mis-ofertas" && <MisOfertas />}
        {vista === "perfil" && <Perfil />}
      </div>
    </div>
  );
};

export default DashboardPageComprador;
