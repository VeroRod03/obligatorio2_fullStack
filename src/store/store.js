import { configureStore } from "@reduxjs/toolkit";
import usuarioReducer from "../features/usuario/usuario.slice.js";


export const store = configureStore({
  reducer: {
    user: usuarioReducer,
  },
});
