import { useState, useEffect } from "react";
import api from "../../../api/api.js";
import DetallePublicacionModal from "../panelGeneral/comprador/DetallePublicacionModal.jsx";

const MisOfertas = () => {

    const getImageUrl = (imageId) => {
    if (!imageId) return null;

    return `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`;
  };
  const [publicaciones, setPublicaciones] = useState([]);
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
      .get("/publicacion/mis-publicaciones")
      .then((res) => {
        console.log("MisOfertas response:", res.data.publicaciones || res.data);
        const pubs = res.data.publicaciones || res.data || [];
        setPublicaciones(pubs);
        
        // Cargar las ofertas para cada publicación
        pubs.forEach((pub) => {
          fetchMiOferta(pub._id);
        });
      })
      .catch((err) => {
        console.log("MisOfertas error:", err);
        setPublicaciones([]);
      });
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
              {publicaciones.length === 0 ? (
                <tr><td colSpan={6} style={{ textAlign: "center", padding: "2rem" }}>No tenés ofertas activas.</td></tr>
              ) : publicaciones.map((pub) => (
                <tr key={pub._id} onClick={() => setPublicacionSeleccionada(pub)} style={{ cursor: "pointer" }}>
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
                    <span className="badge badge-active">Activa</span>
                  </td>
                </tr>
              ))}
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
