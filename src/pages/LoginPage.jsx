import PanelMosaico from "../components/login/PanelMosaico";
import LoginCard from "../components/login/LoginCard";
import "../../materials/login.css";

const LoginPage = () => {
  return (
    <>
      <div className="login-layout">
        <PanelMosaico />
        <LoginCard />
      </div>
    </>
  );
};

export default LoginPage;
