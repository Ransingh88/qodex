import { User } from "../models/user.model.js"
import { APIError } from "../utils/APIError.js"
import { APIResponse } from "../utils/APIResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const getUserProfile = asyncHandler(async (req, res) => {
  const user = req.user

  if (!user) {
    throw new APIError(404, "User not found")
  }

  res.status(200).json(
    new APIResponse(200, "User profile retrieved successfully", {
      user,
    })
  )
})

const updateUserProfile = asyncHandler(async (req, res) => {
  const { fullName, email, username } = req.body
  const { _id } = req.user

  if (!fullName || !email || !username) {
    throw new APIError(400, "Please provide all required fields")
  }

  const updatePayload = {
    fullName,
    email,
    username,
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user?._id,
    { $set: updatePayload },
    { new: true }
  ).select("-password -refreshToken")

  res
    .status(200)
    .json(new APIResponse(200, "user data updated successfully", updatedUser))
})

const updateCurrentPassword = asyncHandler(async (req, res) => {
  const { currentPassword, confirmNewPassword, newPassword } = req.body

  if (!currentPassword || !newPassword) {
    throw new APIError(400, "Please provide current and new password")
  }
  if (currentPassword === newPassword) {
    throw new APIError(
      400,
      "New password cannot be the same as current password"
    )
  }
  if (newPassword !== confirmNewPassword) {
    throw new APIError(400, "New password and confirm password do not match")
  }

  const user = await User.findById(req.user?._id)

  const isPasswordCorrect = await user.isPasswordCorrect(currentPassword)

  if (!isPasswordCorrect) {
    throw new APIError(401, "Current password is incorrect")
  }

  user.password = newPassword
  await user.save()

  res.status(200).json(new APIResponse(200, "Password updated successfully"))
})

export { getUserProfile, updateUserProfile, updateCurrentPassword }
