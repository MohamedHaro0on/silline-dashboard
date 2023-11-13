import axios from "axios";
import { useState, createContext, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LanguageContext from "./langContext";
import strings from "../assets/locals/locals";
export const UserContext = createContext();

const savedToken = JSON.parse(localStorage.getItem("token"));
const savedIsAuth = JSON.parse(localStorage.getItem("isAuth"));

export const UserContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(
    savedIsAuth !== undefined ? savedIsAuth : false
  );
  const [token, setToken] = useState(savedToken ? savedToken : null);
  const navigate = useNavigate();

  const { lang } = useContext(LanguageContext);
  strings.setLanguage(lang);

  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("isAuth", JSON.stringify(isAuth));
    return () => {
      localStorage.setItem("token", JSON.stringify(null));
      localStorage.setItem("isAuth", JSON.stringify(false));
    };
  }, [token, isAuth]);

  const login = ({ userName, password }) => {
    axios
      .post("https://silinbakeri.net/login.php", {
        admin_username: userName,
        admin_password: password,
      })
      .then((res) => {
        if (res.data.status === 1) {
          toast.success(strings.successfullLogin, {
            position:
              lang === "ar"
                ? toast.POSITION.TOP_LEFT
                : toast.POSITION.TOP_RIGHT,
          });
          setIsAuth(true);
          setToken(res.data.jwt);
          navigate("/home");
        } else if (res.data.status === 0) {
          toast.error(strings.wrongCredentials, {
            position:
              lang === "ar"
                ? toast.POSITION.TOP_LEFT
                : toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((error) => {
        if (error) {
          toast.error(`  Login error .... ${error}`, {
            position:
              lang === "ar"
                ? toast.POSITION.TOP_LEFT
                : toast.POSITION.TOP_RIGHT,
          });
        }
      });
  };

  const register = ({ userName, email, password }) => {
    axios
      .post("https://silinbakeri.net/create_admin_api.php", {
        admin_username: userName,
        admin_password: password,
        admin_email: email,
      })
      .then((res) => {
        if (res.data.status === 1) {
          toast.success(strings.successfullRegistration, {
            position:
              lang === "ar"
                ? toast.POSITION.TOP_LEFT
                : toast.POSITION.TOP_RIGHT,
          });
          navigate("/");
        } else {
          toast.error(`Error .... ${res}`);
        }
      })
      .catch((error) => {
        if (error) {
          toast.error(` ${strings.registerError} ......  ${error}`, {
            position:
              lang === "ar"
                ? toast.POSITION.TOP_LEFT
                : toast.POSITION.TOP_RIGHT,
          });
        }
      });
  };
  const logout = () => {
    setTimeout(() => {
      axios
        .post("/logout.php")
        .then((res) => {
          setIsAuth(false);
          setToken(null);
          toast.success(strings.loggedOut, {
            position:
              lang === "ar"
                ? toast.POSITION.TOP_LEFT
                : toast.POSITION.TOP_RIGHT,
          });
        })
        .catch((err) => {
          toast.error(
            ` ${strings.loggingOutError} ......  ${err.data.message}`,
            {
              position:
                lang === "ar"
                  ? toast.POSITION.TOP_LEFT
                  : toast.POSITION.TOP_RIGHT,
            }
          );
        });
    }, 1000);
  };

  return (
    <UserContext.Provider value={{ isAuth, login, logout, token, register }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
