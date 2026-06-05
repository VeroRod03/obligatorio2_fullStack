import { useState, useEffect } from "react";
import api from "../../../api/api.js";
import PublicacionesGrid from "./PublicacionesGrid.jsx";
import DetallePublicacionModal from "./DetallePublicacionModal.jsx";

const PanelGeneralComprador = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [tiposObra, setTiposObra] = useState([]);
  const [buscar, setBuscar] = useState("");
  const [tipoObra, setTipoObra] = useState("");
  const [publicacionSeleccionada, setPublicacionSeleccionada] = useState(null);

  // Carga los tipos de obra al montar
  useEffect(() => {
    api
      .get("/tipoObra")
      .then((res) => setTiposObra(res.data.tiposObra || res.data))
      .catch(() => setTiposObra([]));
  }, []);

  const fetchPublicaciones = (buscarVal, tipoObraVal) => {
    const params = { estado: "activa" };
    if (buscarVal.trim()) params.buscar = buscarVal;
    if (tipoObraVal) params.tipoObra = tipoObraVal;

    api
      .get("/publicacion", { params })
      .then((res) => setPublicaciones(res.data.publicaciones))
      .catch(() => setPublicaciones([]));
  };

  // Debounce solo para el texto
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPublicaciones(buscar, tipoObra);
    }, 400);

    return () => clearTimeout(timer);
  }, [buscar]);

  // Inmediato para el tipo
  useEffect(() => {
    fetchPublicaciones(buscar, tipoObra);
  }, [tipoObra]);

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
          {/* al grid le pasamos las publicaciones y la función para seleccionar una */}
          <PublicacionesGrid
            publicaciones={publicaciones}
            onSeleccionar={setPublicacionSeleccionada}
          />
          <DetallePublicacionModal
            publicacion={publicacionSeleccionada}
            cerrar={() => setPublicacionSeleccionada(null)}
          />
        </div>
      </div>
    </div>
  );
};

export default PanelGeneralComprador;
