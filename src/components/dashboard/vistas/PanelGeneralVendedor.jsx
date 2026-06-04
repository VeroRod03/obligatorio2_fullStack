const PanelGeneralVendedor = () => {
  return (
    <div className="view active" id="view-panel-general">
  {/* ── VENDEDOR: Panel general ── */}
  <div className="dashboard-body" id="panelVendedor">
    {/* Stats: 3 tarjetas (sin "Subastas activas") */}
    <div className="stats-row stats-row-3">
      <div className="stat-card">
        <div className="stat-label">Publicaciones</div>
        <div className="stat-value">13</div>
        <div className="stat-change">↑ 2 este mes</div>
        <div className="stat-icon">
          <svg
            width={28}
            height={28}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          </svg>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Ofertas recibidas</div>
        <div className="stat-value">28</div>
        <div className="stat-change">↑ 6 hoy</div>
        <div className="stat-icon">
          <svg
            width={28}
            height={28}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1}
          >
            <line x1={12} y1={1} x2={12} y2={23} />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Monto más alto</div>
        <div className="stat-value">
          4.200<span className="unit">USD</span>
        </div>
        <div className="stat-change">Paisaje nocturno</div>
        <div className="stat-icon">
          <svg
            width={28}
            height={28}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1}
          >
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
          </svg>
        </div>
      </div>
    </div>
    {/* Main grid: tabla + gráfico */}
    <div className="main-grid">
      {/* Tabla publicaciones */}
      <div className="panel">
        <div className="panel-header">
          <div className="panel-title">
            Mis <em>publicaciones</em>
          </div>
          <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
            13 / 20
          </div>
        </div>
        <div className="panel-body">
          <div className="filter-bar">
            <input
              className="filter-input"
              type="text"
              placeholder="Buscar por título o artista…"
            />
            <select className="filter-select">
              <option value="">Todos los estados</option>
              <option>Activa</option>
              <option>Pausada</option>
              <option>Cerrada</option>
            </select>
          </div>
          <table className="obras-table">
            <thead>
              <tr>
                <th style={{ width: 44 }} />
                <th>Obra / Artista</th>
                <th>Tipo</th>
                <th>Precio base</th>
                <th>Estado</th>
                <th />
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div
                    className="obra-thumb"
                    style={{
                      background: "linear-gradient(135deg,#1a0f0a,#2d1a0d)"
                    }}
                  />
                </td>
                <td>
                  <div className="obra-name">Paisaje nocturno</div>
                  <div className="obra-artist">Juana Molina</div>
                </td>
                <td style={{ fontSize: ".78rem" }}>Pintura</td>
                <td className="price-col">
                  4.200{" "}
                  <span
                    style={{ fontSize: ".7rem", color: "var(--text-muted)" }}
                  >
                    USD
                  </span>
                </td>
                <td>
                  <span className="badge badge-active">Activa</span>
                </td>
                <td>
                  <div className="actions-col">
                    <button className="icon-btn" title="Editar">
                      <svg
                        width={13}
                        height={13}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                    <button className="icon-btn danger" title="Eliminar">
                      <svg
                        width={13}
                        height={13}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                        <path d="M10 11v6" />
                        <path d="M14 11v6" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div
                    className="obra-thumb"
                    style={{
                      background: "linear-gradient(135deg,#1a0f0a,#2d1a0d)"
                    }}
                  />
                </td>
                <td>
                  <div className="obra-name">Forma en reposo</div>
                  <div className="obra-artist">Carlos Benedetti</div>
                </td>
                <td style={{ fontSize: ".78rem" }}>Escultura</td>
                <td className="price-col">
                  1.800{" "}
                  <span
                    style={{ fontSize: ".7rem", color: "var(--text-muted)" }}
                  >
                    USD
                  </span>
                </td>
                <td>
                  <span className="badge badge-active">Activa</span>
                </td>
                <td>
                  <div className="actions-col">
                    <button className="icon-btn" title="Editar">
                      <svg
                        width={13}
                        height={13}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                    <button className="icon-btn danger" title="Eliminar">
                      <svg
                        width={13}
                        height={13}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div
                    className="obra-thumb"
                    style={{
                      background: "linear-gradient(135deg,#0f1520,#1a2535)"
                    }}
                  />
                </td>
                <td>
                  <div className="obra-name">Mar en calma</div>
                  <div className="obra-artist">Sofía Delgado</div>
                </td>
                <td style={{ fontSize: ".78rem" }}>Fotografía</td>
                <td className="price-col">
                  650{" "}
                  <span
                    style={{ fontSize: ".7rem", color: "var(--text-muted)" }}
                  >
                    USD
                  </span>
                </td>
                <td>
                  <span className="badge badge-pending">Pausada</span>
                </td>
                <td>
                  <div className="actions-col">
                    <button className="icon-btn" title="Editar">
                      <svg
                        width={13}
                        height={13}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                    <button className="icon-btn danger" title="Eliminar">
                      <svg
                        width={13}
                        height={13}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div
                    className="obra-thumb"
                    style={{
                      background: "linear-gradient(135deg,#1a1208,#2e2010)"
                    }}
                  />
                </td>
                <td>
                  <div className="obra-name">Composición IV</div>
                  <div className="obra-artist">Luis Aranda</div>
                </td>
                <td style={{ fontSize: ".78rem" }}>Pintura</td>
                <td className="price-col">
                  3.200{" "}
                  <span
                    style={{ fontSize: ".7rem", color: "var(--text-muted)" }}
                  >
                    USD
                  </span>
                </td>
                <td>
                  <span className="badge badge-inactive">Cerrada</span>
                </td>
                <td>
                  <div className="actions-col">
                    <button className="icon-btn" title="Editar">
                      <svg
                        width={13}
                        height={13}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                    <button className="icon-btn danger" title="Eliminar">
                      <svg
                        width={13}
                        height={13}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* Gráfico actividad */}
      <div className="right-col">
        <div className="panel">
          <div className="panel-header">
            <div className="panel-title">
              Actividad <em>mensual</em>
            </div>
          </div>
          <div className="panel-body" style={{ padding: "1rem" }}>
            <div className="chart-area">
              <div className="fake-bars">
                <div className="fake-bar" style={{ height: "30%" }} />
                <div className="fake-bar" style={{ height: "55%" }} />
                <div className="fake-bar" style={{ height: "40%" }} />
                <div className="fake-bar" style={{ height: "80%" }} />
                <div className="fake-bar" style={{ height: "60%" }} />
                <div className="fake-bar" style={{ height: "90%" }} />
                <div className="fake-bar" style={{ height: "70%" }} />
              </div>
              <div className="chart-overlay-text">
                <svg
                  width={22}
                  height={22}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1}
                  style={{ color: "var(--gold-dim)", marginBottom: 4 }}
                >
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                </svg>
                <p>Gráfico de ofertas / mes</p>
                <p
                  style={{
                    color: "var(--text-dim)",
                    fontSize: ".65rem",
                    marginTop: 2
                  }}
                >
                  Se renderizará con Recharts
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default PanelGeneralVendedor