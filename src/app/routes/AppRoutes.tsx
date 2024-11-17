import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import App from '@/app/App';
import { ErrorsPage } from '@/app/modules/errors/ErrorsPage';
import { Logout } from '@/app/modules/auth/Logout';
import { AuthPage } from '../modules/auth/AuthPage';
// import { useAuth } from "../modules/auth/core/Auth";
import { UserModel } from '../modules/auth/core/_models';
import PrivateRoutes from './PrivateRoutes';

const { BASE_URL = '/' } = import.meta.env;
const AppRoutes = () => {
  //   const { currentUser } = useAuth();
  const currentUser = {
    id: 1,
    firstname: 'abc',
  } as UserModel;
  //   const currentUser = undefined

  return (
    <BrowserRouter basename={BASE_URL}>
      <Routes>
        <Route element={<App />}>
          <Route path="error/*" element={<ErrorsPage />} />
          <Route path="logout" element={<Logout />} />
          {currentUser ? (
            <>
              <Route path="/*" element={<PrivateRoutes />} />
              <Route index element={<Navigate to="/dashboard" />} />
            </>
          ) : (
            <>
              <Route path="auth/*" element={<AuthPage />} />
              <Route path="*" element={<Navigate to="/auth" />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
