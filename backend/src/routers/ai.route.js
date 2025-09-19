import express from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { analyzeComplexity } from "../controllers/analysis.controller.js"

const router = express.Router()

router.route("/analysis/complexity").post(verifyJWT, analyzeComplexity)

export default router
