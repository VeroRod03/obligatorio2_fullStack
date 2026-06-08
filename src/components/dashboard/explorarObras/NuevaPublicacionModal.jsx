import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTiposObra } from "../../../features/tiposObra/tipoObra.slice.js";
import { useForm } from "react-hook-form";
import api from "../../../api/api.js";
import { toast } from "react-toastify";

const getImageUrl = (imageId) => {
  if (!imageId) return null;
  return `https://www.artic.edu/iiif/2/${imageId}/full/400,/0/default.jpg`;
};

const NuevaPublicacionModal = ({ obra, cerrar }) => {
  const dispatch = useDispatch();
  const tiposObra = useSelector((state) => state.tiposDeObra.tiposObra);
  const [donacion, setDonacion] = useState(false);

  useEffect(() => {
    if (obra && tiposObra.length === 0) {
      api.get("/tipoObra")
        .then((res) => dispatch(setTiposObra(res.data.tiposObra || res.data)))
        .catch(() => {});
    }
  }, [obra]);
  const [guardando, setGuardando] = useState(false);

  const { register, handleSubmit, formState: { isValid } } = useForm({
    mode: "onChange",
    defaultValues: { estado: "activa" },
  });

  if (!obra) return null;

  const onSubmit = (data) => {
    setGuardando(true);
    api
      .post("/publicacion", {
        obra: { id: String(obra.id) },
        tipoObra: data.tipoObra,
        precioBase: Number(data.precioBase),
        estado: data.estado,
        donacion,
      })
      .then(() => {
        toast.success("Publicación creada");
        cerrar();
      })
      .catch((err) => {
        const msg =
          err?.response?.data?.error?.[0]?.message ||
          err?.response?.data?.message ||
          "No se pudo crear la publicación";
        toast.error(msg);
      })
      .finally(() => setGuardando(false));
  };

  return (
    <div className="modal-overlay open" onClick={cerrar}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">Nueva publicación</div>
          <button className="close-btn" onClick={cerrar}>
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1={18} y1={6} x2={6} y2={18} />
              <line x1={6} y1={6} x2={18} y2={18} />
            </svg>
          </button>
        </div>
        <div className="modal-body">

          {/* Preview de la obra seleccionada */}
          <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1.2rem", padding: ".8rem", background: "var(--bg-subtle, rgba(255,255,255,.03))", borderRadius: "8px", border: "1px solid var(--border-subtle)" }}>
            {obra.image_id && (
              <div style={{ width: 56, height: 56, borderRadius: 6, backgroundImage: `url(${getImageUrl(obra.image_id)})`, backgroundSize: "cover", backgroundPosition: "center", flexShrink: 0 }} />
            )}
            <div>
              <div style={{ fontWeight: 500, fontSize: ".9rem" }}>{obra.title}</div>
              <div style={{ fontSize: ".75rem", color: "var(--text-muted)" }}>
                {obra.artist_title}{obra.date_display ? ` · ${obra.date_display}` : ""}
              </div>
              <div style={{ fontSize: ".7rem", color: "var(--text-dim)", marginTop: ".2rem" }}>ID: {obra.id}</div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <p className="form-section-title" style={{ borderBottom: "1px solid var(--border-subtle)", paddingBottom: ".6rem", marginBottom: "1rem" }}>
              Configuración de subasta
            </p>
            <div className="form-row">
              <div className="form-field">
                <label>Tipo de obra</label>
                <select {...register("tipoObra", { required: true })}>
                  <option value="">Seleccioná un tipo…</option>
                  {tiposObra.map((tipo) => (
                    <option key={tipo._id} value={tipo._id}>{tipo.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="form-field">
                <label>Precio base (USD)</label>
                <input type="number" placeholder="ej. 500" min={1} {...register("precioBase", { required: true, min: 1 })} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-field">
                <label>Estado</label>
                <select {...register("estado")}>
                  <option value="activa">Activa</option>
                  <option value="pausada">Pausada</option>
                </select>
              </div>
            </div>
            <div className="form-row" style={{ marginTop: ".5rem" }}>
              <div className="form-field full">
                <div
                  onClick={() => setDonacion((v) => !v)}
                  style={{ display: "flex", alignItems: "center", gap: ".75rem", padding: ".6rem .9rem", borderRadius: "8px", border: `1px solid ${donacion ? "var(--gold)" : "var(--border-subtle)"}`, background: donacion ? "rgba(212,175,55,.08)" : "transparent", cursor: "pointer", transition: "all .2s", userSelect: "none" }}
                >
                  <div style={{ width: "36px", height: "20px", borderRadius: "999px", background: donacion ? "var(--gold)" : "var(--border-subtle)", position: "relative", flexShrink: 0, transition: "background .2s" }}>
                    <div style={{ position: "absolute", top: "3px", left: donacion ? "19px" : "3px", width: "14px", height: "14px", borderRadius: "50%", background: "#fff", transition: "left .2s" }} />
                  </div>
                  <span style={{ fontSize: ".85rem", color: donacion ? "var(--gold)" : "var(--text-muted)", transition: "color .2s", fontWeight: donacion ? 500 : 400 }}>
                    Marcar como donación
                  </span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn-gold"
              style={{ width: "100%", justifyContent: "center", padding: ".9rem", marginTop: "1.2rem" }}
              disabled={!isValid || guardando}
            >
              {guardando ? "Publicando…" : "Publicar obra"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NuevaPublicacionModal;
