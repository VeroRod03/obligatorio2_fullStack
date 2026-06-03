import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import LoginPage from "./pages/LoginPage";
import RegistroPage from "./pages/RegistroPage";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/protected/ProtectedRoute.jsx";
import ProtectedRouteVendedor from "./components/protected/ProtectedRouteVendedor.jsx";
import ProtectedRouteComprador from "./components/protected/ProtectedRouteComprador.jsx";
import DashboardPageVendedor from "./pages/DashboardPageVendedor.jsx";
import DashboardPageComprador from "./pages/DashboardPageComprador.jsx";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/registro" element={<RegistroPage />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<ProtectedRouteVendedor />}>
              <Route path="/vendedor/dashboard" element={<DashboardPageVendedor />} />
            </Route>
            <Route element={<ProtectedRouteComprador />}>
              <Route path="/comprador/dashboard" element={<DashboardPageComprador />} />
            </Route>
          </Route>
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        theme="colored"
      />
    </Provider>
  );
};

export default App;
