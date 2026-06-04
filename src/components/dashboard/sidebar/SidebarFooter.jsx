import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import api from "../../../api/api.js";

const SidebarFooter = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
  api
    .get(`/usuario/${userId}`)
    .then((response) => {
      console.log("Usuario cargado:", response.data);
      setUsuario(response.data.usuario);
    })
    .catch((error) => {
      console.log("Error:", error);
      setUsuario(null);
    });
}, []);



  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const nombre = usuario?.nombreCompleto?.nombre || "";
  const apellido = usuario?.nombreCompleto?.apellido || "";
  const nombreCompleto = usuario ? `${nombre} ${apellido}`.trim() : "—";
  const iniciales = nombre && apellido ? `${nombre[0]}${apellido[0]}`.toUpperCase() : "—";
  const rol = usuario?.rol
    ? usuario.rol.charAt(0).toUpperCase() + usuario.rol.slice(1)
    : localStorage.getItem("rol") || "—";

  return (
    <div className="sidebar-footer">
      <div className="user-pill">
        <div className="user-avatar">{iniciales}</div>
        <div className="user-info">
          <div className="user-name">{nombreCompleto}</div>
          <div className="user-role">{rol}</div>
        </div>
        <button className="logout-btn" title="Cerrar sesión" onClick={handleLogout}>
          <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1={21} y1={12} x2={9} y2={12} />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SidebarFooter;
