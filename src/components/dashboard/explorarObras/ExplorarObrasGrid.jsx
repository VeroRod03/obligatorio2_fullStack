import { useState, useEffect } from "react";
import axios from "axios";

const getImageUrl = (imageId) => {
  if (!imageId) return null;
  return `https://www.artic.edu/iiif/2/${imageId}/full/400,/0/default.jpg`;
};

const ExplorarObrasGrid = ({ buscar, onSeleccionar }) => {
  const [obras, setObras] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fields = "id,title,artist_title,image_id,date_display";
    const url = buscar?.trim()
      ? `https://api.artic.edu/api/v1/artworks/search?limit=20&q=${encodeURIComponent(buscar.trim())}&fields=${fields}`
      : `https://api.artic.edu/api/v1/artworks?limit=20&fields=${fields}`;

    axios
      .get(url)
      .then((res) => setObras(res.data.data || []))
      .catch(() => setObras([]))
      .finally(() => setLoading(false));
  }, [buscar]);

  if (loading)
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)" }}>
        Cargando obras…
      </div>
    );

  if (obras.length === 0)
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)" }}>
        No se encontraron obras.
      </div>
    );

  return (
    <div className="pub-grid explorar-grid">
      {obras.map((obra) => (
        <div
          key={obra.id}
          className="pub-card"
          style={{ cursor: "pointer" }}
          onClick={() => onSeleccionar(obra)}
        >
          <div
            className="pub-card-img"
            style={
              obra.image_id
                ? { backgroundImage: `url(${getImageUrl(obra.image_id)})`, backgroundSize: "cover", backgroundPosition: "center" }
                : { background: "linear-gradient(135deg,#1a0f0a,#2d1a0d)" }
            }
          />
          <div className="pub-card-body">
            <div className="pub-card-title">{obra.title || "Sin título"}</div>
            <div className="pub-card-artist">
              {obra.artist_title || "Artista desconocido"}
              {obra.date_display ? ` · ${obra.date_display}` : ""}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExplorarObrasGrid;
