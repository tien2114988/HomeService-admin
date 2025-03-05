import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import App from '@/app/App';
import { ErrorsPage } from '@/app/modules/errors/ErrorsPage';
import { Logout } from '@/app/modules/auth/Logout';
// import { useAuth } from "../modules/auth/core/Auth";
import PrivateRoutes from './PrivateRoutes';
import LoginPage from '../pages/auth/LoginPage';
import { useCookies } from 'react-cookie';

const { BASE_URL = '/' } = import.meta.env;
const AppRoutes = () => {
  const [cookies] = useCookies(['jwt']);
  console.log(cookies.jwt);

  return (
    <BrowserRouter basename={BASE_URL}>
      <Routes>
        <Route element={<App />}>
          <Route path="error/*" element={<ErrorsPage />} />
          <Route path="logout" element={<Logout />} />
          {!cookies.jwt ? (
            <>
              <Route path="auth/*" element={<LoginPage />} />
              <Route path="*" element={<Navigate to="/auth/login" replace />} />
            </>
          ) : (
            <>
              <Route path="/*" element={<PrivateRoutes />} />
              <Route index element={<Navigate to="/dashboard" replace />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
