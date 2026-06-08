import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import api from "../../../api/api.js";

const LIMIT_PLUS = 4;

const TopbarNuevaPublicacion = ({ setVista }) => {
  const usuario = useSelector((state) => state.user.usuario);
  const [totalPubs, setTotalPubs] = useState(0);

  useEffect(() => {
    api.get("/publicacion/mis-publicaciones", { params: { limit: 100 } })
      .then((res) => {
        const pubs = res.data.publicaciones || res.data || [];
        setTotalPubs(pubs.length);
      })
      .catch(() => {});
  }, []);

  const esPlus = (usuario?.subscripcion || "plus") === "plus";
  const limitAlcanzado = esPlus && totalPubs >= LIMIT_PLUS;

  return (
    <div className="topbar-actions" id="topbarActions">
      <button
        className="btn-gold"
        id="btnNuevaPublicacion"
        onClick={() => !limitAlcanzado && setVista("explorar")}
        disabled={limitAlcanzado}
        title={limitAlcanzado ? `Límite del plan Plus alcanzado (${LIMIT_PLUS}/${LIMIT_PLUS})` : "Nueva publicación"}
        style={limitAlcanzado ? { opacity: 0.4, cursor: "not-allowed", filter: "grayscale(60%)" } : {}}
      >
        <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <line x1={12} y1={5} x2={12} y2={19} />
          <line x1={5} y1={12} x2={19} y2={12} />
        </svg>
        Nueva publicación
      </button>
    </div>
  );
};

export default TopbarNuevaPublicacion;