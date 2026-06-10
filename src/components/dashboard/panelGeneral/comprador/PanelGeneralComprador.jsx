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
        const total = res.data.pagination?.total ?? res.data.total ?? 0;
        setTotalPaginas(Math.max(1, Math.ceil(total / LIMIT)));
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
            pagina={pagina}
            totalPaginas={totalPaginas}
            onPagina={setPagina}
          />
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
