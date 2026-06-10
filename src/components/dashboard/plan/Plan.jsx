const Plan = () => {
  return (
    <div className="view" id="view-plan">
  <div className="dashboard-body">
    <div className="plan-page-layout">
      {/* Card plan actual */}
      <div className="panel">
        <div className="panel-header">
          <div className="panel-title">
            Uso del <em>plan</em>
          </div>
        </div>
        <div className="panel-body">
          <div className="plan-badge">
            <svg width={10} height={10} viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
            </svg>
            Plan Plus
          </div>
          <div className="usage-meter">
            <div className="usage-numbers">
              <div className="usage-current">
                13{" "}
                <span style={{ fontSize: "1rem", color: "var(--text-muted)" }}>
                  docs
                </span>
              </div>
              <div className="usage-max">máx. 20</div>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: "65%" }} />
            </div>
            <div
              style={{
                fontSize: ".7rem",
                color: "var(--text-muted)",
                marginTop: ".3rem"
              }}
            >
              65% utilizado · 7 restantes
            </div>
          </div>
          <div className="plan-feature">
            <svg
              width={12}
              height={12}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Hasta 20 publicaciones
          </div>
          <div className="plan-feature">
            <svg
              width={12}
              height={12}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Imágenes de alta resolución
          </div>
          <div className="plan-feature">
            <svg
              width={12}
              height={12}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <line x1={18} y1={6} x2={6} y2={18} />
              <line x1={6} y1={6} x2={18} y2={18} />
            </svg>
            <span style={{ opacity: ".5" }}>Publicaciones ilimitadas</span>
          </div>
        </div>
      </div>
      {/* Opciones de plan */}
      <div className="plan-options">
        <div className="plan-option-card plan-option-current">
          <div className="plan-option-badge">Actual</div>
          <div className="plan-option-name">Plus</div>
          <div className="plan-option-price">
            $9.99{" "}
            <span style={{ fontSize: ".8rem", color: "var(--text-muted)" }}>
              /mes
            </span>
          </div>
          <ul className="plan-option-features">
            <li>Hasta 20 publicaciones</li>
            <li>Imágenes de alta resolución</li>
            <li>Estadísticas avanzadas</li>
          </ul>
          <button
            className="btn-ghost"
            style={{
              width: "100%",
              justifyContent: "center",
              padding: ".8rem",
              opacity: ".4"
            }}
            disabled=""
          >
            Plan actual
          </button>
        </div>
        <div className="plan-option-card">
          <div className="plan-option-name">Premium</div>
          <div className="plan-option-price">
            $24.99{" "}
            <span style={{ fontSize: ".8rem", color: "var(--text-muted)" }}>
              /mes
            </span>
          </div>
          <ul className="plan-option-features">
            <li>Publicaciones ilimitadas</li>
          </ul>
          <button
            className="btn-gold"
            style={{
              width: "100%",
              justifyContent: "center",
              padding: ".8rem"
            }}
          >
            Actualizar
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default Plan