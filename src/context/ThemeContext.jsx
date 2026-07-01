/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext(null);

const FONT_SIZE_MAP = {
  small: "14px",
  medium: "16px",
  large: "18px",
};

const FONT_STYLE_MAP = {
  modern:
    "Roboto, Arial, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
  clean:
    "Roboto, Arial, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
  elegant:
    "Roboto, Arial, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
};

function getStoredValue(key, fallbackValue) {
  const storedValue = localStorage.getItem(key);

  if (!storedValue) {
    return fallbackValue;
  }

  return storedValue;
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() =>
    getStoredValue("nexustalent-theme", "light")
  );

  const [fontSize, setFontSize] = useState(() =>
    getStoredValue("nexustalent-font-size", "medium")
  );

  const [fontStyle, setFontStyle] = useState(() =>
    getStoredValue("nexustalent-font-style", "modern")
  );

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("nexustalent-theme", theme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    const selectedFontSize = FONT_SIZE_MAP[fontSize] || FONT_SIZE_MAP.medium;

    root.style.fontSize = selectedFontSize;

    localStorage.setItem("nexustalent-font-size", fontSize);
  }, [fontSize]);

  useEffect(() => {
    const selectedFontStyle =
      FONT_STYLE_MAP[fontStyle] || FONT_STYLE_MAP.modern;

    document.body.style.fontFamily = selectedFontStyle;

    localStorage.setItem("nexustalent-font-style", fontStyle);
  }, [fontStyle]);

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === "dark" ? "light" : "dark"
    );
  };

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
      fontSize,
      setFontSize,
      fontStyle,
      setFontStyle,
    }),
    [theme, fontSize, fontStyle]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}
