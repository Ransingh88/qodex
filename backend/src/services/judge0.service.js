import axios from "axios"

export const getLanguageId = (language) => {
  const languageMap = {
    c: 50,
    cpp: 54,
    java: 62,
    python3: 71,
    javascript: 63,
    ruby: 72,
    go: 60,
    csharp: 52,
    kotlin: 78,
    php: 56,
    swift: 73,
    typescript: 74,
    rust: 79,
    scala: 64,
    perl: 55,
    haskell: 57,
  }

  return languageMap[language.toLowerCase()] || null
}

export const getLanguages = async () => {
  const response = await axios.get("http://172.22.131.145:2358/languages")
  return response.data
}
