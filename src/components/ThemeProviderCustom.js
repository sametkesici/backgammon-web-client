import { ThemeProvider, createTheme } from "@mui/material/styles";
import React, { createContext } from "react";
import { useEffect, useState, useContext } from "react";

export const ThemeContext = createContext({
  theme: "light",
  setTheme: () => {},
});

export const ThemeProviderCustom = React.memo(({ children }) => {
  const [theme, setTheme] = useState();

  const theme1 = createTheme({
    palette: {
      mode: theme,
    },
  });

  return (
    <ThemeContext.Provider value={{ setTheme, theme }}>
      <ThemeProvider theme={theme1}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
});
