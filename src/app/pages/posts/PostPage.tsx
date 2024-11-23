import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { store } from '../users-management/redux/store';
import PostList from './pages/PostList';
import PostDetail from './pages/PostDetail';
const PostPage = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route index path="" element={<PostList />} />
        <Route path=":id" element={<PostDetail />} />
      </Routes>
    </Provider>
  );
};

export default PostPage;
