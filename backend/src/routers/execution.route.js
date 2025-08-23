import express from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { executeCode } from "../controllers/execution.controller.js"

const router = express.Router()

router.route("/execute").post(verifyJWT, executeCode)

export default router
