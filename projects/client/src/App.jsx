import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import { axiosInstance } from "./api";
import Sidebar from "./components/admin/Sidebar";
import Navbar from "./components/Navbar";
import Logo from "./components/reuseable/Logo";
import HomeAdmin from "./pages/admin/HomeAdmin";
import ManageProduct from "./pages/admin/ManageProduct";
import NewProduct from "./pages/admin/NewProduct";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Verification from "./pages/Verification";
import { login } from "./redux/features/authSlice";

const App = () => {
  const location = useLocation();
  const [authCheck, setAuthCheck] = useState(false);
  const dispatch = useDispatch();
  const authSelector = useSelector((state) => state.auth);

  const keepUserLoggedIn = async () => {
    try {
      const auth_token = localStorage.getItem("auth_token");

      if (!auth_token) {
        setAuthCheck(true);
        return;
      }

      const response = await axiosInstance.get("/auth/refresh-token");

      dispatch(login(response.data.data));

      localStorage.setItem("auth_token", response.data.token);
      setAuthCheck(true);
    } catch (err) {
      console.log(err);
      setAuthCheck(true);
    } finally {
      setAuthCheck(true);
    }
  };

  useEffect(() => {
    keepUserLoggedIn();
  }, []);
  if (!authCheck) {
    return (
      <Box textAlign={"center"}>
        <Box mt={"240px"}>
          <Logo />
        </Box>
      </Box>
    );
  }
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
