import { asyncHandler } from "../utils/asyncHandler.js"
import { analyzeCodeComplexity } from "../services/ai.service.js"
import { APIResponse } from "../utils/APIResponse.js"
import { APIError } from "../utils/APIError.js"

const analyzeComplexity = asyncHandler(async (req, res) => {
  const { code, language, desc } = req.body

  if (!code || !language) {
    throw new APIError(400, "Code and language are required fields")
  }

  const analysis = await analyzeCodeComplexity(code, language, desc)

  res.status(200).json(new APIResponse(200, "Code complexity analyzed successfully", analysis))
})

export { analyzeComplexity }
