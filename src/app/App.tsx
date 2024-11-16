import { Outlet } from "react-router-dom";
import { AuthInit } from "./modules/auth/core/Auth";
function App() {
  return (
    <>
      <AuthInit>
        <Outlet />
      </AuthInit>
    </>
  );
}

export default App;
