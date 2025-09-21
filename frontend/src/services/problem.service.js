import API from "./api"

const getAllProblems = async (filters) => {
  const query = new URLSearchParams(filters).toString()
  const response = await API.get(`/problem/getAllProblems?${query}`)
  return response
}

const getProblemDetails = async (problemId) => {
  const response = await API.get(`/problem/getDetails/${problemId}`)
  return response
}

const getProblemCategory = async () => {
  const response = await API.get("/problem/categories")
  return response
}

const getProblemTags = async () => {
  const response = await API.get("/problem/tags")
  return response
}

const getProblemCompanies = async () => {
  const response = await API.get("/problem/companies")
  return response
}

const getProblemDifficulties = async () => {
  const response = await API.get("/problem/difficulties")
  return response
}

const getProblemSubmissions = async (problemId) => {
  const response = await API.get(`/submission/problem/${problemId}`)
  return response
}

export { getAllProblems, getProblemDetails, getProblemSubmissions, getProblemCategory, getProblemTags, getProblemCompanies, getProblemDifficulties }
