import { useState, useEffect } from "react";
import api from "../../../../api/api.js";

const DetallePublicacionModal = ({
  publicacion,
  cerrar,
  actualizarPublicacion,
}) => {
  const [mostrarOferta, setMostrarOferta] = useState(false);
  const [montoOferta, setMontoOferta] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  if (!publicacion) return null;

  const getImageUrl = (imageId) => {
    if (!imageId) return null;

    return `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`;
  };

  const confirmarOferta = () => {
    console.log("Oferta:", montoOferta);
    api
      .post(`/oferta/publicacion/${publicacion._id}`, { monto: montoOferta })
      .then((res) => {
        setMostrarOferta(false);
        setMontoOferta("");
        setErrorMessage("");
        actualizarPublicacion({
          ...publicacion,
          ultimaOferta: res.data.oferta,
        });
      })
      .catch((error) => {
        const errMsg =
          error?.response?.data?.error?.[0]?.message ||
          error?.response?.data?.message ||
          "Monto de oferta incorrecto.";
        setErrorMessage(errMsg);
      });
  };

  const cerrarModal = () => {
    setMostrarOferta(false);
    setMontoOferta("");
    setErrorMessage("");
    cerrar();
  };

  return (
    <div className="modal-overlay open" onClick={cerrarModal}>
      <div className="modal modal-detalle" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">{publicacion.obra?.titulo}</div>

          <button className="close-btn" onClick={cerrarModal}>
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

                  {errorMessage && (
                    <div className="error-banner visible">{errorMessage}</div>
                  )}
                  <input
                    type="number"
                    placeholder="Ingresá tu oferta..."
                    value={montoOferta}
                    onChange={(e) => setMontoOferta(e.target.value)}
                  />

                  <div className="oferta-actions">
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
                </div>
              )}

              {!mostrarOferta && (
                <button
                  className="btn-gold"
                  style={{
                    marginTop: "1rem",
                    alignSelf: "flex-start",
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
