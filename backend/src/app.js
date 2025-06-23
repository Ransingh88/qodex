import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { CORS_ORIGIN } from "./config/config.js"
// import dotenv from "dotenv"

// dotenv.config()
// dotenv.config({ path: "./.env" })

export const app = express()

// configurations
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
)
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(cookieParser())

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the Qodex API",
  })
})

app.get("/healthCheck", (req, res) => {
  res.status(200).json({
    message: "Server is healthy",
  })
})

// routesImport
import { errorHandler } from "./utils/errorHandler.js"
import userRouter from "./routers/user.route.js"

app.use("/api/v1/user", userRouter)

// error handler
app.use(errorHandler) // must be the last middleware
