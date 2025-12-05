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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<ProductsScreen />} />
      <Route path="/products" element={<ProductsScreen />} />
      <Route path="/products/:id" element={<SingleProductScreen />} />
      <Route path="/cart" element={<CartScreen />} />
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
