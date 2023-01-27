import { Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "./components/admin/Sidebar";
import Navbar from "./components/Navbar";
import HomeAdmin from "./pages/admin/HomeAdmin";
import ManageProduct from "./pages/admin/ManageProduct";
import NewProduct from "./pages/admin/NewProduct";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Verification from "./pages/Verification";

const App = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname === "/login" ||
      location.pathname === "/register" ||
      location.pathname === "/verification" ? null : (
        <Navbar />
      )}
      {location.pathname === "/admin" ||
      location.pathname === "/admin/manage-product" ? (
        <Sidebar />
      ) : null}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/" element={<Home />} />

        {/* Admin */}
        <Route path="/admin" element={<HomeAdmin />} />
        <Route path="/admin/manage-product" element={<ManageProduct />} />
        <Route path="/admin/add-product" element={<NewProduct />} />
      </Routes>
    </>
  );
};

export default App;
