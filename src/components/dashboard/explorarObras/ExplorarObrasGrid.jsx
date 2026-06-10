import { useState, useEffect } from "react";
import axios from "axios";

const getImageUrl = (imageId) => {
  if (!imageId) return null;
  return `https://www.artic.edu/iiif/2/${imageId}/full/400,/0/default.jpg`;
};

const LIMIT = 20;

const ExplorarObrasGrid = ({ buscar, onSeleccionar }) => {
  const [obras, setObras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  useEffect(() => {
    setPagina(1);
  }, [buscar]);

  useEffect(() => {
    setLoading(true);
    const fields = "id,title,artist_title,image_id,date_display";
    const url = buscar?.trim()
      ? `https://api.artic.edu/api/v1/artworks/search?limit=${LIMIT}&page=${pagina}&q=${encodeURIComponent(buscar.trim())}&fields=${fields}`
      : `https://api.artic.edu/api/v1/artworks?limit=${LIMIT}&page=${pagina}&fields=${fields}`;

    axios
      .get(url)
      .then((res) => {
        setObras(res.data.data || []);
        const total = res.data.pagination?.total || 0;
        setTotalPaginas(Math.ceil(total / LIMIT));
      })
      .catch(() => setObras([]))
      .finally(() => setLoading(false));
  }, [buscar, pagina]);

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
    <>
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

      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        marginTop: "1.5rem",
        paddingTop: "1rem",
        borderTop: "1px solid var(--border-subtle)",
      }}>
        <button
          className="btn-ghost"
          style={{ padding: ".4rem 1rem", fontSize: ".8rem", opacity: pagina <= 1 ? .35 : 1 }}
          disabled={pagina <= 1}
          onClick={() => setPagina((p) => p - 1)}
        >
          ← Anterior
        </button>
        <span style={{ fontSize: ".78rem", color: "var(--text-muted)" }}>
          Página <span style={{ color: "var(--text)" }}>{pagina}</span>
          {totalPaginas > 1 && <> de {totalPaginas.toLocaleString()}</>}
        </span>
        <button
          className="btn-ghost"
          style={{ padding: ".4rem 1rem", fontSize: ".8rem", opacity: pagina >= totalPaginas ? .35 : 1 }}
          disabled={pagina >= totalPaginas}
          onClick={() => setPagina((p) => p + 1)}
        >
          Siguiente →
        </button>
      </div>
    </>
  );
};

export default ExplorarObrasGrid;
