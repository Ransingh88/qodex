import express from "express"
import {
  login,
  logout,
  refreshAccessToken,
  register,
} from "../controllers/auth.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(verifyJWT, logout)
router.route("/refreshAccessToken").post(refreshAccessToken)

export default router
