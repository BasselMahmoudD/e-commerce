import "./App.css";
import MainSection from "./Components/MAinSection/MainSection";
import Categories from "./Components/Categories/Categories";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";

import Products from "./Components/Products/Products";
import Brands from "./Components/Brands/Brands";
import Cart from "./Components/Cart/Cart";
import Wishlist from "./Components/Wishlist/Wishlist";
import AuthLAyOut from "./Layouts/AuthLAyOut";
import SignIn from "./Components/SignIn/SignIn";

import NotFound from "./Components/NotFound/NotFound";
import SignUp from "./Components/SignUp/SignUp";
import ProtectedLayer from "./Components/ProtectedLayer/ProtectedLayer";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import StoreContextProvider from "./context/StoreContextProvider";
import ClearData from "./Components/ClearData/ClearData";

import { ToastContainer, toast } from "react-toastify";
import Address from "./Components/Address/Address";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import VerifyCode from "./Components/VerifyCode/VerifyCode";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
function App() {
  let routes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedLayer>
              <MainSection />
            </ProtectedLayer>
          ),
        },
        {
          path: "/home",
          element: (
            <ProtectedLayer>
              <MainSection />
            </ProtectedLayer>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedLayer>
              <Products />
            </ProtectedLayer>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedLayer>
              <Categories />
            </ProtectedLayer>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedLayer>
              <Wishlist />
            </ProtectedLayer>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedLayer>
              <Brands />
            </ProtectedLayer>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedLayer>
              <Cart />
            </ProtectedLayer>
          ),
        },
        {
          path: "address/:id",
          element: (
            <ProtectedLayer>
              <Address />
            </ProtectedLayer>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedLayer>
              <Wishlist />
            </ProtectedLayer>
          ),
        },
        {
          path: "productDetails/:id",
          element: (
            <ProtectedLayer>
              <ProductDetails />
            </ProtectedLayer>
          ),
        },

        { path: "*", element: <NotFound /> },
      ],
    },
    {
      path: "/",
      element: <AuthLAyOut />,
      children: [
        {
          path: "signIn",
          element: (
            <ClearData>
              <SignIn />
            </ClearData>
          ),
        },
        { path: "signUp", element: <SignUp /> },
        { path: "forgetPassword", element: <ForgetPassword /> },
        { path: "verifyCode", element: <VerifyCode /> },
        { path: "resetPassword", element: <ResetPassword /> },
      ],
    },
  ]);

  return (
    <>
      <ToastContainer theme="colored" className="mt-5" autoClose="600" />
      <StoreContextProvider>
        <RouterProvider router={routes} />
      </StoreContextProvider>
    </>
  );
}

export default App;
