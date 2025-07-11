import { Submission } from "../models/submission.model.js"
import { User } from "../models/user.model.js"
import {
  batchSubmit,
  getLanguageName,
  pollingBatchResults,
} from "../services/judge0.service.js"
import { APIError } from "../utils/APIError.js"
import { APIResponse } from "../utils/APIResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const executeCode = asyncHandler(async (req, res) => {
  const {
    languageId,
    sourceCode,
    stdInput,
    expectedOutput,
    problemId,
    isSubmit,
  } = req.body

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
  const tokens = submissionResponse.map((res) => res.token)
  const result = await pollingBatchResults(tokens)

  const testcaseResults = result.map((tc, i) => {
    const stdout = tc.stdout.trim()
    const expected_output = expectedOutput[i].trim()
    const isPassed = stdout === expectedOutput

    const testcaseMap = {
      testcaseNo: i + 1,
      isPassed: isPassed,
      stdin: stdInput,
      stdout: stdout,
      stderr: tc.stderr,
      compileOutput: tc.compile_output,
      expectedOutput: expected_output,
      status: tc.status.description,
      memory: tc.memory,
      time: tc.time,
    }

    return testcaseMap
  })

  const submissionPayload = {
    problem: problemId,
    user: req.user.id,
    language: getLanguageName(languageId),
    sourceCode: sourceCode,
    stdin: stdInput,
    stdout: testcaseResults.stdout,
    stderr: testcaseResults.some((t) => t.stderr !== null) || null,
    compileOutput:
      testcaseResults.some((t) => t.compile_output !== null) || null,
    status: testcaseResults.every((t) => t.isPassed)
      ? "Accepted"
      : "Wrong Answer",
    memory: `${testcaseResults.reduce((acc, cur) => {
      cur.memory + acc
    }, 0)} kb`,
    time: `${testcaseResults.reduce((acc, cur) => {
      cur.time + acc
    }, 0)} s`,
    testCases: testcaseResults,
  }

  if (isSubmit) {
    const submissionData = await Submission.findOneAndUpdate(
      {
        problem: problemId,
      },
      submissionPayload,
      { upsert: true }
    )

    if (!submissionData) {
      throw new APIError(400, "something went wrong while submition")
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: { submissions: submissionData._id },
    })

    res
      .status(200)
      .json(
        new APIResponse(
          200,
          "code executed and submitted successfully",
          submissionData
        )
      )
  }

  res
    .status(200)
    .json(new APIResponse(200, "Code executed successfully", testcaseResults))
})

export { executeCode }
