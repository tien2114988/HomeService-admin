import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { store } from '../users-management/redux/store';
import WorkList from './pages/WorkList';
const WorkPage = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route index path="" element={<WorkList />} />
      </Routes>
    </Provider>
  );
};

export default WorkPage;
