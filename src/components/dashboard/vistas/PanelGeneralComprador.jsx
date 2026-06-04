import { useState, useEffect } from "react";
import api from "../../../api/api.js";

const PanelGeneralComprador = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [tiposObra, setTiposObra] = useState([]);
  const [buscar, setBuscar] = useState("");
  const [tipoObra, setTipoObra] = useState("");

  // Carga los tipos de obra al montar
  useEffect(() => {
    api
      .get("/tipoObra")
      .then((res) => setTiposObra(res.data.tiposObra || res.data))
      .catch(() => setTiposObra([]));
  }, []);

  // Busca publicaciones con debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = { estado: "activa" };
      if (buscar.trim()) params.buscar = buscar;
      if (tipoObra) params.tipoObra = tipoObra;

      api
        .get("/publicacion", { params })
        .then((res) => setPublicaciones(res.data.publicaciones))
        .catch(() => setPublicaciones([]));
    }, 400);

    return () => clearTimeout(timer);
  }, [buscar, tipoObra]);

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
          <div className="pub-grid">
            {publicaciones.length === 0 ? (
              <p>No se encontraron publicaciones.</p>
            ) : (
              publicaciones.map((pub) => (
                <div key={pub._id} className="pub-card">
                  <div className="pub-card-body">
                    <div className="pub-title">{pub.obra?.titulo}</div>
                    <div className="pub-artist">{pub.obra?.artista}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanelGeneralComprador;
