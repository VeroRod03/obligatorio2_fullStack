import BrandIconName from "../components/BrandIconName";
import RegistroHeader from "../components/registro/RegistroHeader";
import RegistroForm from "../components/registro/RegistroForm";

const RegistroPage = () => {
  return (
    <>
      <div className="side-deco"></div>
      <div className="main">
        <div className="page-header">
          <BrandIconName />
          <RegistroHeader />
          <RegistroForm />
        </div>
      </div>
      <div className="side-deco"></div>
    </>
  );
};

export default RegistroPage;
