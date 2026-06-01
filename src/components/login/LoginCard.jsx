import BrandIconName from "../BrandIconName";
import LoginForm from "./LoginForm";
import LoginHeader from "./LoginHeader";

const LoginCard = () => {
  return (
    <div className="panel-right">
      <div className="form-card">
        <BrandIconName />
        <LoginHeader />
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginCard;
