import { createContext, useContext, useEffect, useState } from "react";
import React from "react";

import axios from "axios";
import strings from "../assets/locals/locals";
import { toast } from "react-toastify";
import LanguageContext from "./langContext";

const OrdersContext = createContext([]);

export const OrdersContextProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [finishedOrders, setFinishedOrders] = useState([]);
  const [notFinishedOrders, setNotFinishedOrders] = useState([]);


  const { lang } = useContext(LanguageContext);
  strings.setLanguage(lang);

  useEffect(() => {
    getOrders();
  }, []);


  const getOrders = () => {
    axios
      .get("/GetAllOrder.php")
      .then((res) => {
        console.log(res.data);
        setOrders(res.data);
        let finished = res.data.map(el => el);
        finished = finished.filter(el => el.Status === 1);
        setFinishedOrders(finished);

        let temp = res.data.map(el => el);
        temp = temp.filter(el => el.Status === 0);
        setNotFinishedOrders(temp)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const changeStatus = (OrderID, Status) => {
    axios.post("/update_status_order.php", {
      "orderID": OrderID,
      "newStatus": Status == 0 ? 1 : 0
    }).then(res => {
      getOrders();
      toast.success(`${strings.statusUpdatedSuccessfully}`, {
        position:
          lang === "ar" ? toast.POSITION.TOP_LEFT : toast.POSITION.TOP_RIGHT,
      });
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <OrdersContext.Provider
      value={{
        orders,
        getOrders,
        changeStatus,
        finishedOrders,
        notFinishedOrders
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};
export default OrdersContext;