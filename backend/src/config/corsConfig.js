import dotenv from "dotenv"
dotenv.config()

const getAllowedOrigins = () => {
  switch (process.env.NODE_ENV) {
    case "production":
      return process.env.CORS_ORIGIN.split(",")
    case "development":
      return process.env.CORS_ORIGIN.split(",")
    default:
      return []
  }
}

export { getAllowedOrigins }
