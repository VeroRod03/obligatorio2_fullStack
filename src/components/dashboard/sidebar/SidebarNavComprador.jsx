const SidebarNavComprador = ({ setVista, vistaActual }) => {
  return (
    <nav className="sidebar-nav" id="navComprador">
      <div className="nav-section">
        <div className="nav-section-title">Principal</div>
        <div
          className={`nav-item ${vistaActual === "panel-general" ? "active" : ""}`}
          onClick={() => setVista("panel-general")}
        >
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x={3} y={3} width={7} height={7} />
            <rect x={14} y={3} width={7} height={7} />
            <rect x={14} y={14} width={7} height={7} />
            <rect x={3} y={14} width={7} height={7} />
          </svg>
          Panel general
        </div>
        <div
          className={`nav-item ${vistaActual === "mis-ofertas" ? "active" : ""}`}
          onClick={() => setVista("mis-ofertas")}
        >
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1={12} y1={1} x2={12} y2={23} />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
          Mis ofertas
        </div>
      </div>
      <div className="nav-section">
        <div className="nav-section-title">Cuenta</div>
        <div
          className={`nav-item ${vistaActual === "perfil" ? "active" : ""}`}
          onClick={() => setVista("perfil")}
        >
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx={12} cy={7} r={4} />
          </svg>
          Mi perfil
        </div>
      </div>
    </nav>
  );
};

export default SidebarNavComprador;
