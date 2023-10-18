/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState } from "react";
import React from "react";

const LanguageContext = createContext("ar");

export const LanguageContextProvider = ({ children }) => {
  const prevLang = localStorage.getItem("lang")
    ? localStorage.getItem("lang")
    : "ar";
  const [lang, setLang] = useState(prevLang);

  const setLangToEn = () => {
    setLang("en");
    localStorage.setItem("lang", "en");
  };
  const setLangToAr = () => {
    setLang("ar");
    localStorage.setItem("lang", "ar");
  };

  return (
    <LanguageContext.Provider value={{ lang, setLangToEn, setLangToAr }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
