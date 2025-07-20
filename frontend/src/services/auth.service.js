import API from "./api"

const loginUser = async (email, password) => {
  const response = await API.post("/auth/login", {
    email,
    password,
  })
  return response
}

const logoutUser = async () => {
  const response = await API.get("/auth/logout")
  return response
}

export { loginUser, logoutUser }
