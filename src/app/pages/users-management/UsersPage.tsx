import BreadCrumb from '@/app/layout/components/breadcrumb/BreadCrumb';
import { Navigate, Route, Routes } from 'react-router-dom';
import UserList from './pages/UserList';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import UserInfo from './pages/UserInfo';
const UsersPage = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route index path="" element={<UserList />} />
        <Route
          path=":id"
          element={
            <>
              <BreadCrumb
                links={[
                  { label: 'Quản lý người dùng', href: '/users/' },
                  { label: 'Thông tin', href: '' },
                ]}
              />
              <UserInfo />
            </>
          }
        />
      </Routes>
    </Provider>
  );
};

export default UsersPage;
