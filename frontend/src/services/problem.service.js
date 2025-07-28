import API from "./api"

const getAllProblems = async () => {
  const response = await API.get("/problem/getAllProblems")
  return response
}

export { getAllProblems }
