import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import api from "../../../api/api.js";
import { setTiposObra } from "../../../features/tiposObra/tipoObra.slice.js";
import ModalConfirmacion from "../panelGeneral/vendedor/ModalConfirmacion.jsx";

const TiposObra = () => {
  const dispatch = useDispatch();
  const [tipos, setTipos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingNombre, setEditingNombre] = useState("");
  const [modalConfirmacion, setModalConfirmacion] = useState(null);

  const syncStore = (lista) => dispatch(setTiposObra(lista));

  useEffect(() => {
    api.get("/tipoObra")
      .then((res) => {
        const lista = res.data.tiposObra || res.data || [];
        setTipos(lista);
        syncStore(lista);
      })
      .catch(() => toast.error("No se pudieron cargar los tipos de obra"))
      .finally(() => setCargando(false));
  }, []);

  const handleCrear = () => {
    if (!nuevoNombre.trim()) return;
    api.post("/tipoObra", { nombre: nuevoNombre.trim() })
      .then((res) => {
        const nuevo = res.data.tipoObra || res.data;
        const lista = [...tipos, nuevo];
        setTipos(lista);
        syncStore(lista);
        setNuevoNombre("");
        setMostrarForm(false);
        toast.success(res.data.mensaje || "Tipo de obra creado");
      })
      .catch((err) => toast.error(err?.response?.data?.error?.[0]?.message || 
        err?.response?.data?.message || "No se pudo crear"));
  };

  const handleEditar = (tipo) => {
    setEditingId(tipo._id);
    setEditingNombre(tipo.nombre);
  };

  const handleGuardarEdicion = (id) => {
    if (!editingNombre.trim()) return;
    api.put(`/tipoObra/${id}`, { nombre: editingNombre.trim() })
      .then((res) => {
        const actualizado = res.data.tipoObra || res.data;
        const lista = tipos.map((t) => (t._id === id ? { ...t, ...actualizado } : t));
        setTipos(lista);
        syncStore(lista);
        setEditingId(null);
        toast.success(res.data.mensaje || "Tipo de obra actualizado");
      })
      .catch((err) => toast.error(err?.response?.data?.error?.[0]?.message || 
        err?.response?.data?.message || "No se pudo actualizar"));
  };

  const handleEliminar = (tipo) => {
    setModalConfirmacion({ tipo: "eliminar", id: tipo._id, titulo: tipo.nombre });
  };

  const confirmarEliminar = () => {
    if (!modalConfirmacion) return;
    const { id } = modalConfirmacion;
    api.delete(`/tipoObra/${id}`)
      .then(() => {
        const lista = tipos.filter((t) => t._id !== id);
        setTipos(lista);
        syncStore(lista);
        toast.success("Tipo de obra eliminado");
      })
      .catch((err) => toast.error(err?.response?.data?.error?.[0]?.message || 
        err?.response?.data?.message || "No se pudo eliminar"))
      .finally(() => setModalConfirmacion(null));
  };

  return (
    <>
      <div className="dashboard-body open">
        <div className="panel">
          <div className="panel-header">
            <div className="panel-title">Tipos de <em>obra</em></div>
            <button className="btn-gold" onClick={() => { setMostrarForm(true); setNuevoNombre(""); }}>
              <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1={12} y1={5} x2={12} y2={19} />
                <line x1={5} y1={12} x2={19} y2={12} />
              </svg>
              Nuevo tipo
            </button>
          </div>
          <div className="panel-body">

            {mostrarForm && (
              <div className="filter-bar" style={{ marginBottom: "1rem" }}>
                <input
                  className="filter-input"
                  type="text"
                  placeholder="Nombre del tipo de obra…"
                  maxLength={50}
                  value={nuevoNombre}
                  onChange={(e) => setNuevoNombre(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleCrear()}
                  autoFocus
                />
                <button className="btn-mini save" onClick={handleCrear}>Guardar</button>
                <button className="btn-mini cancel" onClick={() => setMostrarForm(false)}>Cancelar</button>
              </div>
            )}

            <table className="obras-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th style={{ fontSize: ".72rem", color: "var(--text-muted)" }}>ID</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {cargando ? (
                  <tr><td colSpan={3} style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)" }}>Cargando…</td></tr>
                ) : tipos.length === 0 ? (
                  <tr><td colSpan={3} style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)" }}>No hay tipos de obra.</td></tr>
                ) : tipos.map((tipo) => (
                  <tr key={tipo._id}>
                    <td>
                      {editingId === tipo._id ? (
                        <input
                          className="filter-input"
                          style={{ fontSize: ".85rem", padding: "0.3rem 0.5rem" }}
                          value={editingNombre}
                          onChange={(e) => setEditingNombre(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleGuardarEdicion(tipo._id)}
                          autoFocus
                        />
                      ) : (
                        <span>{tipo.nombre}</span>
                      )}
                    </td>
                    <td style={{ fontSize: ".72rem", color: "var(--text-muted)", fontFamily: "monospace" }}>
                      {tipo._id}
                    </td>
                    <td>
                      <div className="actions-col">
                        {editingId === tipo._id ? (
                          <>
                            <button className="icon-btn" title="Guardar" onClick={() => handleGuardarEdicion(tipo._id)} style={{ color: "var(--gold)" }}>
                              <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </button>
                            <button className="icon-btn" title="Cancelar" onClick={() => setEditingId(null)}>
                              <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                              </svg>
                            </button>
                          </>
                        ) : (
                          <>
                            <button className="icon-btn" title="Editar" onClick={() => handleEditar(tipo)}>
                              <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                              </svg>
                            </button>
                            <button className="icon-btn danger" title="Eliminar" onClick={() => handleEliminar(tipo)}>
                              <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                <path d="M10 11v6" /><path d="M14 11v6" />
                              </svg>
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ModalConfirmacion
        modalConfirmacion={modalConfirmacion}
        onConfirm={confirmarEliminar}
        onCancel={() => setModalConfirmacion(null)}
      />
    </>
  );
};

export default TiposObra;
