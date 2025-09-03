import { useState } from "react"
import { LANGUAGES } from "@/constants/constant"

export const useCodeEditor = () => {
  const [currentLanguage, setCurrentLanguage] = useState("javascript")
  const [codes, setCodes] = useState(
    Object.fromEntries(
      Object.entries(LANGUAGES).map(([key, value]) => [key, value.template])
    )
  )
  const changeLang = (lang) => {
    setCurrentLanguage(lang)
  }

  const updateCode = (newCode) => {
    setCodes((prevCodes) => ({
      ...prevCodes,
      [currentLanguage]: newCode,
    }))
  }

  return {
    currentLanguage,
    codes: codes[currentLanguage],
    changeLang,
    updateCode,
  }
}
