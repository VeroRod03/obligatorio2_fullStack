import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUsuario } from "../../../features/usuario/usuario.slice.js";
import api from "../../../api/api.js";
import { toast } from "react-toastify";

const FotoPerfil = () => {
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.user.usuario);
  const fileInputRef = useRef(null);

  const nombre = usuario?.nombreCompleto?.nombre || "";
  const apellido = usuario?.nombreCompleto?.apellido || "";
  const iniciales =
    nombre && apellido ? `${nombre[0]}${apellido[0]}`.toUpperCase() : "—";

  const [preview, setPreview] = useState(usuario?.urlFotoPerfil || null);
  const [archivoSeleccionado, setArchivoSeleccionado] = useState(null);
  const [guardando, setGuardando] = useState(false);

  const handleSeleccion = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setArchivoSeleccionado(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleGuardar = () => {
    if (!archivoSeleccionado) return;
    setGuardando(true);

    const formData = new FormData();
    formData.append("imagen", archivoSeleccionado);
    formData.append("folder", "fotoPerfil");

    api
      .post("/uploads", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        const url = res.data?.url;
        dispatch(setUsuario({ ...usuario, urlFotoPerfil: url }));
        setPreview(url);
        setArchivoSeleccionado(null);
        toast.success("Foto actualizada");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Error al subir la foto");
      })
      .finally(() => setGuardando(false));
  };

  return (
    <div className="panel perfil-avatar-panel">
      <div className="panel-header">
        <div className="panel-title">
          Foto de <em>perfil</em>
        </div>
      </div>
      <div
        className="panel-body"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.2rem",
          padding: "2rem 1.5rem",
        }}
      >
        <div
          className="avatar-upload-area"
          onClick={() => fileInputRef.current.click()}
          style={{ cursor: "pointer" }}
        >
          <div className="avatar-preview">
            {preview ? (
              <img
                src={preview}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <span>{iniciales}</span>
            )}
          </div>
          <div className="avatar-overlay">
            <svg
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx={12} cy={13} r={4} />
            </svg>
            <span>Cambiar foto</span>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleSeleccion}
        />

        <p
          style={{
            fontSize: ".72rem",
            color: "var(--text-dim)",
            textAlign: "center",
          }}
        >
          JPG, PNG · máx. 2 MB
          <br />
          La imagen se recortará en círculo
        </p>

        <button
          className="btn-gold"
          style={{ width: "100%", justifyContent: "center" }}
          onClick={handleGuardar}
          disabled={!archivoSeleccionado || guardando}
        >
          {guardando ? "Guardando..." : "Guardar foto"}
        </button>
      </div>
    </div>
  );
};

export default FotoPerfil;
