import { configureStore } from "@reduxjs/toolkit";
import usuarioReducer from "../features/usuario/usuario.slice.js";
import tipoObraReducer from "../features/tiposObra/tipoObra.slice.js";


export const store = configureStore({
  reducer: {
    user: usuarioReducer,
    tiposDeObra: tipoObraReducer
  },
});
