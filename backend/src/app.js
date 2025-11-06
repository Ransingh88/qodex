import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { getAllowedOrigins } from "./config/corsConfig.js"

export const app = express()
const allowedOrigins = getAllowedOrigins()

// configurations
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl requests, etc)
      if (!origin) {
        return callback(null, true)
      }

      // If wildcard is allowed, accept all origins
      if (allowedOrigins.includes("*")) {
        return callback(null, true)
      }

      // Check if the origin is in our allowed list
      if (allowedOrigins.includes(origin)) {
        return callback(null, origin)
      }

      // Origin not allowed
      callback(new Error("Not allowed by CORS"))
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
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
import aiRouter from "./routers/ai.route.js"

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/user", userRouter)
app.use("/api/v1/problem", problemRouter)
app.use("/api/v1/execution", executionRouter)
app.use("/api/v1/submission", submissionRouter)
app.use("/api/v1/playlist", playlistRouter)
app.use("/api/v1/ai", aiRouter)

// error handler
app.use(errorHandler) // must be the last middleware
