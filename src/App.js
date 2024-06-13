import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import './Components.css'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Registration from "./Pages/Registration";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { check_token } from "./Redux/AuthSlice";
import AllProducts from "./Pages/AllProducts";
import ProductDetails from "./Pages/ProductDetails";
import AddProduct from "./Pages/AddProduct";
import EditProduct from "./Pages/EditProduct";
import ForgetPassword from "./Pages/ForgetPassword";
import Profile from "./Pages/Profile";
import UpdatePassword from "./Pages/UpdatePassword";


function App() {
  const queryclient = new QueryClient()
  const dispatch = useDispatch()
  function PrivateRoute({ children }) {
    let token = localStorage.getItem('token') || sessionStorage.getItem('token')
    return token !== null && token !== undefined && token !== "" ? (
      children
    ) : (
      <Navigate to='/login' />
    )

  }

  const public_route = [
    {
      path: '/registration',
      component: <Registration />
    },
    {
      path: '/',
      component: <Home />
    },
    {
      path: '/login',
      component: <Login />
    },
    {
      path: '/forgetpassword',
      component: <ForgetPassword />
    },
    {
      path: '/profile',
      component: <Profile />
    }
  ]

  const private_route = [
    {
      path: '/products',
      component: <AllProducts />
    },
    {
      path: '/productdetails/:id',
      component: <ProductDetails />
    },
    {
      path: '/addproduct',
      component: <AddProduct />
    },
    {
      path: '/editproduct/:id',
      component: <EditProduct />
    },
    {
      path: '/updatepassword',
      component: <UpdatePassword />
    }
  ]

  useEffect(() => {
    dispatch(check_token())
  }, [])

  return (
    <>

      <ToastContainer />

      <QueryClientProvider client={queryclient}>
        <Router>
          <Routes>
            {
              public_route?.map((route) => {
                return (
                  <Route path={route?.path} element={route?.component} />
                )
              })
            }
            {
              private_route?.map((route) => {
                return (
                  <Route path={route?.path} element={<PrivateRoute>{route?.component}</PrivateRoute>} />
                )
              })
            }

          </Routes>
        </Router>
      </QueryClientProvider>

    </>
  );
}

export default App;
