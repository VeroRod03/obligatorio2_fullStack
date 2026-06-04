const SidebarNavVendedor = ({ setVista, vistaActual }) => {
  return (
    <nav className="sidebar-nav" id="navVendedor">
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
          className={`nav-item ${vistaActual === "publicaciones" ? "active" : ""}`}
          onClick={() => setVista("publicaciones")}
        >
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          Publicaciones activas
        </div>
      </div>
      <div className="nav-section">
        <div className="nav-section-title">Catálogo</div>
        <div
          className={`nav-item ${vistaActual === "tipos-obra" ? "active" : ""}`}
          onClick={() => setVista("tipos-obra")}
        >
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x={3} y={3} width={18} height={18} rx={2} />
            <path d="m3 9 4-4 4 4 4-4 4 4" />
            <path d="M3 15h18" />
          </svg>
          Tipos de obra
        </div>
        <div
          className={`nav-item ${vistaActual === "explorar" ? "active" : ""}`}
          onClick={() => setVista("explorar")}
        >
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx={11} cy={11} r={8} />
            <line x1={21} y1={21} x2="16.65" y2="16.65" />
          </svg>
          Explorar obras
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
        <div
          className={`nav-item ${vistaActual === "plan" ? "active" : ""}`}
          onClick={() => setVista("plan")}
        >
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          Plan y suscripción
        </div>
      </div>
    </nav>
  );
};

export default SidebarNavVendedor;
