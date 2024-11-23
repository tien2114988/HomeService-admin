import { Route, Routes } from 'react-router-dom';
import UserList from './pages/UserList';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import UserDetail from './pages/UserDetail';
const UsersPage = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route index path="" element={<UserList />} />
        <Route path=":id" element={<UserDetail />} />
      </Routes>
    </Provider>
  );
};

export default UsersPage;
