import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';
import { axiosInstance } from './api';
import AdminRoute from './components/admin/AdminRoute';
import Sidebar from './components/admin/Sidebar';
import BottomBar from './components/BottomBar';
import Navbar from './components/Navbar';
import Logo from './components/reuseable/Logo';
import EditProduct from './pages/admin/EditProduct';
import HomeAdmin from './pages/admin/HomeAdmin';
import ManageBrand from './pages/admin/ManageBrand';
import ManageCategory from './pages/admin/ManageCategory';
import ManageProduct from './pages/admin/ManageProduct';
import NewProduct from './pages/admin/NewProduct';
import Chat from './pages/Chat';
import ProductList from './pages/ProductList';
import Login from './pages/Login';
import Product from './pages/Product';
import Register from './pages/Register';
import Verification from './pages/Verification';
import Wishlist from './pages/Wishlist';
import { login } from './redux/features/authSlice';
import { attach } from './redux/features/resetSlice';
import ChatAdmin from './pages/admin/ChatAdmin';
import Home from './pages/Home';
import Footer from './components/Footer';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

const App = () => {
  const location = useLocation();
  const [authCheck, setAuthCheck] = useState(false);
  const dispatch = useDispatch();
  const authSelector = useSelector((state) => state.auth);

  const keepUserLoggedIn = async () => {
    try {
      const auth_token = localStorage.getItem('auth_token');

      if (!auth_token) {
        setAuthCheck(true);
        return;
      }

      const response = await axiosInstance.get('/auth/refresh-token');

      dispatch(login(response.data.data));

      localStorage.setItem('auth_token', response.data.token);
      setAuthCheck(true);
    } catch (err) {
      console.log(err.response);
      setAuthCheck(true);
    } finally {
      setAuthCheck(true);
    }
  };

  const userResetData = async () => {
    try {
      const reset_token = localStorage.getItem('reset_token');

      if (!reset_token) {
        setAuthCheck(true);
        return;
      }

      const response = await axiosInstance.get('/auth/refresh-token');

      dispatch(attach(response.data.data));

      localStorage.setItem('reset_token', response.data.token);
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
    userResetData();
  });
  if (!authCheck) {
    return (
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        h='100vh'
      >
        <Box>
          <Logo />
        </Box>
      </Box>
    );
  }
  return (
    <>
      {location.pathname === '/login' ||
        location.pathname === '/register' ||
        location.pathname === '/verification' ? null : (
        <Navbar />
      )}
      {/* <BottomBar /> */}
      {location.pathname === '/admin' ||
        location.pathname === '/admin/manage-product' ||
        location.pathname === '/admin/manage-brand' ||
        location.pathname === '/admin/chat' ||
        location.pathname === '/admin/manage-category' ? (
        <Sidebar />
      ) : null}

      <Routes>
        {/* User */}
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/verification' element={<Verification />} />
        <Route path='/product' element={<ProductList />} />
        <Route path='/product/:product_name/:id' element={<Product />} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />

        {/* Admin */}
        <Route
          path='/admin'
          element={
            <AdminRoute>
              <HomeAdmin />
            </AdminRoute>
          }
        />
        <Route
          path='/admin/manage-product'
          element={
            <AdminRoute>
              <ManageProduct />
            </AdminRoute>
          }
        />
        <Route
          path='/admin/add-product'
          element={
            <AdminRoute>
              <NewProduct />
            </AdminRoute>
          }
        />
        <Route
          path='/admin/edit-product/:product_name/:id'
          element={
            <AdminRoute>
              <EditProduct />
            </AdminRoute>
          }
        />
        <Route
          path='/admin/manage-category'
          element={
            <AdminRoute>
              <ManageCategory />
            </AdminRoute>
          }
        />
        <Route
          path='/admin/manage-brand'
          element={
            <AdminRoute>
              <ManageBrand />
            </AdminRoute>
          }
        />
        <Route
          path='/admin/chat'
          element={
            <AdminRoute>
              <ChatAdmin />
            </AdminRoute>
          }
        />
      </Routes>

      {location.pathname === '/admin/chat' ||
        location.pathname === '/login' ||
        location.pathname === '/login' ||
        location.pathname === '/register' ||
        location.pathname === '/verification' ? null : (
        <Footer />
      )}
    </>
  );
};

export default App;
