import {
  batchSubmit,
  getSubmission,
  pollingBatchResults,
  submitCode,
} from "../services/judge0.service.js"
import { APIError } from "../utils/APIError.js"
import { APIResponse } from "../utils/APIResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const executeCode = asyncHandler(async (req, res) => {
  const { languageId, sourceCode, stdInput, expectedOutput } = req.body

  if (!languageId || !sourceCode || !stdInput || !expectedOutput) {
    throw new APIError(400, "all fields are required")
  }

  const submission = stdInput.map((input, index) => ({
    language_id: languageId,
    source_code: sourceCode,
    stdin: input,
    expected_output: expectedOutput[index],
  }))

  const submissionResponse = await batchSubmit(submission)
  const result = await pollingBatchResults(
    submissionResponse.map((res) => res.token)
  )

  result.forEach(async (res, index) => {
    if (res.stdout.trim() == expectedOutput[index]) {
      console.log(
        "out:",
        res.stdout,
        "expectedOut:",
        expectedOutput[index],
        "-",
        res.stdout == expectedOutput[index] ? "fail" : "pass"
      )
    }
  })

  res.status(200).json(new APIResponse(200, "Code executed successfully"))
})

export { executeCode }
