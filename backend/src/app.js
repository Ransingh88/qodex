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
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
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
import authRouter from "./routers/auth.route.js"
import userRouter from "./routers/user.routes.js"
import problemRouter from "./routers/problem.route.js"
import executionRouter from "./routers/execution.route.js"
import submissionRouter from "./routers/submission.route.js"
import playlistRouter from "./routers/playlist.route.js"

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/user", userRouter)
app.use("/api/v1/problem", problemRouter)
app.use("/api/v1/execution", executionRouter)
app.use("/api/v1/submission", submissionRouter)
app.use("/api/v1/playlist", playlistRouter)

// error handler
app.use(errorHandler) // must be the last middleware
