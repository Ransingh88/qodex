import jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/asyncHandler.js"
import { APIError } from "../utils/APIError.js"
import { APIResponse } from "../utils/APIResponse.js"
import { User } from "../models/user.model.js"
import { trimSpaces } from "../utils/trimSpaces.js"
import { JWT_EXPIRATION, JWT_SECRET } from "../config/config.js"

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId)
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })

    return { accessToken, refreshToken }
  } catch (error) {
    throw new APIError(
      500,
      "something went wrong, while generationg access and refresh token"
    )
  }
}

const register = asyncHandler(async (req, res) => {
  const { username, email, fullName, password } = req.body

  if (
    [fullName, email, username, password].some(
      (field) => trimSpaces(field) === ""
    )
  ) {
    throw new APIError(400, "All fields are required")
  }

  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  })

  if (existingUser) {
    res.status(400)
    throw new APIError(400, "User already exists with this email or username")
  }

  const user = await User.create({
    username: trimSpaces(username).toLowerCase(),
    email: trimSpaces(email).toLowerCase(),
    fullName: trimSpaces(fullName),
    password: password,
  })

  if (!user) {
    res.status(500)
    throw new APIError(500, "User registration failed")
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  )

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )

  if (!createdUser) {
    res.status(500)
    throw new APIError(500, "something went wrong while registering the user")
  }

  const cookieOptions = {
    httpOnly: true,
    secure: true,
  }

  res
    .status(201)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new APIResponse(201, "User registered successfully", {
        user: createdUser,
        accessToken,
        refreshToken,
      })
    )
})

export { register }
