import { useState, useEffect } from "react";
import { Button } from "./Button";

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("theme") === "dark",
  );
  useEffect(() => {
    const nextTheme = isDark ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };
  return <Button onClick={toggleTheme}>{isDark ? "🌙" : "☀️"}</Button>;
};
