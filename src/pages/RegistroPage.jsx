import BrandIconName from "../components/BrandIconName";
import RegistroHeader from "../components/RegistroHeader";
import RegistroForm from "../components/RegistroForm";

const RegistroPage = () => {
  return (
    <>
      <div class="side-deco"></div>
          <div class="main">
            <div class="page-header">
              <BrandIconName />
              <RegistroHeader />
              <RegistroForm />
            </div>
          </div>
      <div class="side-deco"></div>
    </>
    
  )
};

export default RegistroPage;
