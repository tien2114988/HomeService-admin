import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import App from '@/app/App';
import { ErrorsPage } from '@/app/modules/errors/ErrorsPage';
import { Logout } from '@/app/modules/auth/Logout';
import { AuthPage } from '../modules/auth/AuthPage';
// import { useAuth } from "../modules/auth/core/Auth";
import PrivateRoutes from './PrivateRoutes';
import { AdminModel } from '@/models/User';

const { BASE_URL = '/' } = import.meta.env;
const AppRoutes = () => {
  //   const { currentUser } = useAuth();
  const currentAdmin = {
    jwt: '',
  } as AdminModel;
  //   const currentUser = undefined

  return (
    <BrowserRouter basename={BASE_URL}>
      <Routes>
        <Route element={<App />}>
          <Route path="error/*" element={<ErrorsPage />} />
          <Route path="logout" element={<Logout />} />
          {currentAdmin ? (
            <>
              <Route path="/*" element={<PrivateRoutes />} />
              <Route index element={<Navigate to="/dashboard" />} />
            </>
          ) : (
            <>
              <Route index path="auth/*" element={<AuthPage />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
