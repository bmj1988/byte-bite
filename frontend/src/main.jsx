import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import configureStore from "./redux/store";
import { router } from "./router";
import * as sessionActions from "./redux/session";
import "./index.css";
import { CartProvider } from "./context/ShoppingCartContext";
import { ModalProvider } from "./context/Modal";

const store = configureStore();

if (import.meta.env.MODE !== "production") {
  window.store = store;
  window.sessionActions = sessionActions;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <CartProvider>
        <ModalProvider>
          <RouterProvider router={router} />
        </ModalProvider>
      </CartProvider>
    </ReduxProvider>
  </React.StrictMode >
);
