import { useState, useEffect } from "react";
import api from "../../../api/api.js";

const PanelGeneralComprador = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [buscar, setBuscar] = useState("");
  const [tipoObra, setTipoObra] = useState("");

  const fetchPublicaciones = () => {
    const params = { estado: "activa" };
    if (buscar.trim()) params.buscar = buscar;
    if (tipoObra) params.tipoObra = tipoObra;

    api
      .get("/publicacion", { params })
      .then((res) => setPublicaciones(res.data.publicaciones))
      .catch(() => setPublicaciones([]));
  };

  useEffect(() => {
    fetchPublicaciones();
  }, []);

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
              <option value="Pintura">Pintura</option>
              <option value="Escultura">Escultura</option>
              <option value="Fotografía">Fotografía</option>
              <option value="Cerámica">Cerámica</option>
            </select>
            <button className="btn-primary" onClick={fetchPublicaciones}>
              Buscar
            </button>
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
