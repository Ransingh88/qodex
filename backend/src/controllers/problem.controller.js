import axios from "axios"
import {
  batchSubmit,
  getLanguageId,
  getLanguages,
  pollingBatchResults,
} from "../services/judge0.service.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { APIResponse } from "../utils/APIResponse.js"
import { APIError } from "../utils/APIError.js"
import { Problem } from "../models/problem.model.js"

const createProblem = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    difficulty,
    tags,
    topics,
    examples,
    constrains,
    hints,
    editorial,
    testcases,
    codeSnippets,
    referenceSolutions,
  } = req.body

  for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
    if (!solutionCode) {
      return res.status(400).json({
        message: `Reference solution for ${language} is required`,
      })
    }

    const languageId = await getLanguageId(language)

    if (!languageId) {
      return res.status(400).json({
        message: `The language: ${language} is not supported`,
      })
    }

    const submissions = testcases.map(({ input, output }) => ({
      language_id: languageId,
      source_code: solutionCode,
      stdin: input,
      expected_output: output,
    }))

    const submissionResponse = await batchSubmit(submissions)

    const tokens = submissionResponse.map((res) => res.token)

    const result = await pollingBatchResults(tokens)

    for (let i = 0; i < result.length; i++) {
      const submission = result[i]

      if (submission.status.id !== 3) {
        throw new APIError(400, `Submission failed for test case ${i + 1}`)
      }
    }
  } 

  const problemPayload = {
    title,
    description,
    difficulty: difficulty.toLowerCase(),
    tags,
    topics,
    examples,
    constrains,
    hints,
    editorial,
    testcases,
    codeSnippets,
    referenceSolutions,
    createdBy: req.user._id,
  }

  const createdProblem = await Problem.create(problemPayload)

  if (!createdProblem) {
    throw new APIError(500, "Problem could not be created")
  }

  res
    .status(201)
    .json(new APIResponse(201, "Problem created successfully", createdProblem))
})

const getAllProblems = asyncHandler(async (req, res) => {
  res.send("Get All Problems Endpoint")
})
const getProblemDetails = asyncHandler(async (req, res) => {
  res.send("Get Problem Details Endpoint")
})
const updateProblem = asyncHandler(async (req, res) => {
  res.send("Update Problem Endpoint")
})
const deleteProblem = asyncHandler(async (req, res) => {
  res.send("Delete Problem Endpoint")
})
const getSolvedProblem = asyncHandler(async (req, res) => {
  res.send("Get Solved Problem Endpoint")
})

export {
  createProblem,
  getAllProblems,
  getProblemDetails,
  deleteProblem,
  updateProblem,
  getSolvedProblem,
}
