import { batchSubmit, getLanguageId, pollingBatchResults } from "../services/judge0.service.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { APIResponse } from "../utils/APIResponse.js"
import { APIError } from "../utils/APIError.js"
import { Problem } from "../models/problem.model.js"
import { PROBLEM_SOLVED_STATUS } from "../config/constant/constants.js"
import { Submission } from "../models/submission.model.js"

const createProblem = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    difficulty,
    tags,
    topics,
    examples,
    constraints,
    askedBy,
    bonus,
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
    constraints,
    askedBy,
    bonus,
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

  res.status(201).json(new APIResponse(201, "Problem created successfully", createdProblem))
})

const getAllProblems = asyncHandler(async (req, res) => {
  const allProblems = await Problem.find()

  if (!allProblems) {
    throw new APIError(404, "Problem not found")
  }

  res.status(200).json(new APIResponse(200, "successfully fetch all problems", allProblems))
})

const getProblemDetails = asyncHandler(async (req, res) => {
  const { id } = req.params || req.body

  const problem = await Problem.findById({ _id: id })

  if (!problem) {
    throw new APIError(404, "Problem not found")
  }

  res.status(200).json(new APIResponse(200, "problem details fetched successfully", problem))
})

const updateProblem = asyncHandler(async (req, res) => {
  const { id } = req.params || req.body

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

  const existingProblem = await Problem.findById({ _id: id })

  if (!existingProblem) {
    throw new APIError(404, "Problem not found")
  }

  if (
    JSON.stringify(referenceSolutions) !== JSON.stringify(existingProblem.referenceSolutions) ||
    JSON.stringify(codeSnippets) !== JSON.stringify(existingProblem.codeSnippets) ||
    JSON.stringify(testcases) !== JSON.stringify(existingProblem.testcases)
  ) {
    for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
      if (!solutionCode) {
        return res.status(400).json({
          message: `Reference solution for ${language} is required`,
        })
      }

      const languageId = await getLanguageId(language)

      if (!languageId) {
        throw new APIError(400, `The language: ${language} is not supported`)
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
          throw new APIError(400, `Submission failed for ${language.toUpperCase()} - test case ${i + 1}`)
        }
      }
    }
  }

  const updateProblemPayload = {
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
  }

  const updatedProblem = await Problem.findByIdAndUpdate({ _id: id }, updateProblemPayload, { new: true })

  if (!updatedProblem) {
    throw new APIError(400, "something went wrong while updating the problem")
  }

  res.status(200).json(new APIResponse(200, "problem updated successfully", updatedProblem))
})

const deleteProblem = asyncHandler(async (req, res) => {
  const { id } = req.params

  const deletedProblem = await Problem.findByIdAndDelete({ _id: id })

  if (!deletedProblem) {
    throw new APIError(400, "something went wrong while deletion the problem")
  }

  res.status(200).json(new APIResponse(200, "problem deleted successfully"))
})

const getSolvedProblems = asyncHandler(async (req, res) => {
  const { id } = req.user

  const solvedProblems = await Submission.distinct("problem", { user: id, status: PROBLEM_SOLVED_STATUS.ACCEPTED })

  if (!solvedProblems) {
    throw new APIError(404, "Problem not found")
  }

  res.status(200).json(new APIResponse(200, "successfully fetch all solved problems", solvedProblems))
})

export { createProblem, getAllProblems, getProblemDetails, deleteProblem, updateProblem, getSolvedProblems }
