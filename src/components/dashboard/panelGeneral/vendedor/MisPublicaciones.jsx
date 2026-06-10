import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import api from "../../../../api/api.js";
import ModalConfirmacion from "./ModalConfirmacion.jsx";

const LIMIT_PLUS = 4;

const getImageUrl = (imageId) => {
  if (!imageId) return null;
  return `https://www.artic.edu/iiif/2/${imageId}/full/200,/0/default.jpg`;
};

const badgeStyle = (estado) => {
  if (estado === "activa") return { borderColor: "#6aaf7e", color: "#6aaf7e" };
  if (estado === "pausada") return { borderColor: "#c9943c", color: "#c9943c" };
  if (estado === "finalizada") return { borderColor: "var(--text-muted)", color: "var(--text-muted)" };
  if (estado === "cancelada") return { borderColor: "#e05252", color: "#e05252" };
  return {};
};

const MisPublicaciones = ({ onTotalChange }) => {
  const usuario = useSelector((state) => state.user.usuario);
  const tiposObra = useSelector((state) => state.tiposDeObra.tiposObra);

  const [publicaciones, setPublicaciones] = useState([]);
  const [totalPublicaciones, setTotalPublicaciones] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [buscar, setBuscar] = useState("");
  const [buscarDebounced, setBuscarDebounced] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingValues, setEditingValues] = useState({
    tipoObra: "",
    donacion: false,
    estado: "",
  });
  const [modalConfirmacion, setModalConfirmacion] = useState(null);

  const fetchPublicaciones = (buscarVal, estado, tipo) => {
    const params = {};
    if (buscarVal.trim()) params.buscar = buscarVal.trim();
    if (estado) params.estado = estado;
    if (tipo) params.tipoObra = tipo;
    setCargando(true);
    api
      .get("/publicacion/mis-publicaciones", {
        params: { ...params, limit: 100 },
      })
      .then((res) => {
        const pubs = res.data.publicaciones || res.data || [];
        setPublicaciones(pubs);
        // solamente actualizar el contador si NO hay filtros aplicados, asi se refleja bien el total de publicaciones
        const sinFiltros = !buscarVal.trim() && !estado && !tipo;

        if (sinFiltros) {
          setTotalPublicaciones(pubs.length);
          onTotalChange?.(pubs.length);
        }
      })
      .catch(() => {
        setPublicaciones([]);
        onTotalChange?.(0);
      })
      .finally(() => setCargando(false));
  };

  useEffect(() => {
    const t = setTimeout(() => setBuscarDebounced(buscar), 400);
    return () => clearTimeout(t);
  }, [buscar]);

  useEffect(() => {
    fetchPublicaciones(buscarDebounced, filtroEstado, filtroTipo);
  }, [buscarDebounced, filtroEstado, filtroTipo]);

  const handleEliminar = (pub) =>
    setModalConfirmacion({
      tipo: "eliminar",
      id: pub._id,
      titulo: pub.obra?.titulo,
    });

  const handleFinalizar = (pub) =>
    setModalConfirmacion({
      tipo: "finalizar",
      id: pub._id,
      titulo: pub.obra?.titulo,
    });

  const confirmarAccion = () => {
    if (!modalConfirmacion) return;
    const { tipo, id } = modalConfirmacion;
    if (tipo === "eliminar") {
      api
        .delete(`/publicacion/${id}`)
        .then((res) => {
          toast.success(res.data?.mensaje || "Publicación eliminada");
          setPublicaciones((prev) => {
            const updated = prev.filter((p) => p._id !== id);
            onTotalChange?.(updated.length);
            return updated;
          });
        })
        .catch((error) =>
          toast.error(error?.response?.data?.message || "No se pudo eliminar"),
        );
    } else {
      api
        .patch(`/publicacion/${id}/finalizar`)
        .then((res) => {
          toast.success(res.data?.mensaje || "Publicación finalizada");
          setPublicaciones((prev) =>
            prev.map((p) => {
              if (p._id !== id) return p;
              const updated = res.data?.data || res.data || {};
              return {
                ...p,
                ...updated,
                estado: "finalizada",
                ultimaOferta: typeof updated.ultimaOferta === "object" && updated.ultimaOferta !== null
                  ? updated.ultimaOferta
                  : p.ultimaOferta,
                tipoObra: typeof updated.tipoObra === "object" && updated.tipoObra !== null
                  ? updated.tipoObra
                  : p.tipoObra,
              };
            }),
          );
        })
        .catch((error) =>
          toast.error(error?.response?.data?.message || "No se pudo finalizar"),
        );
    }
    setModalConfirmacion(null);
  };

  const handleEdit = (pub) => {
    setEditingId(pub._id);
    setEditingValues({
      tipoObra: pub.tipoObra?._id || "",
      donacion: !!pub.donacion,
      estado: pub.estado || "",
    });
  };

  const handleEditChange = (field, value) =>
    setEditingValues((prev) => ({ ...prev, [field]: value }));

  const saveEdit = (id) => {
    const payload = {
      tipoObra: editingValues.tipoObra || undefined,
      donacion: editingValues.donacion,
      estado: editingValues.estado,
    };
    console.log("payload enviado:", payload);

    api
      .put(`/publicacion/${id}`, payload)
      .then((res) => {
        const updated = res.data?.data || res.data || {};
        const tipoObraObj = tiposObra.find((t) => t._id === editingValues.tipoObra);
        setPublicaciones((prev) =>
          prev.map((p) => {
            if (p._id !== id) return p;
            const merged = { ...p, ...updated };
            if (tipoObraObj) merged.tipoObra = tipoObraObj;
            return merged;
          }),
        );
        toast.success(res.data?.mensaje || "Publicación actualizada");
        setEditingId(null);
      })
      .catch((error) =>
        console.error("Error al actualizar:", error),
        toast.error(
          error?.response?.data?.error?.[0]?.message || 
          error?.response?.data?.message || "Error al actualizar"),
      );
  };

  const cancelEdit = () => setEditingId(null);

  const esPlus = (usuario?.subscripcion || "plus") === "plus";
  const totalPubs = totalPublicaciones;

  return (
    <>
      <div className="panel">
        <div className="panel-header">
          <div className="panel-title">
            Mis <em>publicaciones</em>
          </div>
          {esPlus && (
            <div
              style={{
                fontSize: "0.7rem",
                color:
                  totalPubs >= LIMIT_PLUS ? "#e05252" : "var(--text-muted)",
              }}
            >
              {totalPubs} / {LIMIT_PLUS}
            </div>
          )}
        </div>
        <div className="panel-body">
          <div className="filter-bar">
            <input
              className="filter-input"
              type="text"
              placeholder="Buscar por título o artista…"
              value={buscar}
              onChange={(e) => setBuscar(e.target.value)}
            />
            <select
              className="filter-select"
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
            >
              <option value="">Todos los estados</option>
              <option value="activa">Activa</option>
              <option value="pausada">Pausada</option>
              <option value="cancelada">Cancelada</option>
              <option value="finalizada">Finalizada</option>
            </select>
            <select
              className="filter-select"
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
            >
              <option value="">Todos los tipos</option>
              {tiposObra.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.nombre}
                </option>
              ))}
            </select>
          </div>

          <table className="obras-table">
            <thead>
              <tr>
                <th style={{ width: 44 }} />
                <th>Obra / Artista</th>
                <th>Tipo</th>
                <th>Precio base</th>
                <th>Última oferta</th>
                <th>Estado</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {cargando ? (
                <tr>
                  <td
                    colSpan={7}
                    style={{
                      textAlign: "center",
                      padding: "2rem",
                      color: "var(--text-muted)",
                    }}
                  >
                    Cargando mis publicaciones…
                  </td>
                </tr>
              ) : publicaciones.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    style={{
                      textAlign: "center",
                      padding: "2rem",
                      color: "var(--text-muted)",
                    }}
                  >
                    No hay publicaciones.
                  </td>
                </tr>
              ) : (
                publicaciones.map((pub) => (
                  <tr key={pub._id}>
                    <td>
                      <div
                        className="obra-thumb"
                        style={
                          pub.obra?.imagenId
                            ? {
                                backgroundImage: `url(${getImageUrl(pub.obra.imagenId)})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                              }
                            : {
                                background:
                                  "linear-gradient(135deg,#1a0f0a,#2d1a0d)",
                              }
                        }
                      />
                    </td>
                    <td>
                      <div className="obra-name">{pub.obra?.titulo}</div>
                      <div className="obra-artist">{pub.obra?.artista}</div>
                    </td>
                    {editingId === pub._id ? (
                      <>
                        <td>
                          <select
                            className="filter-select"
                            value={editingValues.tipoObra}
                            onChange={(e) =>
                              handleEditChange("tipoObra", e.target.value)
                            }
                            style={{ fontSize: ".78rem", width: "100%" }}
                          >
                            {tiposObra.map((t) => (
                              <option key={t._id} value={t._id}>
                                {t.nombre}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="price-col">
                          {pub.precioBase?.toLocaleString()}{" "}
                          <span
                            style={{
                              fontSize: ".7rem",
                              color: "var(--text-muted)",
                            }}
                          >
                            USD
                          </span>
                        </td>
                        <td className="price-col">
                          {pub.ultimaOferta
                            ? <>{pub.ultimaOferta.monto?.toLocaleString()} <span style={{ fontSize: ".7rem", color: "var(--text-muted)" }}>USD</span></>
                            : <span style={{ color: "var(--text-muted)", fontSize: ".78rem" }}>—</span>
                          }
                        </td>
                        <td>
                          <select
                            className="filter-select"
                            value={editingValues.estado}
                            onChange={(e) =>
                              handleEditChange("estado", e.target.value)
                            }
                            style={{ fontSize: ".78rem", width: "100%" }}
                          >
                            <option value="activa">Activa</option>
                            <option value="pausada">Pausada</option>
                            <option value="cancelada">Cancelada</option>
                          </select>
                        </td>
                        <td>
                          <div
                            className="actions-col"
                            style={{ gap: "0.5rem" }}
                          >
                            <div
                              onClick={() =>
                                handleEditChange(
                                  "donacion",
                                  !editingValues.donacion,
                                )
                              }
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 5,
                                cursor: "pointer",
                                border: `1px solid ${editingValues.donacion ? "var(--gold)" : "var(--border-subtle)"}`,
                                borderRadius: 6,
                                padding: "2px 7px",
                                background: editingValues.donacion
                                  ? "rgba(212,175,55,.08)"
                                  : "transparent",
                                transition: "all .2s",
                              }}
                            >
                              <div
                                style={{
                                  width: 26,
                                  height: 14,
                                  borderRadius: 7,
                                  position: "relative",
                                  background: editingValues.donacion
                                    ? "var(--gold)"
                                    : "var(--border-subtle)",
                                  transition: "background .2s",
                                  flexShrink: 0,
                                }}
                              >
                                <div
                                  style={{
                                    position: "absolute",
                                    top: 2,
                                    left: editingValues.donacion ? 13 : 2,
                                    width: 10,
                                    height: 10,
                                    borderRadius: "50%",
                                    background: "#fff",
                                    transition: "left .2s",
                                  }}
                                />
                              </div>
                              <span
                                style={{
                                  fontSize: ".72rem",
                                  color: editingValues.donacion
                                    ? "var(--gold)"
                                    : "var(--text-muted)",
                                  fontWeight: editingValues.donacion
                                    ? 500
                                    : 400,
                                  transition: "color .2s",
                                  userSelect: "none",
                                }}
                              >
                                Donación
                              </span>
                            </div>
                            <button
                              className="icon-btn"
                              title="Guardar"
                              onClick={() => saveEdit(pub._id)}
                              style={{ color: "var(--gold)" }}
                            >
                              <svg
                                width={13}
                                height={13}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </button>
                            <button
                              className="icon-btn"
                              title="Cancelar"
                              onClick={cancelEdit}
                            >
                              <svg
                                width={13}
                                height={13}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td style={{ fontSize: ".78rem" }}>
                          {pub.tipoObra?.nombre}
                        </td>
                        <td className="price-col">
                          {pub.precioBase?.toLocaleString()}{" "}
                          <span
                            style={{
                              fontSize: ".7rem",
                              color: "var(--text-muted)",
                            }}
                          >
                            USD
                          </span>
                        </td>
                        <td className="price-col">
                          {pub.ultimaOferta
                            ? <>{pub.ultimaOferta.monto?.toLocaleString()} <span style={{ fontSize: ".7rem", color: "var(--text-muted)" }}>USD</span></>
                            : <span style={{ color: "var(--text-muted)", fontSize: ".78rem" }}>—</span>
                          }
                        </td>
                        <td>
                          <span className="badge" style={badgeStyle(pub.estado)}>
                            {pub.estado}
                          </span>
                          {pub.estado === "finalizada" && pub.ganador && (
                            <div style={{ marginTop: "0.35rem", fontSize: ".7rem", color: "var(--text-muted)", lineHeight: 1.4 }}>
                              <div style={{ color: "var(--text-dim)" }}>{pub.ganador.nombre}</div>
                              <div>{pub.ganador.email}</div>
                            </div>
                          )}
                        </td>
                        <td>
                          <div className="actions-col">
                            {pub.estado !== "finalizada" &&
                              pub.estado !== "cancelada" && (
                                <button
                                  className="icon-btn"
                                  title="Editar"
                                  onClick={() => handleEdit(pub)}
                                >
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
                              )}
                            <button
                              className="icon-btn danger"
                              title="Eliminar"
                              onClick={() => handleEliminar(pub)}
                            >
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
                            {pub.estado === "activa" && (
                              <button
                                className="icon-btn"
                                title="Finalizar"
                                onClick={() => handleFinalizar(pub)}
                              >
                                <svg
                                  width={13}
                                  height={13}
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                >
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              </button>
                            )}
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ModalConfirmacion
        modalConfirmacion={modalConfirmacion}
        onConfirm={confirmarAccion}
        onCancel={() => setModalConfirmacion(null)}
      />
    </>
  );
};

export default MisPublicaciones;
