import jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/asyncHandler.js"
import { APIError } from "../utils/APIError.js"
import { ACCESS_TOKEN_SECRET } from "../config/config.js"
import { User } from "../models/user.model.js"

export const verifyJWT = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies.accessToken || req.headers.authorization?.split(" ")[1]

  if (!token) {
    throw new APIError(401, "unauthorized request")
  }

  const decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET)

  if (!decodedToken) {
    throw new APIError(401, "unauthorized request, invalid access token")
  }

  const user = await User.findById(decodedToken?._id).select(
    "-password -refreshToken"
  )

  if (!user) {
    throw new APIError(401, "unauthorized request, invalid access token")
  }

  req.user = user
  next()
})

export const authorizedRole = (...roles) =>
  asyncHandler(async (req, res, next) => {

    if (!req.user.role) {
      const user = await User.findById(req.user._id)
      req.user.role = user.role
    }

    if (!roles.includes(req.user.role)) {
      throw new APIError(
        403,
        "Forbidden: You do not have access to this resource"
      )
    }
    next()
  })
