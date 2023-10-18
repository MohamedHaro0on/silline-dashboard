import { createContext, useState } from "react";
import React from "react";

const DarkModeContext = createContext(false);

export const DarkModeContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode((prevState) => !prevState);
  };
  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
export default DarkModeContext;
