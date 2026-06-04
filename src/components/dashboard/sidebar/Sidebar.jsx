import BrandIconName from "../BrandIconName"
import SidebarFooter from "../SidebarFooter";
import SidebarNavVendedor from "./SidebarNavVendedor";
import SidebarNavComprador from "./SidebarNavComprador";


const Sidebar = () => {
  const rol = localStorage.getItem("rol");

  const closeSidebar = () => {
    document.body.classList.add("sidebar-collapsed");
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.remove("open");
    sidebar.classList.add("closed");
    document.getElementById("sidebarOverlay").classList.remove("visible");
  };

  return (
    <aside className="sidebar" id="sidebar">
      <div className="sidebar-brand">
        <BrandIconName />
        <button
          className="sidebar-close-btn"
          onClick={closeSidebar}
          title="Cerrar menú"
        >
          <svg
            width={18}
            height={18}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <line x1={18} y1={6} x2={6} y2={18} />
            <line x1={6} y1={6} x2={18} y2={18} />
          </svg>
        </button>
      </div>
      {rol === "vendedor" && <SidebarNavVendedor />}
      {rol === "comprador" && <SidebarNavComprador />}
      
        <SidebarFooter />
    </aside>
  );
};

export default Sidebar;
