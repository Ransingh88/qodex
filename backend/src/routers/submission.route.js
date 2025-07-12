import express from "express"
import {
  getAllSubmissions,
  getProblemSubmissions,
  getProblemSubmissionsCount,
} from "../controllers/submission.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.route("/all").get(verifyJWT, getAllSubmissions)
router.route("/problem/:problemId").get(verifyJWT, getProblemSubmissions)
router.route("/problemSubmissionsCount/:problemId").get(verifyJWT, getProblemSubmissionsCount)

export default router
