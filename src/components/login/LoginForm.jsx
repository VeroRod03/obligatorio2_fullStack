import { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);

  const isFormValid = email.trim().length > 0 && password.length > 0;

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const togglePass = () => {
    setShowPassword((current) => !current);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    // Placeholder — se conectará con POST /auth/login
    setErrorVisible(false);

    if (!isFormValid) {
      setErrorVisible(true);
      return;
    }

    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPassword", password);

    console.log("Intento de login", { email });
  };

  return (
    <>
      <div className={`error-banner${errorVisible ? " visible" : ""}`}>
        Credenciales incorrectas. Verificá tu email y contraseña.
      </div>
      <div className="field">
        <label htmlFor="email">Correo electrónico</label>
        <div className="input-wrap">
          <input
            type="email"
            id="email"
            placeholder="nombre@ejemplo.com"
            autoComplete="email"
            value={email}
            onChange={handleEmailChange}
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
            value={password}
            onChange={handlePasswordChange}
          />
          <span
            className={`input-icon${showPassword ? " active" : ""}`}
            onClick={togglePass}
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
        disabled={!isFormValid}
        onClick={handleLogin}
      >
        Ingresar
      </button>
      <div className="register-link">
        ¿No tenés cuenta?<a href="registro.html">Registrarse</a>
      </div>
      <div className="ornament">✦ ✦ ✦</div>
    </>
  );
};

export default LoginForm;
