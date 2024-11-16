import { Navigate, Route, Routes } from "react-router-dom";

const ServicesPage = () => {
  return (
    <Routes>
      <Route
        path="abcd"
        element={
          <>
            <>Quan ly 1</>
          </>
        }
      />
      {/* Default Route */}
      <Route index element={<Navigate to="abcd" />} />
    </Routes>
  );
};

export default ServicesPage;
