import { Moon, Sun } from "lucide-react"
import { THEME } from "@/constants/constant"
import { useTheme } from "@/context/ThemeContext"

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button onClick={toggleTheme} className="themeIcon cursor-pointer">
      {theme === THEME.DARK ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  )
}
