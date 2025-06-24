import express from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { getUserProfile, updateCurrentPassword, updateUserProfile } from "../controllers/user.controller.js"

const router = express.Router()

router.route("/me").get(verifyJWT, getUserProfile)
router.route("/updateProfile").patch(verifyJWT, updateUserProfile)
router.route("/updatePassword").post(verifyJWT, updateCurrentPassword)

export default router
