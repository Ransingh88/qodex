import API from "./api"

const executeCode = async (payload) => {
  const response = await API.post("/execution/execute", payload)
  return response
}

export { executeCode }
