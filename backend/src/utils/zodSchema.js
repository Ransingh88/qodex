import { z } from "zod"

export const complexitySchema = z.object({
  timeComplexity: z.string(),
  spaceComplexity: z.string(),
  explanation: z.string(),
  optimizations: z.string().optional(),
})
