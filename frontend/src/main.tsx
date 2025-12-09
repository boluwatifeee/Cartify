import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import ProductsScreen from "./screens/ProductsScreen.tsx";
import SingleProductScreen from "./screens/SingleProductScreen.tsx";
import { Provider } from "react-redux";
import store from "./store.ts";
import CartScreen from "./screens/CartScreen.tsx";
import LoginScreen from "./screens/LoginScreen.tsx";
import RegisterScreen from "./screens/RegisterScreen.tsx";
import ShippingScreen from "./screens/ShippingScreen.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import PaymentScreen from "./screens/PaymentScreen.tsx";
import PlaceOrderScreen from "./screens/PlaceOrderScreen.tsx";
import OrderScreen from "./screens/OrderScreen.tsx";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || ""
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<ProductsScreen />} />
      <Route path="/products" element={<ProductsScreen />} />
      <Route path="/products/:id" element={<SingleProductScreen />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/place-order" element={<PlaceOrderScreen />} />
        <Route path="/order/:id" element={<OrderScreen />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Elements stripe={stripePromise}>
        <RouterProvider router={router} />
      </Elements>
    </Provider>
  </StrictMode>
);
