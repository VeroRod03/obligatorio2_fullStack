import BrandIconName from "../components/BrandIconName";
import RegistroHeader from "../components/registro/RegistroHeader";
import RegistroForm from "../components/registro/RegistroForm";
import "../../materials/registro.css";

const RegistroPage = () => {
  return (
    <div className="registro-layout">
      <div className="side-deco"></div>
      <div className="main">
        <div className="page-header">
          <BrandIconName />
          <RegistroHeader />
          <RegistroForm />
        </div>
      </div>
      <div className="side-deco"></div>
    </div>
  );
};

export default RegistroPage;
