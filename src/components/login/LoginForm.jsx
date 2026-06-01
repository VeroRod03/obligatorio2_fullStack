const LoginForm = () => {
  return (
    <>
      {" "}
      <div id="errorBanner" className="error-banner">
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
            oninput="validateLogin()"
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
            type="password"
            id="password"
            placeholder="••••••••"
            autoComplete="current-password"
            oninput="validateLogin()"
          />
          <span
            className="input-icon"
            onclick="togglePass('password', this)"
            title="Mostrar contraseña"
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
      <div className="options-row">
        <label className="remember">
          {" "}
          <input type="checkbox" /> Recordarme{" "}
        </label>
        <a href="#" className="forgot">
          ¿Olvidaste tu contraseña?
        </a>
      </div>
      <button
        id="btnLogin"
        className="btn-primary"
        disabled=""
        onclick="handleLogin()"
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
