import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router";
import { toast } from "react-toastify";
import api from "../../api/api.js";

const RegistroForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: { rol: "vendedor" },
    mode: "onChange",
  });

  const onSubmit = (data) => {
    setErrorMessage("");
    api
      .post("/auth/registro", {
        rol: data.rol,
        nombreCompleto: `${data.nombre} ${data.apellido}`,
        email: data.email,
        password: data.password,
        confirmedPassword: data.confirmPass,
      })
      .then((response) => {
        toast.success(response.data?.mensaje || "Registro exitoso");
        navigate("/login");
      })
      .catch((error) => {
        const errMsg =
          error?.response?.data?.error?.[0]?.message ||
          error?.response?.data?.message ||
          "No fue posible completar el registro. Verificá los datos.";
        setErrorMessage(errMsg);
      });
  };

  const checkStrength = () => {
    const val = document.getElementById("password").value;
    const segs = ["s1", "s2", "s3", "s4"];
    const label = document.getElementById("strengthLabel");
    let score = 0;
    if (val.length >= 1) score++;
    if (val.length >= 4) score++;
    if (val.length >= 6) score++;
    if (val.length >= 8) score++;

    const cls =
      score <= 1
        ? "active-weak"
        : score <= 2
          ? "active-medium"
          : "active-strong";
    const labels = ["", "Débil", "Regular", "Buena", "Fuerte"];
    segs.forEach((id, i) => {
      const el = document.getElementById(id);
      el.className = "strength-segment" + (i < score ? " " + cls : "");
    });
    label.textContent = val.length ? labels[score] : "";
  };

  return (
    <form className="form-card" onSubmit={handleSubmit(onSubmit)}>
      {/* Rol */}
      <p className="section-title">¿Cómo vas a usar la plataforma?</p>
      <div className="role-selector">
        <div className="role-option">
          <input
            type="radio"
            id="rolVendedor"
            value="vendedor"
            {...register("rol")}
          />
          <label htmlFor="rolVendedor" className="role-label">
            <span className="role-icon">
              <svg
                width={22}
                height={22}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
              >
                <rect x={3} y={7} width={18} height={14} rx={1} />
                <path d="M16 7V5a2 2 0 0 0-4 0v2" />
                <path d="M8 7V5a2 2 0 0 0-4 0v2" />
                <path d="M3 11h18" />
              </svg>
            </span>
            <span className="role-title">Vendedor</span>
            <span className="role-desc">Publicar y subastar obras</span>
          </label>
        </div>
        <div className="role-option">
          <input
            type="radio"
            id="rolComprador"
            value="comprador"
            {...register("rol")}
          />
          <label htmlFor="rolComprador" className="role-label">
            <span className="role-icon">
              <svg
                width={22}
                height={22}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
              >
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1={3} y1={6} x2={21} y2={6} />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
            </span>
            <span className="role-title">Comprador</span>
            <span className="role-desc">Explorar y ofertar en subastas</span>
          </label>
        </div>
      </div>

      {/* Error banner */}
      {errorMessage && (
        <div className="error-banner visible">{errorMessage}</div>
      )}

      {/* Datos personales */}
      <p className="section-title">Datos personales</p>
      <div className="fields-grid">
        <div className="field">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            placeholder="María"
            {...register("nombre")}
          />
          {errors.nombre && (
            <div className="field-error">{errors.nombre.message}</div>
          )}
        </div>
        <div className="field">
          <label htmlFor="apellido">Apellido</label>
          <input
            type="text"
            id="apellido"
            placeholder="García"
            {...register("apellido")}
          />
          {errors.apellido && (
            <div className="field-error">{errors.apellido.message}</div>
          )}
        </div>
        <div className="field full">
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            placeholder="nombre@ejemplo.com"
            {...register("email")}
          />
          {errors.email && (
            <div className="field-error">{errors.email.message}</div>
          )}
        </div>
      </div>

      {/* Seguridad */}
      <p className="section-title">Seguridad</p>
      <div className="fields-grid">
        <div className="field full">
          <label htmlFor="password">Contraseña</label>
          <div className="input-wrap">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Mínimo 8 caracteres"
              {...register("password")}
              onInput={checkStrength}
            />
            <span
              className={`input-icon${showPassword ? " active" : ""}`}
              onClick={() => setShowPassword((v) => !v)}
              role="button"
              tabIndex={0}
              title="Mostrar contraseña"
            >
              <svg
                width={15}
                height={15}
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
          {errors.password && (
            <div className="field-error">{errors.password.message}</div>
          )}
        </div>
        <div className="field full">
          <label htmlFor="confirmPass">Confirmar contraseña</label>
          <div className="input-wrap">
            <input
              type={showConfirm ? "text" : "password"}
              id="confirmPass"
              placeholder="Repetí la contraseña"
              {...register("confirmPass")}
            />
            <span
              className={`input-icon${showConfirm ? " active" : ""}`}
              onClick={() => setShowConfirm((v) => !v)}
              role="button"
              tabIndex={0}
              title="Mostrar contraseña"
            >
              <svg
                width={15}
                height={15}
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
          {errors.confirmPass && (
            <div className="field-error">{errors.confirmPass.message}</div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="form-footer">
        <button
          id="btnRegister"
          className="btn-primary"
          type="submit"
          disabled={!isValid}
        >
          Crear cuenta
        </button>
        <div className="login-link">
          ¿Ya tenés cuenta? <Link to="/login">Iniciar sesión</Link>
        </div>
      </div>
    </form>
  );
};

export default RegistroForm;
