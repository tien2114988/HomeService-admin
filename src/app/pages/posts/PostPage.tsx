import { Route, Routes } from "react-router-dom";
import PostList from "./pages/PostList";
import PostDetail from "./pages/PostDetail";
const PostPage = () => {
  return (
    <Routes>
      <Route index path="" element={<PostList />} />
      <Route path=":id" element={<PostDetail />} />
    </Routes>
  );
};

export default PostPage;
