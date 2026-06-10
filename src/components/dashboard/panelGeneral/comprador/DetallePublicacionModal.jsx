import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../../../api/api.js";

const DetallePublicacionModal = ({
  publicacion,
  cerrar,
  actualizarPublicacion,
}) => {
  const [mostrarOferta, setMostrarOferta] = useState(false);
  const [montoOferta, setMontoOferta] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [mostrarBio, setMostrarBio] = useState(false);

  if (!publicacion) return null;

  const getImageUrl = (imageId) => {
    if (!imageId) return null;
    return `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`;
  };

  const confirmarOferta = () => {
    api
      .post(`/oferta/publicacion/${publicacion._id}`, { monto: montoOferta })
      .then((res) => {
        toast.success(res.data?.mensaje || "¡Oferta realizada con éxito!");
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

  const bio = publicacion.obra?.biografia?.trim();

  return (
    <>
      <div className="modal-overlay open" onClick={cerrarModal}>
        <div className="modal modal-detalle" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <div className="modal-title">{publicacion.obra?.titulo}</div>
            <button className="close-btn" onClick={cerrarModal}>
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1={18} y1={6} x2={6} y2={18} /><line x1={6} y1={6} x2={18} y2={18} />
              </svg>
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
                  <span
                    className="detalle-value"
                    onClick={() => setMostrarBio(true)}
                    style={{
                      cursor: "pointer",
                      color: "var(--gold-light)",
                      textDecoration: "underline",
                      textDecorationColor: "rgba(201,168,76,0.4)",
                      textUnderlineOffset: "3px",
                    }}
                  >
                    {publicacion.obra?.artista}
                  </span>
                </div>

                <div className="detalle-field">
                  <span className="detalle-label">Tipo de obra</span>
                  <span className="detalle-value">{publicacion.tipoObra?.nombre}</span>
                </div>

                <div className="detalle-field">
                  <span className="detalle-label">Estado</span>
                  <span>
                    <span className={`badge ${publicacion.estado === "activa" ? "badge-active" : "badge-pending"}`}>
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
                  <span className="detalle-value price-col" style={{ color: "var(--gold-light)" }}>
                    {publicacion.ultimaOferta
                      ? `${publicacion.ultimaOferta.monto.toLocaleString()} USD`
                      : "Sin ofertas"}
                  </span>
                </div>

                <div className="detalle-field">
                  <span className="detalle-label">Donación</span>
                  <span className="detalle-value">{publicacion.donacion ? "Sí" : "No"}</span>
                </div>

                {mostrarOferta && (
                  <div style={{ marginTop: "1rem" }}>
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
                      <button className="btn-gold" onClick={confirmarOferta}>Confirmar oferta</button>
                      <button className="btn-ghost" onClick={() => setMostrarOferta(false)}>Cancelar</button>
                    </div>
                  </div>
                )}

                {!mostrarOferta && (
                  <button
                    className="btn-gold"
                    style={{
                      marginTop: "1rem",
                      alignSelf: "flex-start",
                      ...(publicacion.estado === "finalizada" ? { opacity: 0.4, cursor: "not-allowed", filter: "grayscale(60%)" } : {}),
                    }}
                    disabled={publicacion.estado === "finalizada"}
                    onClick={() => publicacion.estado !== "finalizada" && setMostrarOferta(true)}
                  >
                    Realizar oferta
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal biografía */}
      {mostrarBio && (
        <div
          className="modal-overlay open"
          style={{ zIndex: 1100 }}
          onClick={() => setMostrarBio(false)}
        >
          <div
            className="modal"
            style={{ maxWidth: 480 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <span className="modal-title">{publicacion.obra?.artista}</span>
              <button className="close-btn" onClick={() => setMostrarBio(false)}>
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1={18} y1={6} x2={6} y2={18} /><line x1={6} y1={6} x2={18} y2={18} />
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: ".88rem", color: "var(--text-secondary, #ccc)", lineHeight: 1.7 }}>
                {bio || "No hay biografía disponible para este artista."}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetallePublicacionModal;
