import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import api from "../../../api/api.js";
import DetallePublicacionModal from "../panelGeneral/comprador/DetallePublicacionModal.jsx";

const MisOfertas = () => {
  const usuario = useSelector((state) => state.user.usuario);

    const getImageUrl = (imageId) => {
    if (!imageId) return null;

    return `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`;
  };
  const [publicaciones, setPublicaciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [misofertas, setMisOfertas] = useState({});
  const [publicacionSeleccionada, setPublicacionSeleccionada] = useState(null);

  const fetchMiOferta = (publicacionId) => {
    api
      .get(`/oferta/mi-oferta/publicacion/${publicacionId}`)
      .then((res) => {
        setMisOfertas((prev) => ({
          ...prev,
          [publicacionId]: res.data.oferta?.monto
            ? res.data.oferta.monto.toLocaleString()
            : "—",
        }));
      })
      .catch(() => {
        setMisOfertas((prev) => ({
          ...prev,
          [publicacionId]: "—",
        }));
      });
  };

  const actualizarPublicacion = (pubActualizada) => {
    setPublicacionSeleccionada(pubActualizada);

    setPublicaciones((prev) =>
      prev.map((pub) => (pub._id === pubActualizada._id ? pubActualizada : pub)),
    );

    fetchMiOferta(pubActualizada._id);
  };

  useEffect(() => {
    api
      .get("/publicacion/mis-publicaciones", { params: { limit: 100 } })
      .then((res) => {
        const pubs = res.data.publicaciones || res.data || [];
        setPublicaciones(pubs);
        pubs.forEach((pub) => fetchMiOferta(pub._id));
      })
      .catch(() => setPublicaciones([]))
      .finally(() => setCargando(false));
  }, []);

  return (
    <div className="dashboard-body">
        <div className="panel">
          <div className="panel-header">
            <div className="panel-title">
            Mis <em>ofertas</em>
          </div>
        </div>
        <div className="panel-body">
          <table className="obras-table">
            <thead>
              <tr>
                <th style={{ width: 44 }} />
                <th>Obra</th>
                <th>Tipo</th>
                <th>Mi oferta</th>
                <th>Última oferta</th>
                <th>Estado subasta</th>
              </tr>
            </thead>
            <tbody>
              {cargando ? (
                <tr><td colSpan={6} style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)" }}>Cargando mis ofertas…</td></tr>
              ) : publicaciones.length === 0 ? (
                <tr><td colSpan={6} style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)" }}>No tenés ofertas activas.</td></tr>
              ) : publicaciones.map((pub) => {
                const esGanador = pub.estado === "finalizada" && pub.ganador && pub.ganador._id === usuario?._id;
                return (
                <tr
                  key={pub._id}
                  onClick={() => setPublicacionSeleccionada(pub)}
                  style={{
                    cursor: "pointer",
                    ...(esGanador ? {
                      background: "rgba(201,168,76,0.1)",
                      outline: "1px solid rgba(201,168,76,0.45)",
                      borderLeft: "3px solid var(--gold)",
                    } : {}),
                  }}
                >
                  <td>
                    <div
                      className="obra-thumb"
                      style={{
                        backgroundImage: `url(${getImageUrl(pub.obra?.imagenId)})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    />
                  </td>
                  <td>
                    <div className="obra-name">{pub.obra?.titulo}</div>
                    <div className="obra-artist">{pub.obra?.artista}</div>
                  </td>
                  <td style={{ fontSize: ".78rem" }}>{pub.tipoObra?.nombre}</td>
                  <td className="price-col">
                    {misofertas[pub._id] || "Cargando..."}{" "}
                    <span
                      style={{ fontSize: ".7rem", color: "var(--text-muted)" }}
                    >
                      USD
                    </span>
                  </td>
                  <td
                    className="price-col"
                    style={{ color: "var(--gold-light)" }}
                  >
                    {pub.ultimaOferta?.monto ? pub.ultimaOferta.monto.toLocaleString() : "—"}{" "}
                    <span
                      style={{ fontSize: ".7rem", color: "var(--text-muted)" }}
                    >
                      USD
                    </span>
                  </td>
                  <td>
                    <span className="badge" style={esGanador ? {
                      color: "var(--gold-light)",
                      borderColor: "rgba(201,168,76,0.45)",
                      background: "rgba(201,168,76,0.08)",
                    } : pub.estado === "finalizada" ? {
                      color: "var(--text-muted)",
                      borderColor: "var(--border)",
                    } : {
                      color: "#6aaf7e",
                      borderColor: "rgba(106,175,126,0.35)",
                      background: "rgba(106,175,126,0.07)",
                    }}>
                      {pub.estado}
                    </span>
                  </td>
                </tr>
                );
              })}
            </tbody>

          </table>
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

export default MisOfertas;
