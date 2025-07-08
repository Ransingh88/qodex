import axios from "axios"
import { getLanguageId, getLanguages } from "../services/judge0.service.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const createProblem = asyncHandler(async (req, res) => {
  // const {
  //   title,
  //   description,
  //   difficulty,
  //   tags,
  //   topics,
  //   examples,
  //   constrains,
  //   hints,
  //   editorial,
  //   testcases,
  //   codeSnippets,
  //   referenceSolution,
  // } = req.body

  // for (const [language, solutionCode] of Object.entries(referenceSolution)) {
  //   if (!solutionCode) {
  //     return res.status(400).json({
  //       message: `Reference solution for ${language} is required`,
  //     })
  //   }

  //   const languageId = await getLanguageId(language)

  //   if (!languageId) {
  //     return res.status(400).json({
  //       message: `The language: ${language} is not supported`,
  //     })
  //   }

  //   const submissions = testcases.map((input, output) => ({
  //     language_id: languageId,
  //     source_code: solutionCode,
  //     stdin: input,
  //     expected_output: output,
  //   }))
  // }

  // const submissions = {
  //   source_code:
  //     'const fs = require("fs");\n\nfunction addTwoNumbers(a, b) {\n    // Write your code here\n    // Return the sum of a and b\n    return a + b;\n}\n\n// Reading input from stdin (using fs to read all input)\nconst input = fs.readFileSync(0, "utf-8").trim();\nconst [a, b] = input.split(" ").map(Number);\n\nconsole.log(addTwoNumbers(a, b));',
  //   language_id: 63,
  //   stdin: "3 7",
  //   expected_output: "10",
  // }

  const submissions = {
    language_id: 63,
    source_code:
      "process.stdin.resume(); process.stdin.setEncoding('utf8'); let input=''; process.stdin.on('data', chunk => input += chunk); process.stdin.on('end', () => console.log('Received:', input.trim()));",
    stdin: "Test input",
  }

  const responseSubmission = await axios.post(
    `http://172.22.131.145:2358/submissions/?base64_encoded=false`,
    submissions
  )

  console.log(responseSubmission, "responseSubmission")

  while (true) {
    const status = await axios.get(
      `http://172.22.131.145:2358/submissions/${responseSubmission.data.token}?base64_encoded=false`
    )

    console.log(status.data, "status")

    if (status.data.status.id !== 1 && status.data.status.id !== 2) {
      console.log(
        "Submission completed with status:",
        status.data.status.description
      )
      return status
    }
  }
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
