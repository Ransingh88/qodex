import API from "./api"

const registerUser = async ({ fullname, username, email, password }) => {
  const response = await API.post("/auth/register", {
    fullName: fullname,
    username: username,
    email: email,
    password: password,
  })
  return response
}
const loginUser = async (email, password) => {
  const response = await API.post("/auth/login", {
    email,
    password,
  })
  return response
}

const loginWithGoogle = async (token) => {
  const response = await API.post("/auth/google", {
    token,
  })
  return response
}

const logoutUser = async () => {
  const response = await API.get("/auth/logout")
  return response
}

export { registerUser, loginUser, logoutUser, loginWithGoogle }
