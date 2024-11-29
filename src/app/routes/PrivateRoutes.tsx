import { Navigate, Route, Routes } from 'react-router-dom';
import MasterLayout from '../layout/MasterLayout';
import DashboardWrapper from '../pages/dashboard/DashboardWrapper';
import UsersPage from '../pages/users-management/UsersPage';
import PostPage from '../pages/posts/PostPage';
import WorkPage from '../pages/works/WorkPage';
import RequestPage from '../pages/requests/RequestPage';

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path="auth/*" element={<Navigate to="/dashboard" />} />
        <Route path="dashboard/*" element={<DashboardWrapper />} />
        <Route path="users/*" element={<UsersPage />} />
        <Route path="posts/*" element={<PostPage />} />
        <Route path="works/*" element={<WorkPage />} />
        <Route path="requests/*" element={<RequestPage />} />
      </Route>
    </Routes>
  );
};

export default PrivateRoutes;
