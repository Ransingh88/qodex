import { useState, useEffect } from "react"
import { THEME } from "../../constants/constant"
import { Moon, Sun } from "lucide-react"

export default function ThemeToggle() {
  // Default to DARK mode
  const [theme, setTheme] = useState(THEME.DARK)

  useEffect(() => {
    const html = document.documentElement
    html.classList.toggle(THEME.DARK, theme === THEME.DARK)
  }, [theme])

  const toggle = () =>
    setTheme((prev) => (prev === THEME.DARK ? THEME.LIGHT : THEME.DARK))

  return (
    <button onClick={toggle} className="themeIcon cursor-pointer">
      {theme === THEME.DARK ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  )
}
