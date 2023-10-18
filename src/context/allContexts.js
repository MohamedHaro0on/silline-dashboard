import { DarkModeContextProvider } from "./darkModeContext";
import { ItemsContextProvider } from "./itemsContext";
import { LanguageContextProvider } from "./langContext";

const AllContextsProvider = ({ children }) => {
  return (
    // <UserContextProvider>
      <LanguageContextProvider>
        {/* <ItemsContextProvider> */}
          <DarkModeContextProvider>{children}</DarkModeContextProvider>
        {/* </ItemsContextProvider> */}
      </LanguageContextProvider>
    // </UserContextProvider>
  );
};

export default AllContextsProvider;
