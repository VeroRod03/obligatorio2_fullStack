import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router";
import { toast } from "react-toastify";
import api from "../../api/api.js";

const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    setErrorMessage("");
    api
      .post("/auth/login", { email: data.email, password: data.password })
      .then((response) => {
        toast.success(response.data?.mensaje || "Login exitoso");
        localStorage.setItem("email", response.data?.user?.email || "");
        if (response.data?.user.rol === "vendedor") {
          localStorage.setItem("rol", "vendedor");
          navigate("/vendedor/dashboard");
        } else if (response.data?.user.rol === "comprador") {
          localStorage.setItem("rol", "comprador");
          navigate("/comprador/dashboard");
        }
      })
      .catch((error) => {
        const errMsg =
          error?.response?.data?.error?.[0]?.message ||
          error?.response?.data?.message ||
          "Credenciales incorrectas. Verificá tu email y contraseña.";
        setErrorMessage(errMsg);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {errorMessage && (
        <div className="error-banner visible">{errorMessage}</div>
      )}

      <div className="field">
        <label htmlFor="email">Correo electrónico</label>
        <div className="input-wrap">
          <input
            type="email"
            id="email"
            placeholder="nombre@ejemplo.com"
            autoComplete="email"
            {...register("email", { required: true })}
          />
        </div>
        <div id="emailError" className="field-error">
          Ingresá un email válido.
        </div>
      </div>

      <div className="field">
        <label htmlFor="password">Contraseña</label>
        <div className="input-wrap">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="••••••••"
            autoComplete="current-password"
            {...register("password", { required: true })}
          />
          <span
            className={`input-icon${showPassword ? " active" : ""}`}
            onClick={() => setShowPassword((v) => !v)}
            title="Mostrar contraseña"
            role="button"
            tabIndex={0}
          >
            <svg
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx={12} cy={12} r={3} />
            </svg>
          </span>
        </div>
        <div id="passError" className="field-error">
          La contraseña no puede estar vacía.
        </div>
      </div>

      <button
        id="btnLogin"
        className="btn-primary"
        type="submit"
        disabled={!isValid}
      >
        Ingresar
      </button>
      <div className="register-link">
        ¿No tenés cuenta? <Link to="/registro">Registrarse</Link>
      </div>
      <div className="ornament">✦ ✦ ✦</div>
    </form>
  );
};

export default LoginForm;
