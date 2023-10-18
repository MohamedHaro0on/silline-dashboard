// thirdParty Imports  :
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Grid } from "@mui/material";

// Local Files Imports :
import "./App.scss";
import "./style/dark.scss";
import Home from "./pages/home/Home";
import Login from "./pages/auth/login/loginPage";
import SignUp from "./pages/auth/signup/signUpPage";
import strings from "./assets/locals/locals";
import ProtectedRoute from "./pages/auth/protectedRoutes/protectedRoutes";
import Items from "./pages/item/items";
import AddItem from "./pages/item/addItem/addItem";

import LanguageContext from "./context/langContext";
import DarkModeContext from "./context/darkModeContext";
import { UserContextProvider } from "./context/authContext";
import { ItemsContextProvider } from "./context/itemsContext";
import { ToastContainer } from "react-toastify";
import Categories from "./pages/category/categories";
import { CategoriesContextProvider } from "./context/categoryContext";
import AddCategory from "./pages/category/addCategory/addCategory";
import axios from "axios";


axios.defaults.baseURL = "http://localhost:8080//php"
const App = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { lang } = useContext(LanguageContext);
  strings.setLanguage(lang);


  return (
    <BrowserRouter>
      <UserContextProvider>
        <ItemsContextProvider>
          <CategoriesContextProvider>
            <Grid
              container
              spacing={0}
              className={darkMode ? "app dark" : "app"}
              dir={lang === "ar" ? "rtl" : "ltr"}
              minHeight={"100vh"}
            >
              <Routes>
                <Route index exact path="/" element={<Login />} />
                <Route exact path="/sign-up" element={<SignUp />} />

                <Route
                  path="/home"
                  element={<ProtectedRoute component={<Home />} />}
                />

                <Route
                  path="/items"
                  element={<ProtectedRoute component={<Items />} />}
                />
                <Route
                  path="/items/add"
                  element={<ProtectedRoute component={<AddItem />} />}
                />
                <Route
                  path="/items/:id"
                  element={<ProtectedRoute component={<AddItem />} />}
                />

                <Route
                  path="/categories"
                  element={<ProtectedRoute component={<Categories />} />}
                />
                <Route
                  path="/categories/add"
                  element={<ProtectedRoute component={<AddCategory />} />}
                />
                <Route
                  path="/categories/:id"
                  element={<ProtectedRoute component={<AddCategory />} />}
                />
              </Routes>

              <ToastContainer />
            </Grid>
          </CategoriesContextProvider>
        </ItemsContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  );
};
export default App;
