import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import UserContext from "./authContext";
import { toast } from "react-toastify";
import strings from "../assets/locals/locals";
import { useNavigate } from "react-router-dom";
import LanguageContext from "./langContext";

const ItemsContext = createContext([]);

export const ItemsContextProvider = ({ children }) => {
  const [items, setItems] = useState([]);

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
        toast.success( strings.itemAddedSuccessfully , {
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
  }) => {
    let data = new FormData();
    data.append("Price", Price);
    data.append("Description", Description);
    data.append("CategoryID", CategoryID);
    data.append("AllergyInfo", AllergyInfo);
    data.append("ItemName", ItemName);
    data.append("file", Image);
    data.append("status", 0);
    data.append("best_seller", 1);

    axios
      .post("/insertItem_admin_api.php", data, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
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
  return (
    <ItemsContext.Provider
      value={{
        deleteItemHandler,
        items,
        editItem,
        getItem,
        addItem,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};

export default ItemsContext;
