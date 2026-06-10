import { useState } from "react";
import Sidebar from "../components/dashboard/sidebar/Sidebar.jsx";
import "../../materials/dashboard.css";
import Topbar from "../components/dashboard/topbar/Topbar.jsx";
import TopbarNuevaPublicacion from "../components/dashboard/topbar/TopbarNuevaPublicacion.jsx";
import PanelGeneralVendedor from "../components/dashboard/panelGeneral/vendedor/PanelGeneralVendedor.jsx";
import TiposObra from "../components/dashboard/tiposDeObra/TiposObra.jsx";
import ExplorarObras from "../components/dashboard/explorarObras/ExplorarObras.jsx";
import MiPerfil from "../components/dashboard/miPerfil/MiPerfil.jsx";
import MiPlan from "../components/dashboard/plan/MiPlan.jsx";

const titulosVendedor = {
  "panel-general": "Panel General",
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
          {vista === "panel-general" && <TopbarNuevaPublicacion setVista={setVista} />}
        </div>
        {vista === "panel-general" && <PanelGeneralVendedor />}
        {vista === "tipos-obra" && <TiposObra />}
        {vista === "explorar" && <ExplorarObras />}
        {vista === "perfil" && <MiPerfil />}
        {vista === "plan" && <MiPlan />}
      </div>
    </div>
  );
};

export default DashboardPageVendedor;
