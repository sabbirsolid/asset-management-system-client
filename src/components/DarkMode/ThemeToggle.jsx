import useTheme from "./useTheme";
import { Moon, Sun } from "lucide-react";

 const ThemeToggle =()=> {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} aria-label="Toggle theme">
      {theme === "light" ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </button>
  );
}
export default ThemeToggle;