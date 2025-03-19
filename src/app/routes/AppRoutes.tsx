import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import App from "@/app/App";
import { ErrorsPage } from "@/app/modules/errors/ErrorsPage";
import { Logout } from "@/app/modules/auth/Logout";
// import { useAuth } from "../modules/auth/core/Auth";
import PrivateRoutes from "./PrivateRoutes";
import LoginPage from "../pages/auth/LoginPage";
import { useAppSelector } from "../hooks";

const AppRoutes = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="error/*" element={<ErrorsPage />} />
          <Route path="logout" element={<Logout />} />
          {!isAuthenticated ? (
            <>
              <Route path="auth/*" element={<LoginPage />} />
              <Route path="*" element={<Navigate to="/auth/login" replace />} />
            </>
          ) : (
            <>
              <Route path="/*" element={<PrivateRoutes />} />
              <Route index element={<Navigate to="/users" replace />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
