import { api } from "../utils/axios"

const login = async (email, password) => {
  const response = await api.post("/auth/login", {
    email,
    password,
  })
  return response
}

export { login }
