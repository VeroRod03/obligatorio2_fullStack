import Sidebar from "../components/dashboard/Sidebar.jsx";
import "../../materials/dashboard.css";

const DashboardPageVendedor = () => {
  return (
    <div className="dashboard-layout">
      <div className="sidebar-overlay" id="sidebarOverlay" onclick="closeSidebar()" />
      <Sidebar />
    </div>
  )
}

export default DashboardPageVendedor