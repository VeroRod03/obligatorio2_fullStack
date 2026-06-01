import PanelMosaico from "../components/login/PanelMosaico";
import LoginCard from "../components/login/LoginCard";

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
