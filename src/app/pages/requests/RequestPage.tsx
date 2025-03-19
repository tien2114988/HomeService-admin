import { Route, Routes } from "react-router-dom";
import RequestList from "./pages/RequestList";
import RequestDetail from "./pages/RequestDetail";
const RequestPage = () => {
  return (
    <Routes>
      <Route index path="" element={<RequestList />} />
      <Route path=":id" element={<RequestDetail />} />
    </Routes>
  );
};

export default RequestPage;
