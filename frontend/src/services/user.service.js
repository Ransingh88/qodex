import { API } from "./api"

const getUserDetails = async () => {
  const response = await API.get("/user/me")
  return response
}

export { getUserDetails }
