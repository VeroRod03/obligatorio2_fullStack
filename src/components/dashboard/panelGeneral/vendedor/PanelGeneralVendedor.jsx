import { useState } from "react";
import StatsVendedor from "./StatsVendedor.jsx";
import MisPublicaciones from "./MisPublicaciones.jsx";

const PanelGeneralVendedor = () => {
  const [totalPubs, setTotalPubs] = useState(0);

  return (
    <div className="dashboard-body">
      <StatsVendedor totalPubs={totalPubs} />
      <MisPublicaciones onTotalChange={setTotalPubs} />
    </div>
  );
};

export default PanelGeneralVendedor;
