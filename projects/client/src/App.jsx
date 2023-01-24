import { Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "./components/admin/Sidebar";
import Navbar from "./components/Navbar";
import HomeAdmin from "./pages/admin/HomeAdmin";
import ManageProduct from "./pages/admin/ManageProduct";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname === "/login" ||
      location.pathname === "/register" ? null : (
        <Navbar />
      )}
      {location.pathname === "/admin" ||
      location.pathname === "/admin/manage-product" ? (
        <Sidebar />
      ) : null}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />

        {/* Admin */}
        <Route path="/admin" element={<HomeAdmin />} />
        <Route path="/admin/manage-product" element={<ManageProduct />} />
      </Routes>
    </>
  );
};

export default App;
