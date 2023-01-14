import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";

const App = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname === "/login" ? null : <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
