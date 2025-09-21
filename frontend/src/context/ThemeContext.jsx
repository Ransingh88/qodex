import { createContext, useContext, useEffect, useState } from "react"
import { THEME } from "@/constants/constant"

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Load theme from localStorage or default to DARK
    return localStorage.getItem("theme") || THEME.DARK
  })

  useEffect(() => {
    const html = document.documentElement
    html.classList.toggle(THEME.DARK, theme === THEME.DARK)
    localStorage.setItem("theme", theme)
  }, [theme])

  const toggleTheme = () => setTheme((prev) => (prev === THEME.DARK ? THEME.LIGHT : THEME.DARK))

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
