import bytes from "bytes";
import ms from "ms";
import { asyncHandler } from "../utils/asyncHandler.js";
import { APIResponse } from "../utils/APIResponse.js";
import { APIError } from "../utils/APIError.js";
import { Problem } from "../models/problem.model.js";
import { Submission } from "../models/submission.model.js";
import { User } from "../models/user.model.js";
import { batchSubmit, getLanguageName, pollingBatchResults } from "../services/judge0.service.js";

const executeCode = asyncHandler(async (req, res) => {
  const { languageId, sourceCode, stdInput, expectedOutput, problemId, isSubmit } = req.body;

  if (!languageId || !sourceCode || !stdInput || !expectedOutput || !problemId) {
    throw new APIError(400, "all fields are required");
  }

  const submission = stdInput.map((input, index) => ({
    language_id: languageId,
    source_code: sourceCode,
    stdin: input,
    expected_output: expectedOutput[index],
  }));

  const submissionResponse = await batchSubmit(submission);
  const tokens = submissionResponse.map((res) => res.token);
  const result = await pollingBatchResults(tokens);

  const testcaseResults = result.map((tc, i) => {
    const stdout = tc?.stdout?.trim();
    const expected_output = (expectedOutput[i] ?? "").trim();
    const isPassed = stdout === expected_output;

    const testcaseMap = {
      testcaseNo: i + 1,
      isPassed: isPassed,
      stdin: stdInput[i],
      stdout: stdout,
      stderr: tc.stderr,
      compileOutput: tc.compile_output,
      expectedOutput: expected_output,
      status: tc.status.description,
      memory: tc.memory,
      time: tc.time,
    };

    return testcaseMap;
  });

  const submissionPayload = {
    problem: problemId,
    user: req.user.id,
    language: await getLanguageName(languageId),
    sourceCode: sourceCode,
    stdin: stdInput,
    stdout: testcaseResults.map((t) => t.stdout),
    stderr: testcaseResults.some((t) => t.stderr !== null) || null,
    compileOutput: testcaseResults.some((t) => t.compile_output !== null) || null,
    status: testcaseResults.every((t) => t.isPassed) ? "Accepted" : "Wrong Answer",
    memory: bytes.format(
      testcaseResults.map((t) => t.memory).reduce((acc, cur) => acc + Number(cur), 0),
      { unitSeparator: "", unit: "kb" }
    ),
    time: ms(testcaseResults.map((t) => t.time).reduce((acc, cur) => acc + Number(cur), 0)),
    testCases: testcaseResults,
  };

  if (isSubmit) {
    console.log("codeSubmitting....");
    const submissionData = await Submission.findOneAndUpdate(
      {
        problem: problemId,
        user: req.user.id,
      },
      submissionPayload,
      { upsert: true, new: true }
    );

    if (!submissionData) {
      throw new APIError(400, "something went wrong while submition");
    }

    await Problem.findByIdAndUpdate(
      { _id: problemId },
      {
        $addToSet: { solvedBy: req.user.id },
      },
      { upsert: true, new: true }
    );

    await User.findByIdAndUpdate(
      req.user._id,
      {
        $addToSet: {
          submissions: submissionData._id,
          solvedProblems: problemId,
        },
      },
      { upsert: true, new: true }
    );

    res.status(200).json(new APIResponse(200, "code executed and submitted successfully", submissionData));
  } else {
    res.status(200).json(new APIResponse(200, "Code executed successfully", submissionPayload));
  }
});

export { executeCode };
