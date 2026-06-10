const UsoPlan = ({ esPlus, totalPubs, LIMIT_PLUS, usoPct }) => {
  return (
    <>
      {esPlus ? (
        <div className="stat-card">
          <div className="stat-label">Uso del plan</div>
          <div className="plan-badge">
            <svg width={10} height={10} viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
            </svg>
            Plan Plus
          </div>
          <div className="stat-value">
            {totalPubs}
            <span className="unit">/ {LIMIT_PLUS}</span>
          </div>
          <div style={{ marginTop: "1rem" }}>
            <div
              style={{
                height: 4,
                borderRadius: 2,
                background: "var(--border-subtle)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${usoPct}%`,
                  background: usoPct >= 100 ? "#e05252" : "var(--gold)",
                  borderRadius: 2,
                  transition: "width .4s",
                }}
              />
            </div>
            <div
              style={{
                fontSize: ".65rem",
                color: "var(--text-muted)",
                marginTop: ".3rem",
              }}
            >
              {usoPct}% utilizado · plan Plus
            </div>
          </div>
        </div>
      ) : (
        <div className="stat-card">
          <div className="stat-label">Publicaciones realizadas</div>
          <div className="stat-value">{totalPubs}</div>
          <div className="stat-change" style={{ marginTop: ".8rem" }}>Plan Premium · ilimitadas</div>
        </div>
      )}
      </>
  )
  
};


export default UsoPlan