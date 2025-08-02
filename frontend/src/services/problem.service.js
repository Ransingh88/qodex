import API from "./api"

const getAllProblems = async () => {
  const response = await API.get("/problem/getAllProblems")
  return response
}

const getProblemDetails = async (problemId) => {
  const response = await API.get(`/problem/getDetails/${problemId}`)
  return response
}

export { getAllProblems, getProblemDetails }
