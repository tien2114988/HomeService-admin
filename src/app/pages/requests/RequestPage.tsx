import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { store } from '../users-management/redux/store';
import RequestList from './pages/RequestList';
import RequestDetail from './pages/RequestDetail';
const RequestPage = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route index path="" element={<RequestList />} />
        <Route path=":id" element={<RequestDetail />} />
      </Routes>
    </Provider>
  );
};

export default RequestPage;
