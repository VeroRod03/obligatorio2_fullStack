const ModalConfirmacion = ({ modalConfirmacion, onConfirm, onCancel }) => {
  return (
    <div className={`modal-overlay${modalConfirmacion ? " open" : ""}`} onClick={onCancel}>
      <div className="modal" style={{ maxWidth: 400 }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">
            {modalConfirmacion?.tipo === "eliminar" ? "Eliminar publicación" : "Finalizar publicación"}
          </span>
          <button className="close-btn" onClick={onCancel}>
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1={18} y1={6} x2={6} y2={18} /><line x1={6} y1={6} x2={18} y2={18} />
            </svg>
          </button>
        </div>
        <div className="modal-body" style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          <p style={{ fontSize: ".88rem", color: "var(--text-secondary, #ccc)", lineHeight: 1.6 }}>
            {modalConfirmacion?.tipo === "eliminar"
              ? <>¿Eliminar <em style={{ color: "var(--text)" }}>{modalConfirmacion?.titulo}</em>? Esta acción no se puede deshacer.</>
              : <>¿Finalizar <em style={{ color: "var(--text)" }}>{modalConfirmacion?.titulo}</em>? La publicación no podrá volver a activarse.</>
            }
          </p>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: ".6rem" }}>
            <button className="btn-mini cancel" onClick={onCancel}>Cancelar</button>
            <button
              className="btn-mini save"
              style={modalConfirmacion?.tipo === "eliminar" ? { borderColor: "#e05252", color: "#e05252" } : {}}
              onClick={onConfirm}
            >
              {modalConfirmacion?.tipo === "eliminar" ? "Eliminar" : "Finalizar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmacion;
