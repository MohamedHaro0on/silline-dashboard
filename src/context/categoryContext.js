import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import UserContext from "./userContext";
import { toast } from "react-toastify";
import strings from "../assets/locals/locals";
import { useNavigate } from "react-router-dom";
import LanguageContext from "./langContext";

const CategoriesContext = createContext([]);

export const CategoriesContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  const { token } = useContext(UserContext);
  const navigate = useNavigate();

  const { lang } = useContext(LanguageContext);
  strings.setLanguage(lang);

  useEffect(() => {
    if (token) {
      getCategories();
    }
  }, [token]);

  const getCategories = () => {
    axios
      .get("/selectAllCategory.php", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        toast.error(` error .... ${err.message} `, {
          position:
            lang === "ar" ? toast.POSITION.TOP_LEFT : toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const deleteCategoryHandler = (id) => {
    axios
      .post(
        `/DeleteCategoryByID.php`,
        {
          CategoryID: id,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        let temp = categories.map((el) => el);
        temp = temp.filter((el) => el.CategoryID !== id);
        setCategories(temp);
        toast.success("Item deleted Susccessfully");
      })
      .catch((err) => {
        toast.error(` error .... ${err.message} `, {
          position:
            lang === "ar" ? toast.POSITION.TOP_LEFT : toast.POSITION.TOP_RIGHT,
        });
      });
  };
  const editCategory = () => {};

  const getCategory = (id) => {
    return categories.filter((el) => el.CategoryID == id);
  };

  const addCategory = ({ CategoryName, CategoryPicture }) => {
    let data = new FormData();
    data.append("CategoryName", CategoryName);
    data.append("CategoryPicture", CategoryPicture);

    axios
      .post("/insertCategory_api.php", data, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        toast.success(`${strings.itemAddedSuccessfully}`, {
          position:
            lang === "ar" ? toast.POSITION.TOP_LEFT : toast.POSITION.TOP_RIGHT,
        });
        getCategories();
        navigate("/categories");
      })
      .catch((error) => {
        toast.error(` error .... ${error.message} `, {
          position:
            lang === "ar" ? toast.POSITION.TOP_LEFT : toast.POSITION.TOP_RIGHT,
        });
      });
  };
  return (
    <CategoriesContext.Provider
      value={{
        deleteCategoryHandler,
        categories,
        editCategory,
        getCategory,
        addCategory,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesContext;
