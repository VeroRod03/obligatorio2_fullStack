// ─── Estado global ────────────────────────────────────────────────────────────

const state = {
  vendorEmail: "",
  vendorPassword: "Password123",
  otroVendorEmail: "",
  otroVendorPassword: "Password123",
  buyerEmail: "",
  buyerPassword: "Password123",
  vendorToken: "",
  otroVendorToken: "",
  buyerToken: "",
  tipoObraId: "",
  publicacionId: "",
  otraPublicacionId: "",
  ofertaId: "",
};

function baseUrl() {
  return document.getElementById("baseUrl").value.replace(/\/$/, "");
}

function renderEstado() {
  document.getElementById("estado").textContent = JSON.stringify(
    state,
    null,
    2,
  );
}

function mostrarRespuesta(id, status, data) {
  document.getElementById(`res-${id}`).textContent =
    `Status: ${status}\n${JSON.stringify(data, null, 2)}`;
}

function randomName() {
  const nombres = [
    "Ana",
    "Carlos",
    "María",
    "Pedro",
    "Laura",
    "Sofía",
    "Diego",
  ];
  const apellidos = [
    "García",
    "Pérez",
    "López",
    "Martínez",
    "González",
    "Rodríguez",
  ];
  return {
    nombre: nombres[Math.floor(Math.random() * nombres.length)],
    apellido: apellidos[Math.floor(Math.random() * apellidos.length)],
  };
}

// ─── Helper HTTP ──────────────────────────────────────────────────────────────

async function request({ method, path, token, body, isFormData }) {
  const headers = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (body && !isFormData) headers["Content-Type"] = "application/json";

  const opts = { method, headers };
  if (body) opts.body = isFormData ? body : JSON.stringify(body);

  const res = await fetch(`${baseUrl()}${path}`, opts);
  let data;
  try {
    data = await res.json();
  } catch {
    data = { raw: await res.text() };
  }
  return { status: res.status, data };
}

// ─── Inicializar bodies con datos frescos ─────────────────────────────────────

function initBodies() {
  const ts = Date.now();
  state.vendorEmail = `vendedor_${ts}@test.com`;
  state.otroVendorEmail = `otrovendedor_${ts + 1}@test.com`;
  state.buyerEmail = `comprador_${ts + 2}@test.com`;

  const vName = randomName();
  const oName = randomName();
  const bName = randomName();

  document.getElementById("body-registroVendedor").value = JSON.stringify(
    {
      email: state.vendorEmail,
      password: "Password123",
      confirmedPassword: "Password123",
      nombreCompleto: vName,
      rol: "vendedor",
    },
    null,
    2,
  );

  document.getElementById("body-registroOtroVendedor").value = JSON.stringify(
    {
      email: state.otroVendorEmail,
      password: "Password123",
      confirmedPassword: "Password123",
      nombreCompleto: oName,
      rol: "vendedor",
    },
    null,
    2,
  );

  document.getElementById("body-registroComprador").value = JSON.stringify(
    {
      email: state.buyerEmail,
      password: "Password123",
      confirmedPassword: "Password123",
      nombreCompleto: bName,
      rol: "comprador",
    },
    null,
    2,
  );

  document.getElementById("body-loginVendedor").value = JSON.stringify(
    {
      email: state.vendorEmail,
      password: "Password123",
    },
    null,
    2,
  );

  document.getElementById("body-loginOtroVendedor").value = JSON.stringify(
    {
      email: state.otroVendorEmail,
      password: "Password123",
    },
    null,
    2,
  );

  document.getElementById("body-loginComprador").value = JSON.stringify(
    {
      email: state.buyerEmail,
      password: "Password123",
    },
    null,
    2,
  );

  refreshPublicacionBodies();
  renderEstado();
}

// Actualiza los bodies de publicación cuando cambia tipoObraId
function refreshPublicacionBodies() {
  const pubBody = {
    obra: { id: "" },
    precioBase: 500,
    donacion: false,
    tipoObra: state.tipoObraId || "",
    estado: "activa",
  };
  document.getElementById("body-crearPublicacion").value = JSON.stringify(
    pubBody,
    null,
    2,
  );

  const otraPubBody = { ...pubBody, estado: "pausada" };
  document.getElementById("body-crearOtraPublicacion").value = JSON.stringify(
    otraPubBody,
    null,
    2,
  );
}

// ─── AUTH ─────────────────────────────────────────────────────────────────────

async function registroVendedor() {
  const body = JSON.parse(
    document.getElementById("body-registroVendedor").value,
  );
  const { status, data } = await request({
    method: "POST",
    path: "/auth/registro",
    body,
  });
  mostrarRespuesta("registroVendedor", status, data);
  if (data.usuario) {
    state.vendorEmail = data.usuario.email;
    document.getElementById("body-loginVendedor").value = JSON.stringify(
      { email: state.vendorEmail, password: "Password123" },
      null,
      2,
    );
    renderEstado();
  }
}

async function registroOtroVendedor() {
  const body = JSON.parse(
    document.getElementById("body-registroOtroVendedor").value,
  );
  const { status, data } = await request({
    method: "POST",
    path: "/auth/registro",
    body,
  });
  mostrarRespuesta("registroOtroVendedor", status, data);
  if (data.usuario) {
    state.otroVendorEmail = data.usuario.email;
    document.getElementById("body-loginOtroVendedor").value = JSON.stringify(
      { email: state.otroVendorEmail, password: "Password123" },
      null,
      2,
    );
    renderEstado();
  }
}

async function registroComprador() {
  const body = JSON.parse(
    document.getElementById("body-registroComprador").value,
  );
  const { status, data } = await request({
    method: "POST",
    path: "/auth/registro",
    body,
  });
  mostrarRespuesta("registroComprador", status, data);
  if (data.usuario) {
    state.buyerEmail = data.usuario.email;
    document.getElementById("body-loginComprador").value = JSON.stringify(
      { email: state.buyerEmail, password: "Password123" },
      null,
      2,
    );
    renderEstado();
  }
}

async function loginVendedor() {
  const body = JSON.parse(document.getElementById("body-loginVendedor").value);
  const { status, data } = await request({
    method: "POST",
    path: "/auth/login",
    body,
  });
  mostrarRespuesta("loginVendedor", status, data);
  if (data.token) {
    state.vendorToken = data.token;
    renderEstado();
  }
}

async function loginOtroVendedor() {
  const body = JSON.parse(
    document.getElementById("body-loginOtroVendedor").value,
  );
  const { status, data } = await request({
    method: "POST",
    path: "/auth/login",
    body,
  });
  mostrarRespuesta("loginOtroVendedor", status, data);
  if (data.token) {
    state.otroVendorToken = data.token;
    renderEstado();
  }
}

async function loginComprador() {
  const body = JSON.parse(document.getElementById("body-loginComprador").value);
  const { status, data } = await request({
    method: "POST",
    path: "/auth/login",
    body,
  });
  mostrarRespuesta("loginComprador", status, data);
  if (data.token) {
    state.buyerToken = data.token;
    renderEstado();
  }
}

// ─── TIPO OBRA ────────────────────────────────────────────────────────────────

async function crearTipoObra() {
  const body = JSON.parse(document.getElementById("body-crearTipoObra").value);
  const { status, data } = await request({
    method: "POST",
    path: "/tipoObra",
    token: state.vendorToken,
    body,
  });
  mostrarRespuesta("crearTipoObra", status, data);
  const id = data.tipoObra?._id;
  if (id) {
    state.tipoObraId = id;
    refreshPublicacionBodies();
    renderEstado();
  }
}

async function obtenerTiposObra() {
  const { status, data } = await request({
    method: "GET",
    path: "/tipoObra",
    token: state.vendorToken,
  });
  mostrarRespuesta("obtenerTiposObra", status, data);
}

async function obtenerTipoObraById() {
  const { status, data } = await request({
    method: "GET",
    path: `/tipoObra/${state.tipoObraId}`,
    token: state.vendorToken,
  });
  mostrarRespuesta("obtenerTipoObraById", status, data);
}

async function modificarTipoObra() {
  const body = JSON.parse(
    document.getElementById("body-modificarTipoObra").value,
  );
  const { status, data } = await request({
    method: "PUT",
    path: `/tipoObra/${state.tipoObraId}`,
    token: state.vendorToken,
    body,
  });
  mostrarRespuesta("modificarTipoObra", status, data);
}

async function eliminarTipoObra() {
  const { status, data } = await request({
    method: "DELETE",
    path: `/tipoObra/${state.tipoObraId}`,
    token: state.vendorToken,
  });
  mostrarRespuesta("eliminarTipoObra", status, data);
  if (status >= 200 && status < 300) {
    state.tipoObraId = "";
    renderEstado();
  }
}

// ─── PUBLICACIÓN ──────────────────────────────────────────────────────────────

async function crearPublicacion() {
  const body = JSON.parse(
    document.getElementById("body-crearPublicacion").value,
  );
  const { status, data } = await request({
    method: "POST",
    path: "/publicacion",
    token: state.vendorToken,
    body,
  });
  mostrarRespuesta("crearPublicacion", status, data);
  const id = data._id || data.data?._id || data.id;
  if (id) {
    state.publicacionId = id;
    renderEstado();
  }
}

async function crearOtraPublicacion() {
  const body = JSON.parse(
    document.getElementById("body-crearOtraPublicacion").value,
  );
  const { status, data } = await request({
    method: "POST",
    path: "/publicacion",
    token: state.otroVendorToken,
    body,
  });
  mostrarRespuesta("crearOtraPublicacion", status, data);
  const id = data._id || data.data?._id || data.id;
  if (id) {
    state.otraPublicacionId = id;
    renderEstado();
  }
}

async function obtenerPublicaciones() {
  const { status, data } = await request({
    method: "GET",
    path: "/publicacion?page=1&limit=3",
    token: state.vendorToken,
  });
  mostrarRespuesta("obtenerPublicaciones", status, data);
}

async function obtenerPublicacionById() {
  const { status, data } = await request({
    method: "GET",
    path: `/publicacion/${state.publicacionId}`,
    token: state.vendorToken,
  });
  mostrarRespuesta("obtenerPublicacionById", status, data);
}

async function misPublicacionesVendedor() {
  const { status, data } = await request({
    method: "GET",
    path: "/publicacion/mis-publicaciones?limit=6",
    token: state.vendorToken,
  });
  mostrarRespuesta("misPublicacionesVendedor", status, data);
}

async function misPublicacionesComprador() {
  const { status, data } = await request({
    method: "GET",
    path: "/publicacion/mis-publicaciones",
    token: state.buyerToken,
  });
  mostrarRespuesta("misPublicacionesComprador", status, data);
}

async function modificarPublicacion() {
  const body = JSON.parse(
    document.getElementById("body-modificarPublicacion").value,
  );
  const { status, data } = await request({
    method: "PUT",
    path: `/publicacion/${state.publicacionId}`,
    token: state.vendorToken,
    body,
  });
  mostrarRespuesta("modificarPublicacion", status, data);
}

async function finalizarPublicacion() {
  const { status, data } = await request({
    method: "PATCH",
    path: `/publicacion/${state.publicacionId}/finalizar`,
    token: state.vendorToken,
  });
  mostrarRespuesta("finalizarPublicacion", status, data);
}

async function eliminarPublicacion() {
  const { status, data } = await request({
    method: "DELETE",
    path: `/publicacion/${state.publicacionId}`,
    token: state.vendorToken,
  });
  mostrarRespuesta("eliminarPublicacion", status, data);
  if (status >= 200 && status < 300) {
    state.publicacionId = "";
    renderEstado();
  }
}

// ─── OFERTA ───────────────────────────────────────────────────────────────────

async function crearOferta() {
  const body = JSON.parse(document.getElementById("body-crearOferta").value);
  const { status, data } = await request({
    method: "POST",
    path: `/oferta/publicacion/${state.publicacionId}`,
    token: state.buyerToken,
    body,
  });
  mostrarRespuesta("crearOferta", status, data);
  const id = data._id || data.data?._id || data.id;
  if (id) {
    state.ofertaId = id;
    renderEstado();
  }
}

async function obtenerOfertas() {
  const { status, data } = await request({
    method: "GET",
    path: `/oferta/publicacion/${state.publicacionId}`,
    token: state.vendorToken,
  });
  mostrarRespuesta("obtenerOfertas", status, data);
}

// ─── USUARIO ──────────────────────────────────────────────────────────────────

async function actualizarPlanPremium() {
  const { status, data } = await request({
    method: "PATCH",
    path: "/usuario/plan/premium",
    token: state.vendorToken,
  });
  mostrarRespuesta("actualizarPlanPremium", status, data);
}

// ─── UPLOADS ──────────────────────────────────────────────────────────────────

async function subirImagen() {
  const fileInput = document.getElementById("file-subirImagen");
  if (!fileInput.files[0]) {
    alert("Seleccioná un archivo primero.");
    return;
  }
  const formData = new FormData();
  formData.append("imagen", fileInput.files[0]);
  const { status, data } = await request({
    method: "POST",
    path: "/uploads",
    token: state.vendorToken,
    body: formData,
    isFormData: true,
  });
  mostrarRespuesta("subirImagen", status, data);
}

// ─── Init ─────────────────────────────────────────────────────────────────────

initBodies();
