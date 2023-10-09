import { createContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia("(prefers-color-scheme:adark)").matches,
    "isDarkMode"
  );

  useEffect(() => {
    //document.documentElement === root html element
    if (isDarkMode) {
      document.documentElement.classList.remove("light-mode");
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
      document.documentElement.classList.add("light-mode");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((isDarkMode) => !isDarkMode);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// const useDarkMode = () => {
//   const context = useContext(DarkModeContext);
//   if (context === undefined)
//     throw new Error("DarkModeContext was used outside of DarkModeProvider");
//   return context;
// };

DarkModeProvider.propTypes = {
  children: PropTypes.any,
};

export { DarkModeProvider, DarkModeContext };
