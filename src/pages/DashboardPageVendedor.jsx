import { useState } from "react";
import Sidebar from "../components/dashboard/sidebar/Sidebar.jsx";
import "../../materials/dashboard.css";
import Topbar from "../components/dashboard/topbar/Topbar.jsx";
import TopbarNuevaPublicacion from "../components/dashboard/topbar/TopbarNuevaPublicacion.jsx";
import PanelGeneralVendedor from "../components/dashboard/vistas/PanelGeneralVendedor.jsx";
import Publicaciones from "../components/dashboard/vistas/Publicaciones.jsx";
import TiposObra from "../components/dashboard/vistas/TiposObra.jsx";
import ExplorarObras from "../components/dashboard/vistas/ExplorarObras.jsx";
import Perfil from "../components/dashboard/vistas/Perfil.jsx";
import Plan from "../components/dashboard/vistas/Plan.jsx";

const titulosVendedor = {
  "panel-general": "Panel General",
  "publicaciones": "Publicaciones activas",
  "tipos-obra": "Tipos de obra",
  "explorar": "Explorar obras",
  "perfil": "Mi perfil",
  "plan": "Plan y suscripción",
};

const DashboardPageVendedor = () => {
  const [vista, setVista] = useState("panel-general");

  return (
    <div className="dashboard-layout">
      <div className="sidebar-overlay" id="sidebarOverlay" />
      <Sidebar setVista={setVista} vistaActual={vista} />
      <div className="main-content">
        <div className="topbar">
          <Topbar titulo={titulosVendedor[vista] || "Panel General"} />
          {vista === "panel-general" && <TopbarNuevaPublicacion />}
        </div>
        {vista === "panel-general" && <PanelGeneralVendedor />}
        {vista === "publicaciones" && <Publicaciones />}
        {vista === "tipos-obra" && <TiposObra />}
        {vista === "explorar" && <ExplorarObras />}
        {vista === "perfil" && <Perfil />}
        {vista === "plan" && <Plan />}
      </div>
    </div>
  );
};

export default DashboardPageVendedor;
