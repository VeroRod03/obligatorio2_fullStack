import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import api from "../../../api/api.js";
import { setUsuario } from "../../../features/usuario/usuario.slice.js";
import UsoPlan from "../panelGeneral/vendedor/UsoPlan.jsx";

const LIMIT_PLUS = 4;

const CheckIcon = () => (
  <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const XIcon = () => (
  <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1={18} y1={6} x2={6} y2={18} /><line x1={6} y1={6} x2={18} y2={18} />
  </svg>
);

const MiPlan = () => {
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.user.usuario);
  const esPlus = (usuario?.subscripcion || "plus") === "plus";

  const [totalPubs, setTotalPubs] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [actualizando, setActualizando] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);

  useEffect(() => {
    api.get("/publicacion/mis-publicaciones", { params: { limit: 100 } })
      .then((res) => {
        const pubs = res.data.publicaciones || res.data || [];
        setTotalPubs(pubs.length);
      })
      .catch(() => setTotalPubs(0))
      .finally(() => setCargando(false));
  }, []);

  const confirmarUpgrade = () => {
    setActualizando(true);
    api.patch("/usuario/plan/premium")
      .then((res) => {
        const usuarioActualizado = res.data.usuario || { ...usuario, subscripcion: "premium" };
        dispatch(setUsuario(usuarioActualizado));
        toast.success(res.data?.mensaje || "¡Bienvenido a Premium!");
        setModalConfirm(false);
      })
      .catch((err) => toast.error(err?.response?.data?.message || "No se pudo actualizar el plan"))
      .finally(() => setActualizando(false));
  };

  const usoPct = esPlus ? Math.min(Math.round((totalPubs / LIMIT_PLUS) * 100), 100) : null;

  return (
    <>
      <div className="dashboard-body">
        <div className="plan-page-layout">

          <UsoPlan esPlus={esPlus} totalPubs={totalPubs} LIMIT_PLUS={LIMIT_PLUS} usoPct={usoPct} />
          {/* Cards de planes */}
          <div className="plan-options">

            {/* Plus */}
            <div className={`plan-option-card${esPlus ? " plan-option-current" : ""}`}>
              {esPlus && <div className="plan-option-badge">Actual</div>}
              <div className="plan-option-name">Plus</div>
              <div className="plan-option-price">Gratis</div>
              <ul className="plan-option-features">
                <li><CheckIcon /> Hasta 4 publicaciones</li>
                <li style={{ opacity: .45 }}><XIcon /> Publicaciones ilimitadas</li>
              </ul>
              <button
                className="btn-ghost"
                style={{ width: "100%", justifyContent: "center", padding: ".8rem", opacity: .4 }}
                disabled
              >
                {esPlus ? "Plan actual" : "No disponible"}
              </button>
            </div>

            {/* Premium */}
            <div className={`plan-option-card${!esPlus ? " plan-option-current" : ""}`}>
              {!esPlus && <div className="plan-option-badge">Actual</div>}
              <div className="plan-option-name">Premium</div>
              <div className="plan-option-price">
                $24.99 <span style={{ fontSize: ".8rem", color: "var(--text-muted)" }}>/mes</span>
              </div>
              <ul className="plan-option-features">
                <li><CheckIcon /> Hasta 4 publicaciones</li>
                <li><CheckIcon /> Publicaciones ilimitadas</li>
              </ul>
              <button
                className="btn-gold"
                style={{ width: "100%", justifyContent: "center", padding: ".8rem", ...((!esPlus) ? { opacity: .4 } : {}) }}
                disabled={!esPlus}
                onClick={() => esPlus && setModalConfirm(true)}
              >
                {!esPlus ? "Plan actual" : "Actualizar"}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Modal confirmación upgrade */}
      {modalConfirm && (
        <div className="modal-overlay open" onClick={() => setModalConfirm(false)}>
          <div className="modal" style={{ maxWidth: 400 }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-title">Actualizar a Premium</span>
              <button className="close-btn" onClick={() => setModalConfirm(false)}>
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1={18} y1={6} x2={6} y2={18} /><line x1={6} y1={6} x2={18} y2={18} />
                </svg>
              </button>
            </div>
            <div className="modal-body" style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
              <p style={{ fontSize: ".88rem", color: "var(--text-secondary, #ccc)", lineHeight: 1.6 }}>
                Estás por actualizar tu plan a <em style={{ color: "var(--text)" }}>Premium</em>. Esta acción no se puede deshacer.
              </p>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: ".6rem" }}>
                <button className="btn-mini cancel" onClick={() => setModalConfirm(false)}>Cancelar</button>
                <button className="btn-mini save" onClick={confirmarUpgrade} disabled={actualizando}>
                  {actualizando ? "Actualizando…" : "Confirmar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MiPlan;
