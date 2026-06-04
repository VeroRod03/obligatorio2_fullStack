import Sidebar from "../components/dashboard/sidebar/Sidebar.jsx";
import "../../materials/dashboard.css";
import Topbar from "../components/dashboard/Topbar.jsx";

const DashboardPageComprador = () => {
  return (
    <div className="dashboard-layout">
      <div className="sidebar-overlay" id="sidebarOverlay" onclick="closeSidebar()" />
      <Sidebar />
      <div className="main-content">
        <div className="topbar">
          <Topbar titulo="Panel General" />
        </div>
        
      </div>
    </div>
  )
}

export default DashboardPageComprador
