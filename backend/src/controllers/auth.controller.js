import { asyncHandler } from "../utils/asyncHandler.js"
import { APIError } from "../utils/APIError.js"
import { APIResponse } from "../utils/APIResponse.js"
import { User } from "../models/user.model.js"
import { trimSpaces } from "../utils/trimSpaces.js"
import { BASE_URL, PORT, REFRESH_TOKEN_SECRET } from "../config/config.js"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import sendEmail from "../utils/sendEmail.js"
// import { OAuth2Client } from "google-auth-library"

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId)
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })

    return { accessToken, refreshToken }
  } catch (error) {
    throw new APIError(500, "something went wrong, while generationg access and refresh token", error)
  }
}

const register = asyncHandler(async (req, res) => {
  const { username, email, fullName, password } = req.body

  if ([fullName, email, username, password].some((field) => trimSpaces(field) === "")) {
    throw new APIError(400, "All fields are required")
  }

  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  })

  if (existingUser) {
    res.status(400)
    throw new APIError(400, "User already exists with this email or username")
  }

  const verificationToken = crypto.randomBytes(32).toString("hex")

  const user = await User.create({
    username: trimSpaces(username).toLowerCase(),
    email: trimSpaces(email).toLowerCase(),
    fullName: trimSpaces(fullName),
    password: password,
    verificationToken,
  })

  if (!user) {
    res.status(500)
    throw new APIError(500, "User registration failed")
  }

  const createdUser = await User.findById(user._id).select("-password -verificationToken")

  if (!createdUser) {
    res.status(500)
    throw new APIError(500, "something went wrong while registering the user")
  }

  const verificationUrl = `${BASE_URL}:${PORT}/api/v1/auth/verifyEmail/${verificationToken}`

  const { data, error } = await sendEmail("verifyemail", {
    USER_NAME: createdUser.fullName,
    VERIFICATION_URL: verificationUrl,
    TO_EMAIL: createdUser.email,
  })

  res.status(201).json(
    new APIResponse(201, "User registered successfully", {
      user: createdUser,
      emailResponse: data,
      emailError: error,
    })
  )
})

const verifyEmail = asyncHandler(async (req, res) => {
  const token = req.params.token

  if (!token) {
    throw new APIError(400, "Invalid token")
  }

  const user = await User.findOne({ verificationToken: token })

  if (!user) {
    throw new APIError(404, "Invalid link")
  }

  user.isVerified = true
  user.verificationToken = undefined
  await user.save()

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

  const createdUser = await User.findById(user._id).select("-password -refreshToken")

  if (!createdUser) {
    res.status(500)
    throw new APIError(500, "something went wrong while registering the user")
  }

  const { data, error } = await sendEmail("welcome", {
    USER_NAME: createdUser.fullName,
  })

  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  }

  const redirectTo = `${BASE_URL}:${PORT}`

  return res
    .status(302)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(new APIResponse(302, "Email verified successfully", { emailResponse: data, emailError: error }))
    .redirect(redirectTo)
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

  if (!user.isVerified) {
    throw new APIError(400, "Email not verified, please verify your email.")
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

  const createdUser = await User.findById(user._id).select("-password -refreshToken")

  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  }

  res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new APIResponse(200, "logged in successfully", {
        user: createdUser,
        accessToken,
        refreshToken,
      })
    )
})

// const google_client = new OAuth2Client(GOOGLE_CLIENT_ID)
const loginGoogle = asyncHandler(async (req, res) => {
  const { token } = req.body

  if (!token) {
    throw new APIError(400, "missing token")
  }

  // const ticket = await google_client.verifyIdToken({
  //   idToken: token,
  //   audience: GOOGLE_CLIENT_ID,
  // })

  // const payload = ticket.getPayload()

  const googleRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: { Authorization: `Bearer ${token}` },
  })
  const payload = await googleRes.json()

  const googleId = payload.sub
  const email = payload.email
  const fullName = payload.name
  const username = payload?.given_name[0].toLowerCase() + payload?.family_name.toLowerCase()
  const avatar = payload.picture
  const email_verified = payload.email_verified

  if (!email || !email_verified) {
    throw new APIError(400, "Google account email not available or not verifieds")
  }

  // 1) Find by googleId
  let user = await User.findOne({ googleId })

  if (!user) {
    // 2) Find by email
    const existingByEmail = await User.findOne({ email })

    if (existingByEmail) {
      // Link accounts: save googleId to that user or ask user to confirm in UI to link.
      existingByEmail.googleId = googleId
      existingByEmail.avatar = existingByEmail.avatar || avatar
      existingByEmail.fullName = existingByEmail.fullName || fullName
      user = await existingByEmail.save()
    } else {
      // 3) Create a new user
      user = await User.create({
        username: trimSpaces(username).toLowerCase(),
        email: trimSpaces(email).toLowerCase(),
        fullName: trimSpaces(fullName),
        googleId,
        avatar,
      })
    }
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

  const createdUser = await User.findById(user._id).select("-password -refreshToken")

  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  }

  res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new APIResponse(200, "logged in successfully", {
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
    .json(new APIResponse(200, "logged out successfully"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.headers.authorization?.split(" ")[1] || req.body?.refreshToken

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
    .json(new APIResponse(200, "Access token refreshed successfully"))
})

export { register, login, logout, refreshAccessToken, loginGoogle, verifyEmail }
