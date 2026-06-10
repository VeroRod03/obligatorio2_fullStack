import { useState, useEffect } from "react";
import api from "../../../../api/api.js";
import PublicacionesGrid from "./PublicacionesGrid.jsx";
import DetallePublicacionModal from "./DetallePublicacionModal.jsx";
import { useSelector } from "react-redux";

const PanelGeneralComprador = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [buscar, setBuscar] = useState("");
  const [tipoObra, setTipoObra] = useState("");
  const [publicacionSeleccionada, setPublicacionSeleccionada] = useState(null);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const tiposObra = useSelector((state) => state.tiposDeObra.tiposObra);

  const LIMIT = 20;

  const fetchPublicaciones = (buscarVal, tipoObraVal, page = 1) => {
    const params = { estado: "activa", page, limit: LIMIT };
    if (buscarVal.trim()) params.buscar = buscarVal;
    if (tipoObraVal) params.tipoObra = tipoObraVal;
    setCargando(true);
    api
      .get("/publicacion", { params })
      .then((res) => {
        setPublicaciones(res.data.publicaciones);
        setTotalPaginas(res.data.paginas ?? 1);
      })
      .catch(() => setPublicaciones([]))
      .finally(() => setCargando(false));
  };

  // Reset page on filter change
  useEffect(() => { setPagina(1); }, [buscar, tipoObra]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPublicaciones(buscar, tipoObra, pagina);
    }, buscar ? 400 : 0);
    return () => clearTimeout(timer);
  }, [buscar, tipoObra, pagina]);

  const actualizarPublicacion = (pubActualizada) => {
    setPublicacionSeleccionada(pubActualizada);
    setPublicaciones((prev) =>
      prev.map((pub) => (pub._id === pubActualizada._id ? pubActualizada : pub)),
    );
  };

  return (
    <div className="dashboard-body">
      <div className="panel">
        <div className="panel-header">
          <div className="panel-title">
            Publicaciones <em>activas</em>
          </div>
          <div className="pub-filter-bar">
            <input
              className="filter-input"
              type="text"
              placeholder="Buscar por título o artista…"
              value={buscar}
              onChange={(e) => setBuscar(e.target.value)}
            />
            <select
              className="filter-select"
              value={tipoObra}
              onChange={(e) => setTipoObra(e.target.value)}
            >
              <option value="">Todos los tipos</option>
              {tiposObra.map((tipo) => (
                <option key={tipo._id} value={tipo._id}>
                  {tipo.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="panel-body">
          <PublicacionesGrid
            publicaciones={publicaciones}
            cargando={cargando}
            onSeleccionar={setPublicacionSeleccionada}
          />
          {publicaciones.length > 0 && (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem", marginTop: "1.5rem", fontSize: ".82rem", color: "var(--text-muted)" }}>
              <button
                className="btn-ghost"
                style={{ padding: ".3rem .8rem", fontSize: ".8rem", opacity: pagina <= 1 ? .35 : 1 }}
                disabled={pagina <= 1}
                onClick={() => setPagina(pagina - 1)}
              >← Anterior</button>
              <span>Página {pagina} de {totalPaginas}</span>
              <button
                className="btn-ghost"
                style={{ padding: ".3rem .8rem", fontSize: ".8rem", opacity: pagina >= totalPaginas ? .35 : 1 }}
                disabled={pagina >= totalPaginas}
                onClick={() => setPagina(pagina + 1)}
              >Siguiente →</button>
            </div>
          )}
          <DetallePublicacionModal
            publicacion={publicacionSeleccionada}
            cerrar={() => setPublicacionSeleccionada(null)}
            actualizarPublicacion={actualizarPublicacion}
          />
        </div>
      </div>
    </div>
  );
};

export default PanelGeneralComprador;
