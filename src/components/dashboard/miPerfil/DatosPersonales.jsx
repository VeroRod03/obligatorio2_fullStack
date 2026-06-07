import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const DatosPersonales = () => {
  const usuario = useSelector((state) => state.user.usuario);

  const nombre = usuario?.nombreCompleto?.nombre || "";
  const apellido = usuario?.nombreCompleto?.apellido || "";
  const email = usuario?.email || "—";
  const iniciales =
    nombre && apellido ? `${nombre[0]}${apellido[0]}`.toUpperCase() : "—";

  return (
    <div className="panel perfil-datos-panel">
      <div className="panel-header">
        <div className="panel-title">
          Datos <em>personales</em>
        </div>
      </div>
      <div className="panel-body">
        <div className="form-section-title">Información general</div>
        <div className="form-row">
          <div className="form-field">
            <label>Nombre</label>
            <input type="text" value={nombre} readOnly style={{ cursor: "default", opacity: 0.6, pointerEvents: "none" }} />
          </div>
          <div className="form-field">
            <label>Apellido</label>
            <input type="text" value={apellido} readOnly style={{ cursor: "default", opacity: 0.6, pointerEvents: "none" }} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-field full">
            <label>Email</label>
            <input type="email" value={email} readOnly style={{ cursor: "default", opacity: 0.6, pointerEvents: "none" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatosPersonales;
