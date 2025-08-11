import React, { useEffect, useState, createContext, useContext } from "react";

const ThemeContext = createContext<{
  theme: string;
  setTheme: (theme: string) => void;
  forceLight: boolean;
  setForceLight: (force: boolean) => void;
}>({
  theme: "light",
  setTheme: () => {},
  forceLight: false,
  setForceLight: () => {},
});

export const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState("light");
  const [forceLight, setForceLight] = useState(false);

  useEffect(() => {
    // Load theme from localStorage unless forceLight is true
    if (!forceLight) {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) setTheme(storedTheme);
    } else {
      setTheme("light");
    }
  }, [forceLight]);

  useEffect(() => {
    if (!forceLight) {
      localStorage.setItem("theme", theme);
      document.documentElement.classList.toggle("dark", theme === "dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme, forceLight]);

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, forceLight, setForceLight }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
