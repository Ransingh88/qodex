import dotenv from "dotenv"
import { Agent, tool, run } from "@openai/agents"
import { z } from "zod"
import { DIFFICULTIES } from "../../../../config/constant/constants.js"
import { Problem } from "../../../../models/problem.model.js"
import { connectDB } from "../../../../db/dbConnection.js"

dotenv.config()

const createProblemSchema = z.object({
  title: z.string(),
  description: z.string(),
  difficulty: z.enum(Object.values(DIFFICULTIES)),
  tags: z.array(z.string()),
  topics: z.string(),
  examples: z.object({
    input: z.string(),
    output: z.string(),
  }),
  constraints: z.string(),
  category: z.string(),
  testcases: z.object({
    input: z.string(),
    output: z.string(),
  }),
  codeSnippets: z.object({
    language: z.string(),
    code: z.string(),
  }),
  referenceSolutions: z.object({
    language: z.string(),
    code: z.string(),
  }),
  askedBy: z.array(z.string()),
  bonus: z.object({
    description: z.string(),
  }),
})

const createProblemTool = tool({
  name: "create_problem",
  description: "Create a problem and save it to the database",
  parameters: createProblemSchema,
  execute: async (problemPayload) => {
    const createdProblem = await Problem.create(problemPayload)
    console.log(createdProblem, "createdProblem")

    return `Problem created successfully with id: ${createdProblem._id}`
  },
})

const createProblemAgent = () =>
  new Agent({
    name: "Problem Creator",
    instructions:
      "You are a expert DSA problem creator. You create DSA problems in provided programing languages. and save it to the database.",
    outputType: createProblemSchema,
    tools: [createProblemTool],
  })
await connectDB()
const result = await run(
  createProblemAgent(),
  `
This problem was asked by Uber.

Given a tree where each edge has a weight, compute the length of the longest path in the tree.

For example, given the following tree:

   a
  /|\
 b c d
    / \
   e   f
  / \
 g   h
and the weights: a-b: 3, a-c: 5, a-d: 8, d-e: 2, d-f: 4, e-g: 1, e-h: 1, the longest path would be c -> a -> d -> f, with a length of 17.

The path does not have to pass through the root, and each node can have any amount of children.

Language: js and python`
)

console.log(result.finalOutput)
