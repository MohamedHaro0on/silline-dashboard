import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import AllContextsProvider from "./context/allContexts";
import { OrdersContextProvider } from "./context/ordersContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    
    <AllContextsProvider>
      <OrdersContextProvider>
      <App />
      </OrdersContextProvider>
    </AllContextsProvider>
    
  </React.StrictMode>
);
