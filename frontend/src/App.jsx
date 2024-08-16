import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPages from "./pages/SignUpPages";
import ActivationPage from "./pages/ActivationPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./store/actions/userActions";
import Producsts from "./pages/Producsts";
import Header from "./components/layout/Header";
import ProductDetailPage from "./pages/ProductDetailPage";
import Footer from "./components/layout/Footer";
import ProfilePage from "./pages/ProfilePage";
import LayoutPage from "./pages/LayoutPage";
import AllProducts from "./components/products/AllProducts";
import BestSelling from "./pages/BestSelling";
import SellerSignUp from "./pages/SellerSignUp";
import ShopActivationPage from "./pages/ShopActivationPage";
import ShopLoginPage from "./pages/ShopLoginPage";
import {
  getAllEvents,
  getAllProducts,
  loadShop,
} from "./store/actions/shopAction";
import ShopProtectedRoutes from "./protectedRouts/ShopProtectedRoutes";
import ShopPage from "./pages/ShopPage";
import UserProtectedRoutes from "./protectedRouts/UserProtectedRoutes";
import Loader from "./components/layout/Loader";
import ShopDasboard from "./pages/ShopDasboard";
import CategoryPage from "./pages/CategoryPage";
import EventsPage from "./pages/EventsPage";
import Checkout from "./pages/Checkout";

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  const { AllProducts, AllEvents } = useSelector((state) => state.shop);

  const isUserActivationRoute = location.pathname.includes("/activation");
  const isShopActivationRoute = location.pathname.includes("/shop-activation");

  useEffect(() => {
    if (!isShopActivationRoute && !isUserActivationRoute) {
      const fetchData = async () => {
        dispatch(loadUser());
        dispatch(loadShop());
        dispatch(getAllProducts());
        dispatch(getAllEvents());

        window.scrollTo(0, 0);
      };
      fetchData();
    }
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <LayoutPage>
                  <HomePage />
                </LayoutPage>
              }
            ></Route>

            <Route
              path="/profile"
              element={
                <LayoutPage>
                  <UserProtectedRoutes>
                    <ProfilePage />
                  </UserProtectedRoutes>
                </LayoutPage>
              }
            ></Route>
                        <Route
              path="/check-out"
              element={
                <LayoutPage>
                  {/* <UserProtectedRoutes> */}
                    <Checkout />
                  {/* </UserProtectedRoutes> */}
                </LayoutPage>
              }
            ></Route>
            <Route
              path="/products"
              element={
                <LayoutPage>
                  <Producsts />
                </LayoutPage>
              }
            ></Route>
            <Route
              path="/events"
              element={
                <LayoutPage>
                  <EventsPage />
                </LayoutPage>
              }
            ></Route>
            <Route
              path="/category/:cetagory"
              element={
                <LayoutPage>
                  <CategoryPage />
                </LayoutPage>
              }
            ></Route>
            <Route
              path="/best-selling"
              element={
                <LayoutPage>
                  <BestSelling />
                </LayoutPage>
              }
            ></Route>
            <Route
              path="/product/:id"
              element={
                <LayoutPage>
                  <ProductDetailPage />
                </LayoutPage>
              }
            ></Route>

            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/sign-up" element={<SignUpPages />}></Route>

            <Route path="/seller-sign-up" element={<SellerSignUp />}></Route>
            <Route path="/shop/:id" element={<ShopPage />}></Route>
            <Route
              path="/shop-dash/:id"
              element={
                <ShopProtectedRoutes>
                  <ShopDasboard />
                </ShopProtectedRoutes>
              }
            ></Route>
            <Route path="/shop-sign-in" element={<ShopLoginPage />}></Route>

            <Route
              path="/activation/:userToken"
              element={<ActivationPage />}
            ></Route>

            {/* {shop routes} */}

            <Route
              path="/shop-activation/:shopToken"
              element={<ShopActivationPage />}
            ></Route>
          </Routes>

          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition:Bounce
          />
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
