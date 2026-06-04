import Sidebar from "../components/dashboard/sidebar/Sidebar.jsx";
import "../../materials/dashboard.css";
import Topbar from "../components/dashboard/Topbar.jsx";
import TopbarNuevaPublicacion from "../components/dashboard/topbar/TopbarNuevaPublicacion.jsx";

const DashboardPageVendedor = () => {
  return (
    <div className="dashboard-layout">
      <div className="sidebar-overlay" id="sidebarOverlay" onclick="closeSidebar()" />
      <Sidebar />
      <div className="main-content">
        <div className="topbar">
          <Topbar titulo="Panel General" />
          <TopbarNuevaPublicacion />
        </div>
      </div>
    </div>
  )
}

export default DashboardPageVendedor