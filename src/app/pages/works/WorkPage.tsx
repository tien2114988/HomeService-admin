import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { store } from '../users-management/redux/store';
import WorkList from './pages/WorkList';
import WorkDetail from './pages/WorkDetail';
const WorkPage = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route index path="" element={<WorkList />} />
        <Route path="/:id" element={<WorkDetail />} />
      </Routes>
    </Provider>
  );
};

export default WorkPage;
