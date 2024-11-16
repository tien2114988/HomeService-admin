import { Navigate, Route, Routes } from "react-router-dom";
import MasterLayout from "../layout/MasterLayout";
import DashboardWrapper from "../pages/dashboard/DashboardWrapper";
import UsersPage from "../pages/users-management/UsersPage";
import ServicesPage from "../pages/services/ServicesPage";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path="auth/*" element={<Navigate to="/dashboard" />} />
        <Route path="dashboard/*" element={<DashboardWrapper />} />
        <Route path="users/*" element={<UsersPage />} />
        <Route path="services/*" element={<ServicesPage />} />
      </Route>
    </Routes>
  );
};

export default PrivateRoutes;
