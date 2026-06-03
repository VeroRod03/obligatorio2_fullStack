import BrandIconName from "../BrandIconName"
import SidebarFooter from "./SidebarFooter";

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
        {/* Botón cerrar sidebar en mobile */}
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
      {/* ── NAV VENDEDOR ── */}
      <nav className="sidebar-nav" id="navVendedor">
        <div className="nav-section">
          <div className="nav-section-title">Principal</div>
          <div
            className="nav-item active"
            data-nav="panel-general"
            onclick="navigate(this)"
          >
            <svg
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x={3} y={3} width={7} height={7} />
              <rect x={14} y={3} width={7} height={7} />
              <rect x={14} y={14} width={7} height={7} />
              <rect x={3} y={14} width={7} height={7} />
            </svg>
            Panel general
          </div>
          <div
            className="nav-item"
            data-nav="publicaciones"
            onclick="navigate(this)"
          >
            <svg
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            Publicaciones activas
          </div>
        </div>
        <div className="nav-section">
          <div className="nav-section-title">Catálogo</div>
          <div
            className="nav-item"
            data-nav="tipos-obra"
            onclick="navigate(this)"
          >
            <svg
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x={3} y={3} width={18} height={18} rx={2} />
              <path d="m3 9 4-4 4 4 4-4 4 4" />
              <path d="M3 15h18" />
            </svg>
            Tipos de obra
          </div>
          <div
            className="nav-item"
            data-nav="explorar"
            onclick="navigate(this)"
          >
            <svg
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx={11} cy={11} r={8} />
              <line x1={21} y1={21} x2="16.65" y2="16.65" />
            </svg>
            Explorar obras
          </div>
        </div>
        <div className="nav-section">
          <div className="nav-section-title">Cuenta</div>
          <div className="nav-item" data-nav="perfil" onclick="navigate(this)">
            <svg
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx={12} cy={7} r={4} />
            </svg>
            Mi perfil
          </div>
          <div className="nav-item" data-nav="plan" onclick="navigate(this)">
            <svg
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Plan y suscripción
          </div>
        </div>
      </nav>
      {/* ── NAV COMPRADOR ── */}
      <nav
        className="sidebar-nav"
        id="navComprador"
        style={{ display: "none" }}
      >
        <div className="nav-section">
          <div className="nav-section-title">Principal</div>
          <div
            className="nav-item active"
            data-nav="panel-general"
            onClick={() => navigate(this)}
          >
            <svg
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x={3} y={3} width={7} height={7} />
              <rect x={14} y={3} width={7} height={7} />
              <rect x={14} y={14} width={7} height={7} />
              <rect x={3} y={14} width={7} height={7} />
            </svg>
            Panel general
          </div>
          <div
            className="nav-item"
            data-nav="mis-ofertas"
            onclick="navigate(this)"
          >
            <svg
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <line x1={12} y1={1} x2={12} y2={23} />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            Mis ofertas
          </div>
        </div>
        <div className="nav-section">
          <div className="nav-section-title">Cuenta</div>
          <div className="nav-item" data-nav="perfil" onclick="navigate(this)">
            <svg
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx={12} cy={7} r={4} />
            </svg>
            Mi perfil
          </div>
        </div>
      </nav>
        <SidebarFooter />
    </aside>
  );
};

export default Sidebar;
