import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext(null);

const FONT_SIZE_MAP = {
  small: "14px",
  medium: "16px",
  large: "18px",
};

const FONT_STYLE_MAP = {
  modern:
    "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
  clean:
    "Arial, Helvetica, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  elegant: "Georgia, Cambria, Times New Roman, serif",
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("nexustalent-theme") || "light"
  );

  const [fontSize, setFontSize] = useState(
    () => localStorage.getItem("nexustalent-font-size") || "medium"
  );

  const [fontStyle, setFontStyle] = useState(
    () => localStorage.getItem("nexustalent-font-style") || "modern"
  );

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    root.style.fontSize = FONT_SIZE_MAP[fontSize];
    root.style.fontFamily = FONT_STYLE_MAP[fontStyle];

    localStorage.setItem("nexustalent-theme", theme);
    localStorage.setItem("nexustalent-font-size", fontSize);
    localStorage.setItem("nexustalent-font-style", fontStyle);
  }, [theme, fontSize, fontStyle]);

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
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
  return useContext(ThemeContext);
}