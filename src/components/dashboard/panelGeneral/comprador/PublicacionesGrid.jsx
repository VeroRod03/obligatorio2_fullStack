const PublicacionesGrid = ({ publicaciones, onSeleccionar, cargando, pagina, totalPaginas, onPagina }) => {
  const getImageUrl = (imageId) => {
    if (!imageId) return null;
    return `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`;
  };

  if (cargando) {
    return (
      <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)", fontSize: ".88rem" }}>
        Cargando mis publicaciones…
      </div>
    );
  }

  if (publicaciones.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)", fontSize: ".88rem" }}>
        No se encontraron publicaciones.
      </div>
    );
  }

  return (
    <>
    <div className="pub-grid">
      {publicaciones.map((pub) => (
        <div
          key={pub._id}
          className="pub-card"
          onClick={() => onSeleccionar(pub)}
        >
          <div
            className="pub-card-img"
            style={{
              backgroundImage: `url(${getImageUrl(pub.obra?.imagenId)})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="pub-card-tipo">{pub.tipoObra?.nombre}</div>
            {pub.donacion && <div className="pub-card-donacion">Donación</div>}
          </div>

          <div className="pub-card-body">
            <div className="pub-card-title">{pub.obra?.titulo}</div>
            <div className="pub-card-artist">{pub.obra?.artista}</div>
            <div className="pub-card-price">
              {pub.ultimaOferta ? (
                <span style={{ color: "var(--gold-light)" }}>
                  Última: {pub.ultimaOferta.monto.toLocaleString()} USD
                </span>
              ) : (
                <span style={{ color: "var(--text-muted)" }}>
                  Base: {pub.precioBase.toLocaleString()} USD
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
    {totalPaginas > 1 && (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem", marginTop: "1.5rem", fontSize: ".82rem", color: "var(--text-muted)" }}>
        <button
          className="btn-ghost"
          style={{ padding: ".3rem .8rem", fontSize: ".8rem", opacity: pagina <= 1 ? .35 : 1 }}
          disabled={pagina <= 1}
          onClick={() => onPagina(pagina - 1)}
        >← Anterior</button>
        <span>Página {pagina} de {totalPaginas}</span>
        <button
          className="btn-ghost"
          style={{ padding: ".3rem .8rem", fontSize: ".8rem", opacity: pagina >= totalPaginas ? .35 : 1 }}
          disabled={pagina >= totalPaginas}
          onClick={() => onPagina(pagina + 1)}
        >Siguiente →</button>
      </div>
    )}
    </>
  );
};

export default PublicacionesGrid;
