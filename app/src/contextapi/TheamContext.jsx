// ThemeContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

// 1. Create the Context
const ThemeContext = createContext();

// 2. Create a Provider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  // Load saved theme on mount
  useEffect(() => {
    const saved = localStorage.getItem("theme") || "dark    ";
    setTheme(saved);
    document.documentElement.classList.toggle("dark", saved === "dark");
  }, []);

  // Apply changes when theme updates
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle function
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 3. Create a custom hook for easy access
export const useTheme = () => useContext(ThemeContext);
