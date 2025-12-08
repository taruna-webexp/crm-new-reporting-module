import { createTheme, PaletteOptions } from "@mui/material/styles";

export const lightPalette: PaletteOptions = {
  mode: "light",
  primary: { main: "#1a1a1a" },
  secondary: { main: "#d900ffff" },
  background: { default: "#f7f7f7", paper: "#ffffff" },
  text: { primary: "#212121", secondary: "#757575" },
};

export const darkPalette: PaletteOptions = {
  mode: "dark",
  primary: { main: "#704646ff" },
  secondary: { main: "#ce93d8" },
  background: { default: "#141414", paper: "#1e1e1e" },
  text: { primary: "#ffffff", secondary: "#bdbdbd" },
};

export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: mode === "light" ? lightPalette : darkPalette,

    typography: {
      h1: {
        fontSize: "2.5rem",
        fontWeight: 700,
        lineHeight: 1.2,
      },
      h2: {
        fontSize: "2rem",
        fontWeight: 600,
        lineHeight: 1.3,
      },
      h3: {
        fontSize: "1.75rem",
        fontWeight: 600,
      },
      h4: {
        fontSize: "1.5rem",
        fontWeight: 600,
      },
      h5: {
        fontSize: "1.25rem",
        fontWeight: 500,
      },
      h6: {
        fontSize: "1.125rem",
        fontWeight: 500,
      },
    },
  });
