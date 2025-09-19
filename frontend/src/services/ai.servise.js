import API from "./api"
const analyzeCodeComplexity = async (code, language) => {
  const response = await API.post("/ai/analysis/complexity", {
    code,
    language,
  })
  return response.data
}

export { analyzeCodeComplexity }
