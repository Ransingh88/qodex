import express from "express"
import {
  createProblem,
  deleteProblem,
  getAllProblems,
  getProblemDetails,
  getSolvedProblems,
  updateProblem,
} from "../controllers/problem.controller.js"
import { authorizedRole, verifyJWT } from "../middlewares/auth.middleware.js"
import { USER_ROLES } from "../config/constant/constants.js"

const { USER, ADMIN } = USER_ROLES

const router = express.Router()

router.route("/create").post(verifyJWT, authorizedRole(ADMIN), createProblem)
router.route("/getAllProblems").get(getAllProblems)
router.route("/getDetails/:id").get(getProblemDetails)
router.route("/update/:id").patch(verifyJWT, authorizedRole(ADMIN), updateProblem)
router.route("/delete/:id").delete(verifyJWT, authorizedRole(ADMIN), deleteProblem)
router.route("/getSolvedProblems").get(verifyJWT, authorizedRole(ADMIN, USER), getSolvedProblems)

export default router
