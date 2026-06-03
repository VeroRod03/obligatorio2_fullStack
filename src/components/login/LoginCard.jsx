import BrandIconName from "../BrandIconName";
import LoginForm from "./LoginForm";
import LoginHeader from "./LoginHeader";

const LoginCard = () => {
  return (
    <div className="panel-right">
      <div className="form-card">
        <div className="brand">
          <BrandIconName />
        </div>
        <LoginHeader />
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginCard;
