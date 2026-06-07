import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { Provider, useDispatch } from "react-redux";
import { store } from "./store/store.js";
import { setUsuario } from "./features/usuario/usuario.slice.js";
import api from "./api/api.js";
import LoginPage from "./pages/LoginPage";
import RegistroPage from "./pages/RegistroPage";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/protected/ProtectedRoute.jsx";
import ProtectedRouteVendedor from "./components/protected/ProtectedRouteVendedor.jsx";
import ProtectedRouteComprador from "./components/protected/ProtectedRouteComprador.jsx";
import DashboardPageVendedor from "./pages/DashboardPageVendedor.jsx";
import DashboardPageComprador from "./pages/DashboardPageComprador.jsx";

// Componente interno para poder usar useDispatch (necesita estar dentro del Provider)
const AppRoutes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    api
      .get(`/usuario/${userId}`)
      .then((response) => {
        dispatch(setUsuario(response.data.usuario));
      })
      .catch((error) => {
        console.log("Error cargando usuario:", error);
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/registro" element={<RegistroPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<ProtectedRouteVendedor />}>
            <Route
              path="/vendedor/dashboard"
              element={<DashboardPageVendedor />}
            />
          </Route>
          <Route element={<ProtectedRouteComprador />}>
            <Route
              path="/comprador/dashboard"
              element={<DashboardPageComprador />}
            />
          </Route>
        </Route>
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AppRoutes />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        theme="colored"
      />
    </Provider>
  );
};

export default App;
