import { Route, Routes } from "react-router-dom";
import WorkList from "./pages/WorkList";
import WorkDetail from "./pages/WorkDetail";
const WorkPage = () => {
  return (
    <Routes>
      <Route index path="" element={<WorkList />} />
      <Route path="/:id" element={<WorkDetail />} />
    </Routes>
  );
};

export default WorkPage;
