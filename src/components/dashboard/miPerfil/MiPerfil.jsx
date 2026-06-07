import FotoPerfil from "./FotoPerfil";
import DatosPersonales from "./DatosPersonales";

const MiPerfil = () => {
  return (
    <div className="dashboard-body">
      <div className="perfil-layout">
        <FotoPerfil />
        <DatosPersonales />
      </div>
    </div>

  )
}

export default MiPerfil