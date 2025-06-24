import { asyncHandler } from "../utils/asyncHandler.js"
import { APIError } from "../utils/APIError.js"
import { APIResponse } from "../utils/APIResponse.js"
import { User } from "../models/user.model.js"
import { trimSpaces } from "../utils/trimSpaces.js"
import { REFRESH_TOKEN_SECRET } from "../config/config.js"
import jwt from "jsonwebtoken"

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

const login = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body

  if ((!username || !email) && !password) {
    throw new APIError(400, "all fields are required")
  }

  const user = await User.findOne({ $or: [{ email }, { username }] })

  if (!user) {
    throw new APIError(404, "Invalid credentials")
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password)
  if (!isPasswordCorrect) {
    throw new APIError(401, "Invalid credentials")
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  )

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )

  const cookieOptions = {
    httpOnly: true,
    secure: true,
  }

  res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new APIResponse(200, "User logged in successfully", {
        user: createdUser,
        accessToken,
        refreshToken,
      })
    )
})

const logout = asyncHandler(async (req, res) => {
  const user = req.user

  user.refreshToken = null
  await user.save({ validateBeforeSave: false })

  res
    .status(200)
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json(new APIResponse(200, "User logged out successfully"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken ||
    req.headers.authorization?.split(" ")[1] ||
    req.body?.refreshToken

  if (!incomingRefreshToken) {
    throw new APIError(401, "unauthorized request")
  }

  const decodedToken = jwt.verify(incomingRefreshToken, REFRESH_TOKEN_SECRET)

  const user = await User.findById(decodedToken?._id)

  if (!user) {
    throw new APIError(401, "unauthorized request, invalid refresh token1")
  }

  if (user.refreshToken !== incomingRefreshToken) {
    throw new APIError(401, "unauthorized request, invalid refresh token2")
  }

  const accessToken = user.generateAccessToken()

  res
    .status(200)
    .cookie("accessToken", accessToken, { httpOnly: true, secure: true })
    .json(
      new APIResponse(200, "Access token refreshed successfully")
    )
})

export { register, login, logout, refreshAccessToken }
