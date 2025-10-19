import API from "./api"

const getUserDetails = async () => {
  const response = await API.get("/user/me")
  return response
}
const updateUserProfile = async ({ fullName, username, email }) => {
  const response = await API.patch("/user/updateProfile", {
    fullName,
    username,
    email,
  })
  return response
}
const updateUserPassword = async ({ currentPassword, newPassword, confirmNewPassword }) => {
  const response = await API.post("/user/updatePassword", {
    currentPassword,
    newPassword,
    confirmNewPassword,
  })
  return response
}

export { getUserDetails, updateUserProfile, updateUserPassword }
