import dotenv from "dotenv"
dotenv.config()
import { CORS_ORIGIN } from "../config/config.js"

const getAllowedOrigins = () => {
  // If wildcard is specified, allow all origins
  if (CORS_ORIGIN === "*") {
    return ["*"]
  }

  // If no origin is specified, return empty array
  if (!CORS_ORIGIN) {
    return []
  }

  switch (process.env.NODE_ENV) {
    case "production":
      // In production, only take the first origin
      return [CORS_ORIGIN.split(",")[0].trim()]
    case "development":
      // In development, allow multiple origins
      return CORS_ORIGIN.split(",").map((origin) => origin.trim())
    default:
      return []
  }
}

export { getAllowedOrigins }
