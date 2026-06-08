//recibe la funcion onSeleccionar que en relaidad es el setPublicacionSeleccionada del padre
const PublicacionesGrid = ({ publicaciones, onSeleccionar }) => {
  const getImageUrl = (imageId) => {
    if (!imageId) return null;

    return `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`;
  };

  if (publicaciones.length === 0) {
    return <p>No se encontraron publicaciones.</p>;
  }

  return (
    <div className="pub-grid">
      {publicaciones.map((pub) => (
        <div
          key={pub._id}
          className="pub-card"
          /* Al hacer click en la tarjeta, se llama a onSeleccionar para settar la publicacion seleccionada */
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
                  Última:
                  {pub.ultimaOferta.monto.toLocaleString()} USD
                </span>
              ) : (
                <span style={{ color: "var(--text-muted)" }}>
                  Base:
                  {pub.precioBase.toLocaleString()} USD
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PublicacionesGrid;
