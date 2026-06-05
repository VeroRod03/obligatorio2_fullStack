import { useState, useEffect } from "react";

const DetallePublicacionModal = ({ publicacion, cerrar }) => {
  const [mostrarOferta, setMostrarOferta] = useState(false);
  const [montoOferta, setMontoOferta] = useState("");

  if (!publicacion) return null;

  const getImageUrl = (imageId) => {
    if (!imageId) return null;

    return `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`;
  };

  const confirmarOferta = () => {
    console.log("Oferta:", montoOferta);
    // acá después llamarías a tu API
  };

  return (
    <div className="modal-overlay open" onClick={cerrar}>
      <div className="modal modal-detalle" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">{publicacion.obra?.titulo}</div>

          <button className="close-btn" onClick={cerrar}>
            X
          </button>
        </div>

        <div className="modal-body">
          <div className="detalle-layout">
            <div
              className="detalle-img"
              style={{
                backgroundImage: `url(${getImageUrl(publicacion.obra?.imagenId)})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            <div className="detalle-info">
              <div className="detalle-field">
                <span className="detalle-label">Artista</span>

                <span className="detalle-value">
                  {publicacion.obra?.artista}
                </span>
              </div>

              <div className="detalle-field">
                <span className="detalle-label">Tipo de obra</span>

                <span className="detalle-value">
                  {publicacion.tipoObra?.nombre}
                </span>
              </div>

              <div className="detalle-field">
                <span className="detalle-label">Estado</span>

                <span>
                  <span
                    className={`badge ${
                      publicacion.estado === "activa"
                        ? "badge-active"
                        : "badge-pending"
                    }`}
                  >
                    {publicacion.estado}
                  </span>
                </span>
              </div>

              <div className="detalle-field">
                <span className="detalle-label">Precio base</span>

                <span className="detalle-value price-col">
                  {publicacion.precioBase.toLocaleString()} USD
                </span>
              </div>

              <div className="detalle-field">
                <span className="detalle-label">Última oferta</span>

                <span
                  className="detalle-value price-col"
                  style={{
                    color: "var(--gold-light)",
                  }}
                >
                  {publicacion.ultimaOferta
                    ? `${publicacion.ultimaOferta.monto.toLocaleString()} USD`
                    : "Sin ofertas"}
                </span>
              </div>

              <div className="detalle-field">
                <span className="detalle-label">Donación</span>

                <span className="detalle-value">
                  {publicacion.donacion ? "Sí" : "No"}
                </span>
              </div>

              {mostrarOferta && (
                <div
                  style={{
                    marginTop: "1rem",
                  }}
                >
                  <div className="form-section-title">Realizar oferta</div>

                  <input
                    type="number"
                    placeholder="Ingresá tu oferta..."
                    value={montoOferta}
                    onChange={(e) => setMontoOferta(e.target.value)}
                  />

                  <button className="btn-gold" onClick={confirmarOferta}>
                    Confirmar oferta
                  </button>

                  <button
                    className="btn-ghost"
                    onClick={() => setMostrarOferta(false)}
                  >
                    Cancelar
                  </button>
                </div>
              )}

              {!mostrarOferta && (
                <button
                  className="btn-gold"
                  style={{
                    width: "100%",
                    marginTop: "1rem",
                  }}
                  onClick={() => setMostrarOferta(true)}
                >
                  Realizar oferta
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetallePublicacionModal;
