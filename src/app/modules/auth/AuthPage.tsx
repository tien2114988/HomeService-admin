import { Route, Routes } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import Login from "./components/Login";

const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path="login" element={<Login />} />
      <Route index element={<Login />} />
    </Route>
  </Routes>
);

export { AuthPage };
