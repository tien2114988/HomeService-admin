import { Route, Routes } from "react-router-dom";
import UserList from "./pages/UserList";
import UserDetail from "./pages/UserDetail";
const UsersPage = () => {
  return (
    <Routes>
      <Route index path="" element={<UserList />} />
      <Route path=":id" element={<UserDetail />} />
    </Routes>
  );
};

export default UsersPage;
