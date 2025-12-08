"use client";
import React, { createContext, useContext, useMemo, useState } from "react";
import { ThemeProvider, CssBaseline, GlobalStyles } from "@mui/material";
import { getTheme } from "./theme";

const ThemeModeContext = createContext({
  mode: "light" as "light" | "dark",
  toggleTheme: () => {},
});

export const useThemeMode = () => useContext(ThemeModeContext);

export default function ThemeModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const toggleTheme = () => setMode((m) => (m === "light" ? "dark" : "light"));
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
  <ThemeModeContext.Provider value={{ mode, toggleTheme }}>
    {/* CSS variables first */}
    <GlobalStyles
      styles={{
        ":root": {
          "--color-primary": theme.palette.primary.main,
          "--color-secondary": theme.palette.secondary.main,
          "--color-text-primary": theme.palette.text.primary,
          "--color-text-secondary": theme.palette.text.secondary,
          "--color-bg-default": theme.palette.background.default,
          "--color-bg-paper": theme.palette.background.paper,
        },
      }}
    />

    {/* Then initialize MUI + CSSBaseline */}
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  </ThemeModeContext.Provider>
);

}
