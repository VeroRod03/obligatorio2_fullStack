const ModalConfirmacion = ({ modalConfirmacion, onConfirm, onCancel }) => {
  const tipo = modalConfirmacion?.tipo;
  const titulo = modalConfirmacion?.titulo;

  const headerText = tipo === "eliminar"
    ? "Eliminar publicación"
    : tipo === "sin-oferta"
    ? "No se puede finalizar"
    : "Finalizar publicación";

  const bodyText = tipo === "eliminar"
    ? <>¿Eliminar <em style={{ color: "var(--text)" }}>{titulo}</em>? Esta acción no se puede deshacer.</>
    : tipo === "sin-oferta"
    ? <><em style={{ color: "var(--text)" }}>{titulo}</em> no tiene ofertas. Solo se puede finalizar una publicación con al menos una oferta recibida.
    Si lo desea, puede ir a modificar su estado a cancelada.</>
    : <>¿Finalizar <em style={{ color: "var(--text)" }}>{titulo}</em>? La publicación no podrá volver a activarse.</>;

  return (
    <div className={`modal-overlay${modalConfirmacion ? " open" : ""}`} onClick={onCancel}>
      <div className="modal" style={{ maxWidth: 400 }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">{headerText}</span>
          <button className="close-btn" onClick={onCancel}>
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1={18} y1={6} x2={6} y2={18} /><line x1={6} y1={6} x2={18} y2={18} />
            </svg>
          </button>
        </div>
        <div className="modal-body" style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          <p style={{ fontSize: ".88rem", color: "var(--text-secondary, #ccc)", lineHeight: 1.6 }}>
            {bodyText}
          </p>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: ".6rem" }}>
            <button className="btn-mini cancel" onClick={onCancel}>Cancelar</button>
            {tipo !== "sin-oferta" && (
              <button
                className="btn-mini save"
                style={tipo === "eliminar" ? { borderColor: "#e05252", color: "#e05252" } : {}}
                onClick={onConfirm}
              >
                {tipo === "eliminar" ? "Eliminar" : "Finalizar"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmacion;
