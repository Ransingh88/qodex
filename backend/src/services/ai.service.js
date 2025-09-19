import { complexitySchema } from "../utils/zodSchema.js"
import { getAIProvider } from "./ai/ai.factory.js"

const analyzeCodeComplexity = async (code, language, problemDescription) => {
  const aiProvider = getAIProvider()

  const prompt = `
You are an expert in algorithms.
Analyze the following code and determine its time and space complexity in Big-O notation.
Return answer in JSON format with fields: timeComplexity, spaceComplexity, explanation.

Always return output in strict JSON format with three keys:
- timeComplexity (string, e.g., "O(n log n)")
- spaceComplexity (string, e.g., "O(1)")
- explanation (1–2 sentences explaining why)

Never include extra commentary, markdown, or text outside JSON.

  Language: ${language}

  Problem:
  ${problemDescription}


  Code:
  ${code}
  `

  const rawResponse = await aiProvider.generate(prompt)

  // const parsed = complexitySchema.parse(rawResponse)
  return rawResponse
}

export { analyzeCodeComplexity }
