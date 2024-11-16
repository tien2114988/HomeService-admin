import BreadCrumb from "@/app/layout/components/breadcrumb/BreadCrumb";
import { Navigate, Route, Routes } from "react-router-dom";
import UsersListWrapper from "./users-list/UsersListWrapper";
import { Provider } from "react-redux";
import { store } from "./redux/store";
const UsersPage = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route
          path="lists"
          element={
            <>
              <BreadCrumb
                links={[
                  { label: "Users", href: "/users" },
                  { label: "Users List", href: "/users/lists" },
                ]}
              />
              <UsersListWrapper />
            </>
          }
        />
        {/* Default Route */}
        <Route index element={<Navigate to="lists" />} />
      </Routes>
    </Provider>
  );
};

export default UsersPage;
