import { PROBLEM_SOLVED_STATUS } from "../config/constant/constants.js"
import { Submission } from "../models/submission.model.js"
import { APIError } from "../utils/APIError.js"
import { APIResponse } from "../utils/APIResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const getAllSubmissions = asyncHandler(async (req, res) => {
  const { id } = req.user

  const submissions = await Submission.find({ user: id })

  if (!submissions) {
    throw new APIError(404, "No submissions found")
  }

  res.status(200).json(new APIResponse(200, "Successfully fetched all submissions", submissions))
})

const getProblemSubmissions = asyncHandler(async (req, res) => {
  const { problemId } = req.params
  const { id } = req.user

  const submissions = await Submission.find({ user: id, problem: problemId })

  if (!submissions) {
    throw new APIError(404, "No submissions found")
  }

  res.status(200).json(new APIResponse(200, "Successfully fetched all submissions", submissions))
})

const getProblemSubmissionsCount = asyncHandler(async (req, res) => {
  const { problemId } = req.params

  const submissionsCount = (
    await Submission.distinct("user", {
      problem: problemId,
      status: PROBLEM_SOLVED_STATUS.ACCEPTED,
    })
  ).length

  if (!submissionsCount) {
    throw new APIError(404, "No submissions found")
  }

  res.status(200).json({
    statusCode: 200,
    message: "Successfully fetched all submissions",
    submissionsCount,
  })
})

export { getAllSubmissions, getProblemSubmissions, getProblemSubmissionsCount }
