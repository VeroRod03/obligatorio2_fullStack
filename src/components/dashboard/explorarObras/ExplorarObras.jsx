import { useState } from "react";
import ExplorarObrasGrid from "./ExplorarObrasGrid.jsx";
import NuevaPublicacionModal from "./NuevaPublicacionModal.jsx";

const ExplorarObras = () => {
  const [obraSeleccionada, setObraSeleccionada] = useState(null);
  const [buscar, setBuscar] = useState("");
  const [buscarDebounced, setBuscarDebounced] = useState("");

  const handleBuscar = (e) => {
    const val = e.target.value;
    setBuscar(val);
    clearTimeout(window._explorarTimer);
    window._explorarTimer = setTimeout(() => setBuscarDebounced(val), 400);
  };

  return (
    <div className="dashboard-body">
      <div className="panel">
        <div className="panel-header">
          <div className="panel-title">
            Explorar <em>obras</em>
          </div>
          <span style={{ fontSize: ".78rem", color: "var(--text-muted)", alignSelf: "center", fontStyle: "italic" }}>
            Seleccioná una obra para crear su publicación
          </span>
        </div>
        <div className="panel-body">
          <div className="filter-bar">
            <input
              className="filter-input"
              type="text"
              value={buscar}
              onChange={handleBuscar}
              placeholder="Buscar obra, artista…"
            />
          </div>
          <ExplorarObrasGrid
            buscar={buscarDebounced}
            onSeleccionar={setObraSeleccionada}
          />
          <NuevaPublicacionModal
            obra={obraSeleccionada}
            cerrar={() => setObraSeleccionada(null)}
          />
        </div>
      </div>
    </div>
  );
};

export default ExplorarObras;
