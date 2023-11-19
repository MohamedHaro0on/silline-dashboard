import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import UserContext from "./userContext";
import { toast } from "react-toastify";
import strings from "../assets/locals/locals";
import { useNavigate } from "react-router-dom";
import LanguageContext from "./langContext";

const ItemsContext = createContext([]);

export const ItemsContextProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const { token } = useContext(UserContext);
  const navigate = useNavigate();

  const { lang } = useContext(LanguageContext);
  strings.setLanguage(lang);

  useEffect(() => {
    if (token) {
      getItems();
    }
  }, [token]);

  const getItems = () => {
    axios
      .get("/SelectAllitem.php", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setItems(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        toast.error(` error items.... ${err.message} `, {
          position:
            lang === "ar" ? toast.POSITION.TOP_LEFT : toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const deleteItemHandler = (id) => {
    axios
      .post(
        `/deleteItembyID.php`,
        {
          id: id,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        let temp = items.map((el) => el);
        temp = temp.filter((el) => el.AdminItemID !== id);
        setItems(temp);
        toast.success(strings.itemAddedSuccessfully, {
          position:
            lang === "ar" ? toast.POSITION.TOP_LEFT : toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((err) => {
        toast.error(` error .... ${err.message} `, {
          position:
            lang === "ar" ? toast.POSITION.TOP_LEFT : toast.POSITION.TOP_RIGHT,
        });
      });
  };
  const editItem = () => {};

  const getItem = (id) => {
    return items.filter((el) => el.AdminItemID == id);
  };

  const addItem = ({
    ItemName,
    Description,
    Price,
    Image,
    CategoryID,
    AllergyInfo,
    Adjustment,
  }) => {
    setLoading(true);
    let data = new FormData();
    data.append("Price", Price);
    data.append("Description", Description);
    data.append("CategoryID", CategoryID);
    data.append("AllergyInfo", AllergyInfo);
    data.append("ItemName", ItemName);
    data.append("file", Image);
    data.append("status", 0);
    data.append("best_seller", 1);
    data.append(
      "title",
      Adjustment.map((el) => el.title)
    );
    data.append(
      "price_adj",
      JSON.stringify(
        Adjustment.map((el) => el.adjustmentInfo.map((i) => i.overPrice))
      )
    );
    data.append(
      "option_adj",
      JSON.stringify(
        Adjustment.map((el) => el.adjustmentInfo.map((i) => i.label))
      )
    );
    axios
      .post("/insertItem_admin_api.php", data, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setLoading(false);
        toast.success(`${strings.itemAddedSuccessfully}`, {
          position:
            lang === "ar" ? toast.POSITION.TOP_LEFT : toast.POSITION.TOP_RIGHT,
        });
        getItems();
        navigate("/items");
      })
      .catch((error) => {
        toast.error(` ${strings.addItemError} .... ${error.message} `, {
          position:
            lang === "ar" ? toast.POSITION.TOP_LEFT : toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const updateAvailabilty = (id, status) => {
    axios
      .post(
        "/UpdateStatus.php",
        {
          AdminItemID: id,
          new_status: status == 0 ? 1 : 0,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        getItems();
        toast.success(`${strings.statusUpdatedSuccessfully}`, {
          position:
            lang === "ar" ? toast.POSITION.TOP_LEFT : toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <ItemsContext.Provider
      value={{
        deleteItemHandler,
        items,
        editItem,
        getItem,
        addItem,
        updateAvailabilty,
        loading,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};

export default ItemsContext;
