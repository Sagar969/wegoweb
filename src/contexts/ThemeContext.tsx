// @ts-nocheck

import { createContext, useContext, useState, useEffect } from "react";
import { ConfigProvider, theme } from "antd";
import Color from "color";

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme && savedTheme !== "system") {
      return savedTheme;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });
  const [primaryColor, setPrimaryColor] = useState<string>("blue");

  useEffect(() => {
    const savedColor = localStorage.getItem("primaryColor");
    if (savedColor) {
      setPrimaryColor(savedColor);
    } else {
      setPrimaryColor(primaryColor);
    }
  }, []);

  useEffect(() => {
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (theme === "system") {
        setTheme(e.matches ? "dark" : "light");
      }
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, [theme]);

  useEffect(() => {
    if (typeof theme === "string") {
      document.body.className = theme;
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, primaryColor, setPrimaryColor }}
    >
      <ConfigProvider>{children}</ConfigProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
